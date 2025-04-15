interface IRisk {
  risk: string;
  explanation: string;
  severity: 'low' | 'medium' | 'high';
}

interface IOpportunity {
  opportunity: string;
  explanation: string;
  impact: 'low' | 'medium' | 'high';
}

interface ICompensationStructure {
  baseSalary: string;
  bonuses: string;
  equity: string;
  otherBenefits: string;
}

export interface ContractAnalysis {
  _id: string;
  contractText: string;
  risks: IRisk[];
  opportunities: IOpportunity[];
  summary: string;
  recommendations: string[];
  keyClauses: string[];
  legalCompliance: string;
  negotiationPoints: string[];
  contractDuration: string;
  terminationConditions: string;
  overallScore: number;
  compensationStructure: ICompensationStructure;
  performanceMetrics: string[];
  intellectualPropertyClauses: string | string[];
  createdAt: Date;
  version: number;
  userFeedback: {
    rating: number;
    comments: string;
  };
  customFields: Map<string, string>;
  expirationDate: Date;
  language: string;
  aiModel: string;
  contractType: string;
  financialTerms?: {
    description: string;
    details: string[];
  };
  // projectId?: Types.ObjectId;
}
