'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from './shared/user-button';
import { useState } from 'react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Privacy Policy', href: '/privacy' },
];

export function Header() {
  const pathName = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 w-full border-b border-gray-200 bg-white/85 backdrop-blur-md shadow-sm transition-all duration-200'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6'>
        <Link
          href='/'
          className='text-xl font-bold text-gray-900 flex items-center gap-2 hover:opacity-90 transition-opacity'
        >
          {/* Logo SVG */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            className='w-6 h-6 text-blue-600'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 14v6m-3-3h6M10 3v6m-3-3h6m5 11a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span>LEGALYZE</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center space-x-8 text-sm font-medium'>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'relative py-5 transition-colors hover:text-blue-600',
                pathName === item.href
                  ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:content-[""]'
                  : 'text-gray-600'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* User profile and mobile menu button */}
        <div className='flex items-center gap-2'>
          <UserButton />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='md:hidden flex items-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors'
            aria-expanded={mobileMenuOpen}
            aria-label='Toggle navigation menu'
          >
            {mobileMenuOpen ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          'md:hidden transition-all duration-300 overflow-hidden border-t border-gray-200',
          mobileMenuOpen ? 'max-h-60' : 'max-h-0'
        )}
      >
        <nav className='flex flex-col py-2 px-4 bg-white'>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'py-3 px-2 transition-colors hover:bg-gray-50 rounded-md',
                pathName === item.href
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600'
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
