'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { use } from 'react';

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
                'transition-colors hover:text-foreground/80',
                pathName === item.href
                  ? 'text-foreground'
                  : 'text-foreground/60'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
