import { useModalStore } from '@/store/zustand';
import { Dialog, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { DialogHeader } from '../ui/dialog';
import { Button } from '../ui/button';
import { Check, Loader2 } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
function googleSignIn(): Promise<void> {
  return new Promise((resolve) => {
    window.location.href = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL!;
    resolve();
  });
}

export function ConnectAccountModal() {
  const [isAgreed, setIsAgreed] = useState(false);
  const modalKey = 'connectAccountModal';
  const { isOpen, closeModal } = useModalStore();
  const mutation = useMutation({
    mutationFn: () => googleSignIn(),
    onSuccess: () => {
      closeModal(modalKey);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleGoogleSignIn = async () => {
    if (!isAgreed) {
      mutation.mutate();
    } else {
      toast.error(
        'Please agree to the terms and conditions before proceeding.'
      );
    }
    return (
      <Dialog
        open={isOpen(modalKey)}
        onOpenChange={() => closeModal(modalKey)}
        key={modalKey}
      >
        <DialogHeader>
          <DialogTitle>Connect Google Account</DialogTitle>
          <DialogDescription>
            Please connect your Google account to continue.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <Button
            onClick={handleGoogleSignIn}
            disabled={!isAgreed || mutation.isPending}
            className='w-full'
          >
            {mutation.isPending ? (
              <Loader2 className='mr-2 size-4 animate-spin' />
            ) : (
              <>Sign in with Google</>
            )}
          </Button>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='terms'
              checked={isAgreed}
              onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
            />
            <Label
              htmlFor='terms'
              className='text-sm text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              I agree to the terms and conditions
            </Label>
          </div>
        </div>
      </Dialog>
    );
  };
}
