'use client';

import { useCurrentUser } from '@/hooks/use-current-user';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function googleSignIn(): Promise<void> {
  return new Promise((resolve) => {
    window.location.href = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL!;
    resolve();
  });
}

export function UserButton() {
  const { user } = useCurrentUser();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
      router.refresh(); // Refresh session-based UI
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='p-0 rounded-full hover:bg-gray-200 transition duration-200'
            >
              <Avatar className='h-9 w-9 rounded-full'>
                <AvatarImage
                  src={user?.profileImage || ''}
                  alt={user?.displayName || 'User'}
                  className='rounded-full object-cover'
                />
                <AvatarFallback className='flex items-center justify-center h-full w-full rounded-full bg-gray-500 text-white font-semibold text-sm'>
                  {user?.displayName?.charAt(0).toUpperCase() || ''}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className='bg-white text-gray-900 border border-gray-200 shadow-lg rounded-md w-56 py-2'
            align='end'
            forceMount
          >
            <DropdownMenuItem className='flex flex-col items-start px-3 py-2 cursor-default hover:bg-gray-100'>
              <span className='text-sm font-medium'>{user?.displayName}</span>
              <span className='text-sm text-gray-500'>{user?.email}</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href='/dashboard'
                className='w-full px-3 py-2 hover:bg-gray-100 rounded-sm text-sm'
              >
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href='/dashboard/settings'
                className='w-full px-3 py-2 hover:bg-gray-100 rounded-sm text-sm'
              >
                Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onSelect={handleLogout}
              className='w-full px-3 py-2 hover:bg-gray-100 rounded-sm text-sm text-red-600 cursor-pointer'
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={googleSignIn}
          className='bg-gray-900 text-white hover:bg-gray-800 rounded-md px-4 py-2 transition duration-200'
        >
          Sign In
        </Button>
      )}
    </div>
  );
}
