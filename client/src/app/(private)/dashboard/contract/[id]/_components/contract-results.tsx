'use client';

import ContractAnalysisResults from '@/components/analysis/contract-analysis-results';
import { useCurrentUser } from '@/hooks/use-current-user';
import { ContractAnalysis } from '@/interfaces/contract.interface';
import { api } from '@/lib/api';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IContractResultsProps {
  contractId: string;
}

export default function ContractResults({ contractId }: IContractResultsProps) {
  const { user } = useCurrentUser();
  const [anaysisResults, setAnalysisResults] =
    useState<ContractAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      fetchAnalysisResults(contractId);
    }
  }, [user]);

  const fetchAnalysisResults = async (id: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/contracts/contract/${id}`);
      setAnalysisResults(response.data);
      console.log('Analysis results:', response.data);
      setError(false);
    } catch (error) {
      console.error('Error fetching analysis results:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  if (error){
    return notFound();
  }
  return (
    <ContractAnalysisResults 
    anaysisResults={anaysisResults} 
    isActive={false} />
  );
}
