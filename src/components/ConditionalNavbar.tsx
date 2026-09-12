'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar on private document routes
  if (pathname?.startsWith('/p/')) {
    return null;
  }
  
  return <Navbar />;
}
