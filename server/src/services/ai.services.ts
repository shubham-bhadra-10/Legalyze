import redis from '../controllers/redis';
import { getDocument } from 'pdfjs-dist';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { r } from '@upstash/redis/zmscore-hRk-rDLY';

const AI_MODEL = 'gemini-1.5-pro-latest';
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY!);
const aiModel = genAI.getGenerativeModel({ model: AI_MODEL });

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
  const prompt = `Analyze the following contract text and deteremine the type of contract it is. Provide only type as a single string (e.g. "Employment", "Non-Disclosure Agreement", "Sales","Lease",etc.). Do not include any additional explaination or text.
  
  Contract Text: ${contractText.substring(0, 2000)}`;
  const result = await aiModel.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
};

export const analyzeContractWithAI = async (
  contractText: string,
  contractType: string
) => {
  let prompt = `
    Analyze the following ${contractType} contract and provide:
    1. A list of at least 10 potential risks for the party recieiving the contract, each with a brief explanation and severity level (low, medium, high).
    2. A list of atleast 10 potential opportunities or benefits for the receiving party, each with a brieft explanation and impact level (low, medium, high).
    3. A comprehensive summary of the contract, including key clauses and terms.
    4. Any recommendations for improving the contract from the receiving party's perspective.
    5. A list of key clauses in the contract.
    6. An assessment of the contract's legal compliance.
    7. A list of potential negotiation points.
    8. The contract duration or term, if applicable.
    9. A summary of termination conditions, if applicable.
    10. A breakdown of any financial terms or compensation structure, if applicable.
    11. Any performance metrics or KPIs mentioned, if applicable.
    12. A summary of any specific clauses relevant to type of contract (e.g. intellectual property for employment contracts,warranties for sales contracts).
    13. An overall score from 1 to 100, with 100 being  the highest. This score represents the overall favorability of the contract based on the identified risks, opportunities, and other factors.

    Format your response as a JSON object with the following structure:
    {
    "risks" : [{"risks": "Risk description",explanation: "Brief Explanation", severity: "low|medium|high"}],
    "opportunities": [{"opportunity": "Opportunity description", explanation: "Brief Explanation", impact: "low|medium|high"}],
    "summary": "Comprehensive summary of the contract",
    "recommendations": ["Recommendation 1", "Recommendation 2", ...],
    "keyClauses": ["Clause 1", "Clause 2", ...],
    "legalCompliance": "Assessment of legal compliance",
    "negotiationPoints": ["Negotiation Point 1", "Negotiation Point 2", ...],
    "contractDuration": "Contract duration or term, if applicable",
    "terminationConditions": "Summary of termination conditions, if applicable",
    "overallScore": "Overall score from 1 to 100",
    "financialTerms": {
    description: "Overview of financial terms",
    details: ["Detail 1", "Detail 2", ...]},
    "performanceMetrics": ["Metric 1", "Metric 2", ...],
specificClauses: "Summary of clauses specific to the contract type"
}
`;
  prompt += `
 Important: Provide only the JSON object in your response, without any additional text or formatting.

 Contract text: ${contractText}
 `;
  const results = await aiModel.generateContent(prompt);
  const response = results.response;
  // return response.text();

  let text = response.text();
  console.log('AI Response:', text);

  text = text.replace(/```json\n?|\n?|n?```/g, '').trim();
  try {
    text = text.trim().replace(/^```json\s*|```$/g, '');

    // Remove invalid trailing commas
    text = text.replace(/,\s*([}\]])/g, '$1');

    // Attempt to parse as-is
    const analysis = JSON.parse(text);
    return analysis;
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
  interface IRisk {
    risk: string;
    explanation: string;
  }

  interface IOpportunity {
    opportunity: string;
    explanation: string;
  }

  interface FallbackAnalysis {
    risks: IRisk[];
    opportunities: IOpportunity[];
    summary: string;
  }

  const fallbackAnalysis: FallbackAnalysis = {
    risks: [],
    opportunities: [],
    summary: 'No summary provided',
  };

  //Extract risks
  const risksMatch = text.match(/"risks"\s*:\s*\[([\s\S]*?)\]/);
  if (risksMatch) {
    fallbackAnalysis.risks = risksMatch[1].split('},').map((risk) => {
      const riskMatch = risk.match(/risk'\s*:\s*"([^"]*)"/);
      const explanationMatch = risk.match(/explanation'\s*:\s*"([^"]*)"/);
      return {
        risk: riskMatch ? riskMatch[1] : 'Unknown risk',
        explanation: explanationMatch
          ? explanationMatch[1]
          : 'No explanation provided',
        // severity: 'low', // Default severity
      };
    });
  }
  //Extract opportunities
  const opportunitiesMatch = text.match(/"opportunities"\s*:\s*\[([\s\S]*?)\]/);
  if (opportunitiesMatch) {
    fallbackAnalysis.opportunities = opportunitiesMatch[1]
      .split('},')
      .map((opportunity) => {
        const opportunityMatch = opportunity.match(
          /opportunity'\s*:\s*"([^"]*)"/
        );
        const explanationMatch = opportunity.match(
          /'explanation'\s*:\s*"([^"]*)"/
        );
        return {
          opportunity: opportunityMatch
            ? opportunityMatch[1]
            : 'Unknown opportunity',
          explanation: explanationMatch
            ? explanationMatch[1]
            : 'No explanation provided',
          // impact: 'low', // Default impact
        };
      });
  }
  //Extract summary
  const summaryMatch = text.match(/"summary"\s*:\s*"([^"]*)"/);
  if (summaryMatch) {
    fallbackAnalysis.summary = summaryMatch[1];
  }
  return fallbackAnalysis;
};

// Ensure that all text in the JSON object is in same language as the orginal contract (${language}).
