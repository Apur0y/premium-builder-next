"use client"
import { UploadButton } from "@/lib/uploadthing";
import { useState } from "react";



export default function UploadPdf() {

   const [processing, setProcessing] = useState(false);
  const [chunks, setChunks] = useState<any[]>([]);

  const handleProcessPDF = async (fileUrl: string) => {
    setProcessing(true);
    try {
      const response = await fetch('/api/process-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileUrl }),
      });
      
      const data = await response.json();
      if (data.success) {
        setChunks(data.chunks);
      }
    } catch (error) {
      console.error("Processing error:", error);
    } finally {
      setProcessing(false);
    }
  };
  return (
    <div className="h-screen bg-gradient-to-l from-purple-900 to-gray-900 flex items-center justify-center flex-col pt-24">
      <h1 className="text-3xl text-white font-bold">Upload You PDF</h1>

   <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="pdfUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
           if (res?.[0]?.url) {
            handleProcessPDF(res[0].url);
          }
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />

      {processing && <p>Processing PDF...</p>}
      
      {chunks.length > 0 && (
        <div className="mt-4">
          <h3>Extracted Text Chunks:</h3>
          <div className="space-y-2">
            {chunks.map((chunk, i) => (
              <div key={i} className="p-2 border rounded">
                <p className="text-sm">{chunk.content}</p>
                <p className="text-xs text-gray-500">
                  Page {chunk.metadata?.loc?.pageNumber}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
    


    </div>
  )
}
