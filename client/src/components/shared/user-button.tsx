'use client';

import { useCurrentUser } from '@/hooks/use-current-user';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Icons } from './icons';
import { logout } from '@/lib/api';
import { useModalStore } from '@/store/zustand';

// function googleSignIn(): Promise<void> {
//   return new Promise((resolve) => {
//     window.location.href = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL!;
//     resolve();
//   });
// }

export function UserButton() {
  const { user } = useCurrentUser();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    // router.refresh();
    // router.push('/');
    window.location.reload();
  };

  const { openModal } = useModalStore();

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
                <Icons.dashboard className='mr-2 h-4 w-4' />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href='/dashboard/settings'
                className='w-full px-3 py-2 hover:bg-gray-100 rounded-sm text-sm'
              >
                <Icons.settings className='mr-2 h-4 w-4' />
                Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className='w-full px-3 py-2 hover:bg-gray-100 rounded-sm text-sm text-red-600 cursor-pointer'
            >
              <Icons.logout className='mr-2 h-4 w-4 text-red-600' />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={() => openModal('connectAccountModal')}
          className='bg-gray-900 text-white hover:bg-gray-800 rounded-md px-4 py-2 transition duration-200'
        >
          Sign In
        </Button>
      )}
    </div>
  );
}
