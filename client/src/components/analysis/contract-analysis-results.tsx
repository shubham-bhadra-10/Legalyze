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
import OverallScoreChart from './chart';
import { Tabs } from '../ui/tabs';
import { TabsList, TabsTrigger } from '@radix-ui/react-tabs';

interface IContractAnalysisResultsProps {
  anaysisResults: ContractAnalysis;
  contractId: string;
}

// Keep your imports same

export default function ContractAnalysisResults({
  anaysisResults,
  contractId,
}: IContractAnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState('summary');

  const getScore = () => {
    const score = 74;

    if (score > 70)
      return { icon: ArrowUp, color: 'text-green-500', text: 'Good' };
    if (score < 50)
      return { icon: ArrowDown, color: 'text-red-500', text: 'Bad' };
    return { icon: Minus, color: 'text-yellow-500', text: 'Average' };
  };

  const scoreTrend = getScore();

  return (
    <div className='container mx-auto px-4 py-8'>
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
        </CardHeader>

        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center'>
            {/* LEFT SECTION */}
            <div className='space-y-4'>
              <div className='flex items-center space-x-4'>
                <div className='text-5xl font-bold text-gray-800'>79</div>
                <div
                  className={`flex items-center space-x-2 ${scoreTrend.color}`}
                >
                  <scoreTrend.icon className='w-6 h-6' />
                  <span className='font-semibold text-base'>
                    {scoreTrend.text}
                  </span>
                </div>
              </div>

              <div className='space-y-2'>
                <div className='flex justify-between text-sm text-gray-700'>
                  <span>Risk</span>
                  <span>34%</span>
                </div>
                <div className='flex justify-between text-sm text-gray-700'>
                  <span>Opportunities</span>
                  <span>34%</span>
                </div>
              </div>

              <p className='text-sm text-gray-600'>
                This score represents the overall risk and opportunity
                assessment of the contract.
              </p>
            </div>

            {/* RIGHT SECTION */}
            <div className='h-48'>
              <OverallScoreChart overallScore={79} />
            </div>
          </div>
        </CardContent>
      </Card>
      <Tabs value={activeTab} onValueChange={setActiveTab} className='mb-6'>
        <TabsList className='grid w-full grid-cols-4 gap-2 rounded-md bg-gray-100 p-1 shadow-sm'>
          <TabsTrigger
            value='summary'
            className='text-sm font-medium text-gray-700 transition-colors hover:text-black data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-md py-2'
          >
            Summary
          </TabsTrigger>
          <TabsTrigger
            value='risks'
            className='text-sm font-medium text-gray-700 transition-colors hover:text-black data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-md py-2'
          >
            Risks
          </TabsTrigger>
          <TabsTrigger
            value='opportunities'
            className='text-sm font-medium text-gray-700 transition-colors hover:text-black data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-md py-2'
          >
            Opportunities
          </TabsTrigger>
          <TabsTrigger
            value='details'
            className='text-sm font-medium text-gray-700 transition-colors hover:text-black data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-md py-2'
          >
            Details
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
