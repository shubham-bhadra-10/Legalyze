import { ContractAnalysis } from '@/interfaces/contract.interface';
import { ReactNode, useState } from 'react';
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
import { Button } from '../ui/button';
import { Accordion, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { AccordionContent } from '@radix-ui/react-accordion';

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

  if (!anaysisResults) {
    return <div>No results</div>;
  }


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
      <ul className='space-y-4'>
        {displayItems.map((item, index) => (
          <motion.li
            key={index}
            className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className='flex justify-between items-start mb-3'>
              <span className='font-semibold text-lg text-gray-800'>
                {type === 'risk' ? item.risk : item.opportunity}
              </span>
              {(item.severity || item.impact) && (
                <Badge
                  className={`text-xs px-2 py-1 rounded-full ${
                    type === 'risk'
                      ? getSeverityColor(item.severity || 'low')
                      : getImpactColor(item.impact || 'low')
                  }`}
                >
                  {(item.severity || item.impact)?.toUpperCase()}
                </Badge>
              )}
            </div>
            <p className='text-sm text-gray-600'>{item.explanation}</p>
          </motion.li>
        ))}

        {!isActive && items.length > 3 && (
          <motion.li className='rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-inner blur-sm'>
            <div className='flex justify-between items-start mb-3'>
              <span className='font-semibold text-lg text-gray-500'>
                {type === 'risk' ? fakeItems.risk : fakeItems.opportunity}
              </span>
              <Badge className='text-xs px-2 py-1 rounded-full bg-gray-300 text-gray-700'>
                {(
                  fakeItems.severity ||
                  fakeItems.impact ||
                  'low'
                ).toUpperCase()}
              </Badge>
            </div>
          </motion.li>
        )}
      </ul>
    );
  };

  const renderPremiumAccordion = (content: ReactNode) => {
    if (!isActive) {
      return content;
    }
    return (
      <div className='relative'>
        <div className='absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center'>
          <Button variant={'outline'}>Upgrade to Premium</Button>
          <div className='opacity-50'>{content}</div>
        </div>
      </div>
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
                <div className='text-5xl font-bold text-gray-800'>
                  {anaysisResults.overallScore ?? 0}
                </div>
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
                  <span>{100-anaysisResults.overallScore}%</span>
                </div>
                <div className='flex justify-between text-sm text-gray-700'>
                  <span>Opportunities</span>
                  <span>{anaysisResults.overallScore}%</span>
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
                {anaysisResults.summary}
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
                anaysisResults.risks,
                'risk'
              )}
              {!isActive && (
                <p className='mt-4 text-center text-sm text-gray-500'>
                  Upgrade to Premium to view all risks
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='opportunities'>
          <Card>
            <CardHeader>
              <CardTitle>Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              {renderRisksandOpportunities(
                anaysisResults.opportunities,
                'opportunity'
              )}
              {!isActive && (
                <p className='mt-4 text-center text-sm text-gray-500'>
                  Upgrade to Premium to view all opportunities
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='details'>
          {isActive ? (
            <div className='grid md:grid-cols-2 gap-6'>
              <Card>
                <CardHeader>Contract Details</CardHeader>
                <CardContent>
                  <ul className='space-y-2'>
                    {anaysisResults.keyClauses?.map((keyClause, index) => (
                      <motion.li key={index} className='flex items-center'>
                        {keyClause}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-2'>
                    {anaysisResults.recommendations?.map(
                      (recommendation, index) => (
                        <motion.li>{recommendation}</motion.li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Contract Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Upgrade to Premium to view contract detailed analysis,
                    including key clauses and recommendations.
                  </p>
                  <Button className='mt-4'>Upgrade to Premium</Button>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
      <Accordion type='single' collapsible className='mb-6'>
        {renderPremiumAccordion(
          <>
            <AccordionItem value='contract-details'>
              <AccordionTrigger>Content Details</AccordionTrigger>
              <AccordionContent>
                <div className='grid md:grid-cols-2 gap-6'>
                  <div>
                    <div>
                      <h3 className='font-semibold mb-2'>
                        Duration and Termination
                      </h3>
                      <p>{anaysisResults.contractDuration}</p>
                      <strong>Termination conditions</strong>
                      <p>{anaysisResults.terminationConditions}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className='font-semibold mb-2'>Legal information</h3>
                    <p>
                      <strong>Legal Compliance</strong>
                      {anaysisResults.legalCompliance}
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </>
        )}
      </Accordion>
    </div>
  );
}
