"use client"
import { UploadButton } from "@/lib/uploadthing";


export default function UploadPdf() {
  return (
    <div className="h-screen bg-gradient-to-l from-purple-900 to-gray-900 flex items-center justify-center flex-col pt-24">
      <h1 className="text-3xl text-white font-bold">Upload You PDF</h1>

   <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
    


    </div>
  )
}
