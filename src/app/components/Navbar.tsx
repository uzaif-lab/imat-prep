'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, useUser } from '@clerk/nextjs';
import { FiMenu, FiX } from 'react-icons/fi';
import { useSubscription } from '@/hooks/useSubscription';

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const { hasSubscription } = useSubscription();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600';
  };

  // Hide pricing link if user has subscription
  const showPricingLink = !hasSubscription;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <h1 className="text-xl font-bold text-blue-600">IMAT Prep</h1>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                isActive('/') ? 'border-blue-500' : 'border-transparent'
              } ${isActive('/')}`}>
                Home
              </Link>
              <Link href="/mock-tests" className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                isActive('/mock-tests') ? 'border-blue-500' : 'border-transparent'
              } ${isActive('/mock-tests')}`}>
                Mock Tests
              </Link>
              {showPricingLink && (
                <Link href="/pricing/premium" className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  isActive('/pricing/premium') ? 'border-blue-500' : 'border-transparent'
                } ${isActive('/pricing/premium')}`}>
                Pricing
              </Link>
              )}
              {isSignedIn && (
                <>
                  {/* Dashboard and Results links have been removed */}
                </>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Hi, {user?.firstName || 'User'}</span>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-10 h-10"
                    }
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/login" className="text-gray-600 hover:text-blue-600">
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className={`block pl-3 pr-4 py-2 border-l-4 ${
              isActive('/') ? 'border-blue-500 bg-blue-50' : 'border-transparent'
            } ${isActive('/')}`}>
              Home
            </Link>
            <Link href="/mock-tests" className={`block pl-3 pr-4 py-2 border-l-4 ${
              isActive('/mock-tests') ? 'border-blue-500 bg-blue-50' : 'border-transparent'
            } ${isActive('/mock-tests')}`}>
              Mock Tests
            </Link>
            {showPricingLink && (
              <Link href="/pricing/premium" className={`block pl-3 pr-4 py-2 border-l-4 ${
                isActive('/pricing/premium') ? 'border-blue-500 bg-blue-50' : 'border-transparent'
              } ${isActive('/pricing/premium')}`}>
              Pricing
            </Link>
            )}
            {isSignedIn ? (
              <>
                {/* Dashboard and Results links have been removed */}
                <div className="block pl-3 pr-4 py-2 border-l-4 border-transparent">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-600 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-600 hover:text-blue-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 