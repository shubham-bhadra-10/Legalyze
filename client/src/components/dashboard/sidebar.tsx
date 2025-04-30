'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  LayoutDashboard,
  FileText,
  Settings,
  Menu,
  X,
} from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const NavItem = ({ href, icon, label, onClick }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} onClick={onClick}>
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
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className='md:hidden fixed top-4 left-4 z-30 bg-white p-2 rounded-md shadow-md border border-gray-200'
        aria-label='Toggle menu'
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className='md:hidden fixed inset-0 bg-black bg-opacity-50 z-20'
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 z-20
          w-[240px] md:w-[200px] h-screen
          border-r border-gray-200 bg-white px-3 py-5 
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Close button for mobile view */}
        <button
          onClick={closeSidebar}
          className='md:hidden self-end p-2 mb-4'
          aria-label='Close menu'
        >
          <X size={20} />
        </button>

        <nav className='flex-1 pt-10 md:pt-0'>
          <NavItem
            href='/'
            icon={<Home size={18} />}
            label='Home'
            onClick={closeSidebar}
          />
          <NavItem
            href='/dashboard'
            icon={<LayoutDashboard size={18} />}
            label='Dashboard'
            onClick={closeSidebar}
          />
          <NavItem
            href='/dashboard/results'
            icon={<FileText size={18} />}
            label='Results'
            onClick={closeSidebar}
          />
          <NavItem
            href='/dashboard/settings'
            icon={<Settings size={18} />}
            label='Settings'
            onClick={closeSidebar}
          />
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
