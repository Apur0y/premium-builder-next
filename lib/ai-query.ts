import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { embeddings, pinecone } from "@/app/api/process-pdf/route";


const llm = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  apiKey: process.env.GEMINI_API_KEY ?? "",
  temperature: 0.7,
});

export async function queryPdfWithAI(
  question: string,
  userId: string,
  fileKey: string | null = null
) {
  try {
    // 1. Setup Pinecone vector store
    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME ?? "");
    const vectorStore = new PineconeStore(embeddings, {
      pineconeIndex: index,
      namespace: `user_${userId}`,
    });
    
    // 2. Create retriever with optional file filtering
    const retriever = vectorStore.asRetriever({
      k: 4, // Number of relevant chunks to retrieve
      filter: fileKey ? { fileKey: { $eq: fileKey } } : undefined
    });
    
    // 3. Create prompt template
    const prompt = PromptTemplate.fromTemplate(`
      Based on the following context from the PDF document(s), please answer the question.
      If the answer cannot be found in the context, please say so.
      
      Context:
      {context}
      
      Question: {question}
      
      Answer:
    `);
    
    // 4. Create RAG chain
    const ragChain = RunnableSequence.from([
      async (input: string) => ({
        context: (await retriever.getRelevantDocuments(input)).map(doc => doc.pageContent).join("\n\n"),
        question: input,
      }),
      prompt,
      llm,
    ]);
    
    // 5. Get answer
    const result = await ragChain.invoke(question);
    
    return {
      answer: result.content,
      sources: await retriever.invoke(question)
    };
    
  } catch (error) {
    console.error("Error querying PDF with AI:", error);
    throw error;
  }
}