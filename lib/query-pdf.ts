
import { queryPdfWithAI } from '@/lib/ai-query';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  const { question, userId, fileKey } = req.body;
  
  if (!question || !userId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  try {
    const result = await queryPdfWithAI(question, userId, fileKey);
    res.status(200).json(result);
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}