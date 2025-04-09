import redis from '../controllers/redis';
import { getDocument } from 'pdfjs-dist';
import { GoogleGenerativeAI } from '@google/generative-ai';

const AI_MODEL = 'gemini-pro';
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY!);

export const extractTextFromPdf = async (fileKey: string) => {
  try {
    const fileData = await redis.get(fileKey);
    if (!fileData) throw new Error('File not found in Redis');

    let fileBuffer: Uint8Array;
    if (Buffer.isBuffer(fileData)) {
      fileBuffer = new Uint8Array(fileData);
    } else if (typeof fileData === 'object' && fileData !== null) {
      const bufferData = fileData as { type?: string; data?: number[] };
      if (bufferData.type === 'Buffer' && Array.isArray(bufferData.data)) {
        fileBuffer = new Uint8Array(bufferData.data);
      } else {
        throw new Error('Invalid file data format in Redis');
      }
    } else {
      throw new Error('Invalid file data format in Redis');
    }

    const pdf = await getDocument({ data: fileBuffer }).promise;
    let text = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const textItems = content.items.map((item: any) => item.str);
      text += textItems.join(' ') + '\n';
    }

    return text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
};

export const detectContractType = async (
  contractText: string
): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: AI_MODEL });
  const prompt = `Analyze the following contract text and deteremine the type of contract it is. Provide only type as a single string (e.g. "Employment", "Non-Disclosure Agreement", "Sales","Lease",etc.). Do not include any additional explaination or text.
  
  Contract Text: ${contractText.substring(0, 2000)}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
};
