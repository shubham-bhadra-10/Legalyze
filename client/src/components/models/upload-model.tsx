import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { api } from '@/lib/api';
import { useContractStore } from '@/store/zustand';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence, motion } from 'framer-motion';
import { FileText } from 'lucide-react';

interface IUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: () => void;
}

export default function UploadModel({
  isOpen,
  onClose,
  onUploadComplete,
}: IUploadModalProps) {
  const { setAnalysisResults } = useContractStore();
  const [detectedType, setDetectedType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File[]>([]);
  const [step, setStep] = useState<
    'upload' | 'detecting' | 'confirm' | 'analyzing' | 'done'
  >('upload');

  const { mutate: detectedContractType } = useMutation({
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
    onError: (error: any) => {
      console.error(error);
      setError('Failed to detect contract type. Please try again.');
      setStep('upload');
    },
  });

  const { mutate: uploadFile, isPending: isProcessing } = useMutation({
    mutationFn: async ({
      file,
      contractType,
    }: {
      file: File;
      contractType: string;
    }) => {
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
      onUploadComplete();
    },
    onError: (error: any) => {
      console.error(error);
      setError('Failed to analyze contract. Please try again.');
      setStep('upload');
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles);
      setError(null);
      setStep('upload');
    } else {
      setError('Please select a valid file');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  const handleFileUpload = () => {
    if (file.length > 0) {
      setStep('detecting');
      detectedContractType({ file: file[0] });
    }
  };

  const handleAnalyzeContract = () => {
    if (file.length > 0 && detectedType) {
      setStep('analyzing');
      uploadFile({ file: file[0], contractType: detectedType });
    }
  };

  const handleClose = () => {
    onClose();
    setFile([]);
    setDetectedType(null);
    setError(null);
    setStep('upload');
  };

  const renderContent = () => {
    switch (step) {
      case 'upload': {
        return (
          <AnimatePresence>
            <motion.div>
              <div
                {...getRootProps()}
                className='border border-dashed p-6 rounded-lg text-center cursor-pointer'
              >
                <input {...getInputProps()} />
                <motion.div>
                  <FileText className='mx-auto h-12 w-12 text-blue-900' />
                </motion.div>
                {isDragActive ? (
                  <p>Drop the file here...</p>
                ) : (
                  <p>Drag & drop a PDF file here, or click to select one.</p>
                )}
              </div>
              {file.length > 0 && (
                <div className='mt-4 text-black'>
                  <span>
                    {file[0].name}
                    {' - '}
                    <span className='text-sm text-black'>
                      ({file[0].size} bytes)
                    </span>
                  </span>
                </div>
              )}
              {error && <p className='text-red-500 mt-2'>{error}</p>}
            </motion.div>
          </AnimatePresence>
        );
      }
      // Add other steps (detecting, confirm, etc.) as needed
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Contract</DialogTitle>
          <DialogDescription>
            Please upload a PDF contract file to begin analysis.
          </DialogDescription>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
