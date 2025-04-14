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
import { TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface IContractAnalysisResultsProps {
  anaysisResults: ContractAnalysis;
  isActive: boolean;
  contractId: string;
}

// Keep your imports same

export default function ContractAnalysisResults({
  anaysisResults,
  isActive,
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

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return '';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return '';
    }
  };

  const renderRisksandOpportunities = (
    items: Array<{
      risk?: string;
      opportunity?: string;
      explanation?: string;
      severity?: string;
      impact?: string;
    }>,
    type: 'risk' | 'opportunity'
  ) => {
    const displayItems = isActive ? items : items.slice(0, 3);
    const fakeItems = {
      risk: type === 'risk' ? 'Hidden Risk' : undefined,
      opportunity: type === 'opportunity' ? 'Hidden Opportunity' : undefined,
      explanation: 'Hidden explanation',
      severity: 'low',
      impact: 'low',
    };
    return (
      <ul className="space-y-4">
  {displayItems.map((item, index) => (
    <motion.li
      key={index}
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="font-semibold text-lg text-gray-800">
          {type === "risk" ? item.risk : item.opportunity}
        </span>
        {(item.severity || item.impact) && (
          <Badge
            className={`text-xs px-2 py-1 rounded-full ${
              type === "risk"
                ? getSeverityColor(item.severity || "low")
                : getImpactColor(item.impact || "low")
            }`}
          >
            {(item.severity || item.impact)?.toUpperCase()}
          </Badge>
        )}
      </div>
      <p className="text-sm text-gray-600">{item.explanation}</p>
    </motion.li>
  ))}

  {!isActive && items.length > 3 && (
    <motion.li className="rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-inner blur-sm">
      <div className="flex justify-between items-start mb-3">
        <span className="font-semibold text-lg text-gray-500">
          {type === "risk" ? fakeItems.risk : fakeItems.opportunity}
        </span>
        <Badge className="text-xs px-2 py-1 rounded-full bg-gray-300 text-gray-700">
          {(fakeItems.severity || fakeItems.impact || "low").toUpperCase()}
        </Badge>
      </div>
    </motion.li>
  )}
</ul>

    );
  };

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
        <TabsContent value='summary'>
          <Card>
            <CardHeader>
              <CardTitle>Contract Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-lg leading-relaxed'>
                {/* {anaysisResults.summary} */}
                This is a sample summary of the contract analysis results.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='risks'>
          <Card>
            <CardHeader>
              <CardTitle>Contract Risks</CardTitle>
            </CardHeader>
            <CardContent>
              {renderRisksandOpportunities(
                [
                  {
                    risk: 'Risk 1',
                    explanation: 'Explanation of risk 1',
                    severity: 'High',
                    impact: 'High',
                  },
                  {
                    risk: 'Risk 2',
                    explanation: 'Explanation of risk 2',
                    severity: 'Medium',
                    impact: 'Medium',
                  },
                  {
                    risk: 'Risk 3',
                    explanation: 'Explanation of risk 3',
                    severity: 'Low',
                    impact: 'Low',
                  },
                  {
                    risk: 'Risk 4',
                    explanation: 'Explanation of risk 4',
                    severity: 'High',
                    impact: 'High',
                  },
                ],
                'risk'
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
