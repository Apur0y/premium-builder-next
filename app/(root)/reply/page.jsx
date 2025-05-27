"use client"
import { useState } from 'react';
import { UploadButton } from "@uploadthing/react";

export default function PdfReader() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const handleUploadComplete = (res) => {
    setUploadedFiles(prev => [...prev, ...res]);
    console.log("Files uploaded:", res);
  };
  
  const handleQuery = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/query-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          userId: 'user123', // Replace with actual user ID
          fileKey: selectedFile?.key || null
        }),
      });
      
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error('Query error:', error);
      setAnswer('Error occurred while processing your question.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">PDF AI Reader</h1>
      
      {/* Upload Section */}
      <div className="mb-8 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>
        <UploadButton
          endpoint="pdfUploader"
          onClientUploadComplete={handleUploadComplete}
          onUploadError={(error) => {
            console.error("Upload error:", error);
          }}
        />
      </div>
      
      {/* File List */}
      {uploadedFiles.length > 0 && (
        <div className="mb-8 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span>{file.name}</span>
                <button
                  onClick={() => setSelectedFile(file)}
                  className={`px-3 py-1 rounded ${
                    selectedFile?.key === file.key 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-300'
                  }`}
                >
                  {selectedFile?.key === file.key ? 'Selected' : 'Select'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Query Section */}
      <div className="mb-8 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Ask Questions</h2>
        <div className="space-y-4">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about your PDF..."
            className="w-full p-3 border rounded-lg h-32"
          />
          <button
            onClick={handleQuery}
            disabled={loading || !question.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Ask Question'}
          </button>
        </div>
      </div>
      
      {/* Answer Section */}
      {answer && (
        <div className="p-6 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Answer</h2>
          <div className="whitespace-pre-wrap">{answer}</div>
        </div>
      )}
    </div>
  );
}
