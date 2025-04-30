'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, FileText, Settings } from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ href, icon, label }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <div
        className={`flex items-center px-4 py-3 mb-1 rounded-md transition-colors ${
          isActive ? 'bg-gray-200' : 'hover:bg-gray-100'
        }`}
      >
        <span className='mr-3'>{icon}</span>
        <span className='text-sm font-medium'>{label}</span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  return (
    <div className='w-[200px] min-h-screen border-r border-gray-200 bg-white px-3 py-5 flex flex-col'>
      <nav className='flex-1'>
        <NavItem href='/' icon={<Home size={18} />} label='Home' />
        <NavItem
          href='/dashboard'
          icon={<LayoutDashboard size={18} />}
          label='Dashboard'
        />
        <NavItem
          href='/dashboard/results'
          icon={<FileText size={18} />}
          label='Results'
        />
        <NavItem
          href='/dashboard/settings'
          icon={<Settings size={18} />}
          label='Settings'
        />
      </nav>
    </div>
  );
};

export default Sidebar;
