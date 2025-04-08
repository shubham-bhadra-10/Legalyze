'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { UserButton } from './shared/user-button';

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Privacy Policy', href: '/privacy' },
];

export function Header() {
  const pathName = usePathname();
  return (
    <header className='sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm px-4'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between'>
        <Link href='/' className='text-xl font-bold text-gray-900'>
          LEGALYZE
        </Link>

        <nav className='flex items-center space-x-7 text-sm font-medium'>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'relative py-4 transition-colors hover:text-gray-900',
                pathName === item.href
                  ? 'text-gray-900 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0 after:border-l-[8px] after:border-r-[8px] after:border-t-0 after:border-b-[8px] after:border-l-transparent after:border-r-transparent after:border-b-white after:content-[""]'
                  : 'text-gray-500'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <UserButton />
      </div>
    </header>
  );
}
