import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';



export async function getPdfInfo(fileUrl, fileKey, userId){

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