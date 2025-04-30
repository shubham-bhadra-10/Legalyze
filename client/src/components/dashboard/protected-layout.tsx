'use client';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Loader2 } from 'lucide-react';

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useCurrentUser();
  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='flex items-center justify-center'>
          <Loader2 className='size-4 mr-2 animate-spin' />
        </div>
      </div>
    );
  }
  if (!user) {
    return <div></div>;
  }
}
