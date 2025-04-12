import { ContractAnalysis } from '@/interfaces/contract.interface';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';

interface IContractAnalysisResultsProps {
  anaysisResults: ContractAnalysis;
  contractId: string;
}

export default function ContractAnalysisResults({
  anaysisResults,
  contractId,
}: IContractAnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState('summary');
  const getScore = () => {
    const score = 74;

    if (score > 70)
      return { icon: ArrowUp, color: 'text-green-500', text: 'Good' };
    // return 'green';
    if (score < 50)
      return { icon: ArrowDown, color: 'text-red-500', text: 'Bad' };
    return { icon: Minus, color: 'text-yellow-500', text: 'Average' };
  };
  const scoreTrend = getScore();
  return (
    <div className='container mx-auto px-4  py-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Analysis results</h1>
        <div className='flex space-x-2'>{/* ASK AI BUTTON */}</div>
      </div>
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle>Overall Contract Score</CardTitle>
          <CardDescription>
            Based on risks and opportunities identified
          </CardDescription>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='"w-1/2'>
                <div className='flex items-center space-x-4 mb-4'>
                  <div className='text-4xl font-bold'>
                    {/* {anaysisResults.overallScore ?? 0} */}
                    79
                  </div>
                  <div
                    className={`flex items-center space-x-2 ${scoreTrend.color}`}
                  >
                    <scoreTrend.icon className='size-6 mr-1' />
                    <span className='font-semibold'>{scoreTrend.text}</span>
                  </div>
                </div>
                <div className='space-y-2'>
                    <div className='flex justify-between text-sm'>
                        <span>Risk</span>
                        <span>34%</span>
                    </div>
                </div>
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
