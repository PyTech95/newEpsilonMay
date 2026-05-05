import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';

export default function Layout2() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar2 />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
