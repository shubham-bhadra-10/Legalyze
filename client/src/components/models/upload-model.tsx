import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { api } from '@/lib/api';
import { useContractStore } from '@/store/zustand';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

interface IUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnploadComplete: () => void;
}

export default function UploadModel({
  isOpen,
  onClose,
  onUnploadComplete,
}: IUploadModalProps) {
  const { setAnalysisResults } = useContractStore();
  const [detectedType, setDetectedType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File[]>([]);
  const [step, setStep] = useState<
    'upload' | 'detecting' | 'confirm' | 'analyzing' | 'done'
  >('upload');

  const {} = useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const formData = new FormData();
      formData.append('contract', file);

      const response = await api.post<{ detectedType: string }>(
        '/contracts/detect-type',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data.detectedType;
    },
    onSuccess: (data: string) => {
      setDetectedType(data);
      setStep('confirm');
    },
  });
  const { mutate: uploadFile, isPending: isProcessing } = useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const formData = new FormData();
      formData.append('contract', file);
      const response = await api.post('/contracts/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      setAnalysisResults(data);
      onUnploadComplete();
    },
  });
}
