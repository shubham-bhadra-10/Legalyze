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
import { FileText, Ghost, Trash } from 'lucide-react';
import { Button } from '../ui/button';

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
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className='max-w-md mx-auto'
            >
              <div
                {...getRootProps()}
                className='bg-white border-2 border-dashed border-blue-400 p-8 rounded-xl text-center cursor-pointer hover:bg-blue-50 transition-colors duration-200 shadow-sm'
              >
                <input {...getInputProps()} />
                <motion.div layout>
                  <FileText className='mx-auto h-14 w-14 text-bg-[#1E2732] mb-2' />
                </motion.div>
                <p className='text-bg-[#1E2732] font-medium'>
                  {isDragActive
                    ? 'Drop the file here...'
                    : 'Drag & drop a PDF file here, or click to select one.'}
                </p>
              </div>

              {file.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='mt-4 bg-white border border-green-400 border-dashed text-green-900 p-4 rounded-lg shadow-sm flex items-center justify-between'
                >
                  <div>
                    <span className='block font-semibold'>{file[0].name}</span>
                    <span className='text-sm text-green-700'>
                      ({(file[0].size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                  </div>

                  <Button
                    variant='ghost'
                    size='icon'
                    className='text-red-500 hover:text-red-900 transition-colors duration-150'
                    onClick={() => setFile([])}
                  >
                    <Trash className='w-5 h-5' />
                  </Button>
                </motion.div>
              )}

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='text-red-500 mt-3 text-sm text-center'
                >
                  {error}
                </motion.p>
              )}
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
