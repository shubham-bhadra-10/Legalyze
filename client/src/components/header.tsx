import Link from 'next/link';

const navItems: { name: string; href: string }[] = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Privacy Policy', href: '/privacy' },
];
export function Header() {
  return (
    <header className='sticky ps-4 top-0 z-50 w-full border-b bg-background/95 backdrop-blur'>
      <div className='container flex h-16 items-center'>
        <div className='mr-4 hidden md:flex'>
          <Link href='/' className='mr-6 flex items-center space-x-2'>
            Legalyze
          </Link>
        </div>
      </div>
      header
    </header>
  );
}
