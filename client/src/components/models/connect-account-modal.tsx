'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useModalStore } from '@/store/zustand';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { X } from 'lucide-react';
import { Loader2 } from 'lucide-react';

function googleSignIn(): Promise<void> {
  return new Promise((resolve) => {
    window.location.href = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL!;
    resolve(); // resolves immediately after redirect initiation
  });
}

export function ConnectAccountModal() {
  const [isAgreed, setIsAgreed] = useState(false);
  const modalKey = 'connectAccountModal';
  const { isOpen, closeModal } = useModalStore();

  const mutation = useMutation({
    mutationFn: googleSignIn,
    onSuccess: () => {
      closeModal(modalKey);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Something went wrong.');
    },
  });

  const handleGoogleSignIn = () => {
    if (!isAgreed) {
      toast.error(
        'Please agree to the terms and conditions before proceeding.'
      );
      return;
    }

    mutation.mutate();
  };

  return (
    <Dialog
      open={isOpen(modalKey)}
      onOpenChange={() => closeModal(modalKey)}
      key={modalKey}
    >
      <DialogContent className='p-0 overflow-hidden border border-gray-200 bg-white rounded-md max-w-xs w-full'>
        <div className='absolute right-3 top-3'>
          <button
            onClick={() => closeModal(modalKey)}
            className='rounded-full p-1 hover:bg-gray-100 transition-colors'
          >
            <X className='h-4 w-4 text-gray-500' />
          </button>
        </div>

        <div className='p-4 pb-6'>
          <DialogHeader className='space-y-0 text-left p-0 mb-4'>
            <DialogTitle className='text-base font-medium'>
              Connect Google Account
            </DialogTitle>
          </DialogHeader>

          <Button
            onClick={handleGoogleSignIn}
            disabled={!isAgreed || mutation.isPending}
            className='w-full bg-gray-900 hover:bg-black text-white rounded-md'
            variant='default'
          >
            {mutation.isPending ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <>Sign in with Google</>
            )}
          </Button>

          <div className='flex items-start mt-4'>
            <Checkbox
              id='terms'
              checked={isAgreed}
              onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
              className='mt-0.5 h-4 w-4 rounded-sm border border-gray-300'
            />
            <Label
              htmlFor='terms'
              className='ml-2 text-xs text-gray-700 font-normal'
            >
              I agree to the terms and conditions
            </Label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
