'use client';
import { useContractStore } from '@/store/zustand';

export default function ContractResultsPage() {
  const analysisResults = useContractStore();
  return <div>{JSON.stringify(analysisResults)}</div>;
}
