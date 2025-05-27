
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

// Add this import if running in a Node.js environment
// If using Next.js API routes, process.env is available by default
// If you still get errors, ensure your tsconfig.json includes "node" types

const pineconeApiKey = process.env.PINECONE_API_KEY;
if (!pineconeApiKey) {
  throw new Error("PINECONE_API_KEY environment variable is not set");
}
export const pinecone = new Pinecone({
  apiKey: pineconeApiKey,
});

export const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY,
  modelName: "embedding-001",
});


export async function getPdfInfo(fileUrl: string, fileKey: string, userId: string){

  try {

    const fileData = await fetch(fileUrl);
      const blob = await fileData.blob(); //Binary large object , holds binary data


    
      const loader = new PDFLoader(blob);      //extract text make docs
      const rawData = await loader.load();      //call blob, extract text, return array of object

      //make the large docs into small pices
      const textSplit= new RecursiveCharacterTextSplitter({
        chunkSize:1000,
        chunkOverlap:200
      })

      const docs = await textSplit.splitDocuments(rawData)

      const addMetaData = docs.map((doc,index)=>({
      ...doc,
      metadata: {
        ...doc.metadata,
        fileKey,
        userId,
        chunkIndex: index,
        fileUrl,
        uploadDate: new Date().toISOString()
      }
    }));

    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);
    
    await PineconeStore.fromDocuments(addMetaData, embeddings, {
      pineconeIndex: index,
      namespace: `user_${userId}`, // Separate by user
    });
    
    console.log(`Processed ${docs.length} chunks for file ${fileKey}`);

  // 5. Store file metadata in database (optional)
    // You need to implement this function or import it from your database utility
    // Example stub implementation:
    async function storeFileMetadata(metadata: {
      fileKey: string;
      userId: string;
      fileUrl: string;
      chunksCount: number;
      status: string;
    }) {
      // TODO: Save metadata to your database
      console.log("Storing file metadata:", metadata);
    }

    await storeFileMetadata({
      fileKey,
      userId,
      fileUrl,
      chunksCount: docs.length,
      status: 'processed'
    });
 
    
  } catch (error) {
    console.log(error);
  }
}












// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

// const loader = new PDFLoader("src/document_loaders/example_data/example.pdf", {
//   splitPages: false,
// });

// const docs = await loader.load();

// Pinecone= pcsk_6NWhV4_NtVKM6ELG6giZNf5Hpc1Feqnjdx6udXsQuM3UPtoaFv563FVZT8hbihfmP4Lm5N