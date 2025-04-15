import mongoose, { Schema, Document, Types } from 'mongoose';
import { IUser } from './user.model';

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

export interface IContractAnalysis extends Document {
  userId: Types.ObjectId | IUser['_id'];
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
  projectId?: Types.ObjectId;
}

const ContractAnalysisSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  contractText: { type: String, required: true },

  risks: [
    {
      risk: { type: String, required: true },
      explanation: { type: String },
      severity: { type: String, enum: ['low', 'medium', 'high'] },
    },
  ],

  opportunities: [
    {
      opportunity: { type: String },
      explanation: { type: String },
      impact: { type: String, enum: ['low', 'medium', 'high'] },
    },
  ],

  summary: { type: String, required: true },
  recommendations: [{ type: String }],
  keyClauses: [{ type: String }],
  legalCompliance: { type: String },
  negotiationPoints: [{ type: String }],
  contractDuration: { type: String },
  terminationConditions: { type: String },
  overallScore: { type: Number, min: 0, max: 100 },

  compensationStructure: {
    baseSalary: { type: String },
    bonuses: { type: String },
    equity: { type: String },
    otherBenefits: { type: String },
  },

  performanceMetrics: [{ type: String }],

  intellectualPropertyClauses: {
    type: Schema.Types.Mixed,
    validate: {
      validator: function (value: any) {
        return (
          typeof value === 'string' ||
          (Array.isArray(value) && value.every((v) => typeof v === 'string'))
        );
      },
      message: (props: { value: any }) =>
        `${props.value} is not a valid value for intellectualPropertyClauses. It should be a string or an array of strings.`,
    },
  },

  createdAt: { type: Date, default: Date.now },
  version: { type: Number, default: 1 },

  userFeedback: {
    rating: { type: Number, min: 1, max: 5 },
    comments: { type: String },
  },

  customFields: { type: Map, of: String },

  expirationDate: { type: Date },
  language: { type: String, default: 'en' },
  aiModel: { type: String, default: 'gemini-pro' },
  contractType: { type: String, required: true },

  financialTerms: {
    description: { type: String },
    details: [{ type: String }],
  },

  projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
});

export default mongoose.model<IContractAnalysis>(
  'ContractAnalysis',
  ContractAnalysisSchema
);
