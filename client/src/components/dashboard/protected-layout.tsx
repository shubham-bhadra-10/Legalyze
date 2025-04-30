'use client';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Loader2, LockIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useModalStore } from '@/store/zustand';

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
    return (
      <div className='flex items-center justify-center h-screen'>
        <AuthCard />
      </div>
    );
  }
  return <>{children}</>;
}

export default function AuthCard() {
  const { openModal } = useModalStore();
  return (
    <Card className='w-full max-w-2xl mx-auto mt-10 shadow-xl rounded-xl overflow-hidden border border-gray-100'>
      <div className='flex flex-col sm:flex-row'>
        <div className='sm:w-1/4 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center p-8 border-b sm:border-b-0 sm:border-r border-gray-100'>
          <LockIcon size={70} className='text-primary drop-shadow-sm' />
        </div>
        <div className='sm:w-3/4 p-8 bg-white'>
          <CardHeader className='space-y-3 px-0 pt-0 pb-0'>
            <CardTitle className='text-2xl font-bold text-gray-800'>
              Authentication required to access this page.
            </CardTitle>
            <CardDescription className='text-gray-600 text-base leading-relaxed'>
              You need to be logged in to access this page. Please log in to
              your account or create a new one.
            </CardDescription>
          </CardHeader>
          <CardContent className='px-0 py-4'>
            <div className='flex flex-col sm:flex-row gap-3'>
              <Button
                onClick={() => openModal('connectAccountModal')}
                className='flex-1 '
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  width='20'
                  height='20'
                >
                  <path
                    fill='#4285F4'
                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  />
                  <path
                    fill='#34A853'
                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  />
                  <path
                    fill='#FBBC05'
                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  />
                  <path
                    fill='#EA4335'
                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  />
                </svg>
                Continue with Google
              </Button>
              <Link href={'/'} className='flex-1'>
                <Button className='w-full' variant='outline'>
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
