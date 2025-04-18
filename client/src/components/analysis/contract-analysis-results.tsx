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
    return (
      <div className='flex items-center justify-center p-8 text-gray-500 font-medium'>
        No results
      </div>
    );
  }

  const getScore = () => {
    const score = anaysisResults.overallScore ?? 0;

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
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
            className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className='flex justify-between items-start mb-3'>
              <span className='font-semibold text-lg text-gray-800'>
                {type === 'risk' ? item.risk : item.opportunity}
              </span>
              {(item.severity || item.impact) && (
                <Badge
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    type === 'risk'
                      ? getSeverityColor(item.severity || 'low')
                      : getImpactColor(item.impact || 'low')
                  }`}
                >
                  {(item.severity || item.impact)?.toUpperCase()}
                </Badge>
              )}
            </div>
            <p className='text-sm text-gray-600 leading-relaxed'>
              {item.explanation}
            </p>
          </motion.li>
        ))}

        {!isActive && items.length > 3 && (
          <motion.li
            className='rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-inner blur-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
          >
            <div className='flex justify-between items-start mb-3'>
              <span className='font-semibold text-lg text-gray-500'>
                {type === 'risk' ? fakeItems.risk : fakeItems.opportunity}
              </span>
              <Badge className='text-xs px-2.5 py-1 rounded-full bg-gray-300 text-gray-700'>
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
    if (isActive) {
      return (
        <div className='relative overflow-hidden rounded-lg'>
          <div className='absolute inset-0 bg-white/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4'>
            <Button
              variant='outline'
              className='border-2 border-primary hover:bg-primary/10 transition-colors duration-300 shadow-md px-6 py-2 font-medium'
            >
              Upgrade to Premium
            </Button>
          </div>
          <div className='opacity-50'>{content}</div>
        </div>
      );
    }
    return content;
  };

  return (
    <div className='container mx-auto px-4 py-8 max-w-7xl'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
        <h1 className='text-3xl font-bold text-gray-900'>Analysis Results</h1>
        <div className='flex space-x-2'>{/* ASK AI BUTTON */}</div>
      </div>

      <Card className='mb-8 border-none shadow-lg rounded-xl overflow-hidden'>
        <CardHeader className='bg-gray-50 border-b border-gray-100 pb-4'>
          <CardTitle className='text-xl text-gray-900'>
            Overall Contract Score
          </CardTitle>
          <CardDescription className='text-gray-600'>
            Based on risks and opportunities identified
          </CardDescription>
        </CardHeader>

        <CardContent className='pt-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
            {/* LEFT SECTION */}
            <div className='space-y-6'>
              <div className='flex items-center space-x-4'>
                <div className='text-6xl font-bold text-gray-800'>
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

              <div className='space-y-3'>
                <div className='flex justify-between text-sm text-gray-700'>
                  <span className='font-medium'>Risk</span>
                  <span className='font-semibold'>
                    {100 - anaysisResults.overallScore}%
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className='bg-red-500 h-2 rounded-full'
                    style={{ width: `${100 - anaysisResults.overallScore}%` }}
                  ></div>
                </div>

                <div className='flex justify-between text-sm text-gray-700 mt-4'>
                  <span className='font-medium'>Opportunities</span>
                  <span className='font-semibold'>
                    {anaysisResults.overallScore}%
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className='bg-green-500 h-2 rounded-full'
                    style={{ width: `${anaysisResults.overallScore}%` }}
                  ></div>
                </div>
              </div>

              <p className='text-sm text-gray-600 italic'>
                This score represents the overall risk and opportunity
                assessment of the contract.
              </p>
            </div>

            {/* RIGHT SECTION */}
            <div className='h-64'>
              <OverallScoreChart overallScore={anaysisResults.overallScore} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className='mb-8'>
        <TabsList className='grid w-full grid-cols-4 gap-2 rounded-lg bg-gray-100 p-1.5 shadow-sm mb-6'>
          <TabsTrigger
            value='summary'
            className='text-sm font-medium text-gray-700 transition-all duration-200 hover:text-black data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-md py-2.5'
          >
            Summary
          </TabsTrigger>
          <TabsTrigger
            value='risks'
            className='text-sm font-medium text-gray-700 transition-all duration-200 hover:text-black data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-md py-2.5'
          >
            Risks
          </TabsTrigger>
          <TabsTrigger
            value='opportunities'
            className='text-sm font-medium text-gray-700 transition-all duration-200 hover:text-black data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-md py-2.5'
          >
            Opportunities
          </TabsTrigger>
          <TabsTrigger
            value='details'
            className='text-sm font-medium text-gray-700 transition-all duration-200 hover:text-black data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-md py-2.5'
          >
            Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value='summary'>
          <Card className='shadow-md border-none rounded-xl overflow-hidden'>
            <CardHeader className='bg-gray-50 border-b border-gray-100'>
              <CardTitle className='text-xl text-gray-800'>
                Contract Summary
              </CardTitle>
            </CardHeader>
            <CardContent className='pt-6'>
              <p className='text-lg leading-relaxed text-gray-700'>
                {anaysisResults.summary}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='risks'>
          <Card className='shadow-md border-none rounded-xl overflow-hidden'>
            <CardHeader className='bg-gray-50 border-b border-gray-100'>
              <CardTitle className='text-xl text-gray-800'>
                Contract Risks
              </CardTitle>
            </CardHeader>
            <CardContent className='pt-6'>
              {renderRisksandOpportunities(anaysisResults.risks, 'risk')}
              {!isActive && (
                <p className='mt-6 text-center text-sm text-gray-500 bg-gray-50 py-3 rounded-lg border border-gray-200'>
                  Upgrade to Premium to view all risks
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='opportunities'>
          <Card className='shadow-md border-none rounded-xl overflow-hidden'>
            <CardHeader className='bg-gray-50 border-b border-gray-100'>
              <CardTitle className='text-xl text-gray-800'>
                Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className='pt-6'>
              {renderRisksandOpportunities(
                anaysisResults.opportunities,
                'opportunity'
              )}
              {!isActive && (
                <p className='mt-6 text-center text-sm text-gray-500 bg-gray-50 py-3 rounded-lg border border-gray-200'>
                  Upgrade to Premium to view all opportunities
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='details'>
          {isActive ? (
            <div className='grid md:grid-cols-2 gap-6'>
              <Card className='shadow-md border-none rounded-xl overflow-hidden'>
                <CardHeader className='bg-gray-50 border-b border-gray-100'>
                  <CardTitle className='text-xl text-gray-800'>
                    Contract Details
                  </CardTitle>
                </CardHeader>
                <CardContent className='pt-6'>
                  <ul className='space-y-3'>
                    {anaysisResults.keyClauses?.map((keyClause, index) => (
                      <motion.li
                        key={index}
                        className='flex items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm'
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {keyClause}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className='shadow-md border-none rounded-xl overflow-hidden'>
                <CardHeader className='bg-gray-50 border-b border-gray-100'>
                  <CardTitle className='text-xl text-gray-800'>
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className='pt-6'>
                  <ul className='space-y-3'>
                    {anaysisResults.recommendations?.map(
                      (recommendation, index) => (
                        <motion.li
                          key={index}
                          className='bg-white p-3 rounded-lg border border-gray-100 shadow-sm'
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          {recommendation}
                        </motion.li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className='shadow-md border-none rounded-xl overflow-hidden'>
              <CardHeader className='bg-gray-50 border-b border-gray-100'>
                <CardTitle className='text-xl text-gray-800'>
                  Contract Details
                </CardTitle>
              </CardHeader>
              <CardContent className='py-8 flex flex-col items-center'>
                <p className='text-center text-gray-600 mb-6 max-w-md'>
                  Upgrade to Premium to view contract detailed analysis,
                  including key clauses and recommendations.
                </p>
                <Button className='px-6 py-2 font-medium hover:shadow-lg transition-shadow'>
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Accordion type='single' collapsible className='mb-6'>
        <AccordionItem
          value='contract-details'
          className='border rounded-xl overflow-hidden shadow-sm'
        >
          <AccordionTrigger className='px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors font-medium'>
            Content Details
          </AccordionTrigger>
          {isActive ? (
            <AccordionContent className='px-6 py-4'>
              <div className='grid md:grid-cols-2 gap-8 pt-2'>
                <div className='space-y-4'>
                  <div>
                    <h3 className='font-semibold text-lg mb-3 text-gray-800'>
                      Duration and Termination
                    </h3>
                    <p className='mb-4 text-gray-700'>
                      {anaysisResults.contractDuration}
                    </p>
                    <h4 className='font-semibold mb-2 text-gray-800'>
                      Termination conditions
                    </h4>
                    <p className='text-gray-700'>
                      {anaysisResults.terminationConditions}
                    </p>
                  </div>
                </div>
                <div className='space-y-4'>
                  <h3 className='font-semibold text-lg mb-3 text-gray-800'>
                    Legal information
                  </h3>
                  <div>
                    <h4 className='font-semibold mb-2 text-gray-800'>
                      Legal Compliance
                    </h4>
                    <p className='text-gray-700'>
                      {anaysisResults.legalCompliance}
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          ) : (
            <AccordionContent className='px-6 py-8'>
              <div className='flex flex-col items-center justify-center text-center'>
                <p className='text-gray-600 mb-4 max-w-md'>
                  Upgrade to Premium to view detailed contract information,
                  including duration, termination conditions, and legal
                  compliance.
                </p>
                <Button className='px-6 py-2 font-medium hover:shadow-lg transition-shadow'>
                  Upgrade to Premium
                </Button>
              </div>
            </AccordionContent>
          )}
        </AccordionItem>
      </Accordion>
      <Card>
        <CardHeader>
          <CardTitle>Negotiation Points</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {anaysisResults.negotiationPoints?.map((point, index) => (
              <li
                key={index}
                className='flex items-start bg-white p-4 rounded-lg border border-gray-200 shadow-sm break-words'
              >
                <span className='text-gray-800'>{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
