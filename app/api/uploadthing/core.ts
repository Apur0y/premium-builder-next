import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getPdfInfo } from "../process-pdf/route";


const f =createUploadthing();

const auth = (req:Request)=>({id: "userId"});

export const ourFileRouter={

     pdfUploader: f({ pdf: { maxFileSize: "4MB" } })


   .middleware(async ({ req }) => {
    
      const user = await auth(req);
    
      if (!user) throw new UploadThingError("Unauthorized");
    
      return { userId: user.id };
    })


    .onUploadComplete(async ({ metadata, file }) => {
      
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);

      getPdfInfo(file.ufsUrl,file.key,"5")
  
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;


export type OurFileRouter = typeof ourFileRouter;