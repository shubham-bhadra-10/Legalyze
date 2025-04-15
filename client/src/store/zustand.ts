import { create } from 'zustand';

interface ContractStore {
  analysisResults: any;
  setAnalysisResults: (results: any) => void;
}

const useContractStore = create<ContractStore>((set) => ({
  analysisResults: undefined,
  setAnalysisResults: (results) => set({ analysisResults: results }),
}));

export { useContractStore };
