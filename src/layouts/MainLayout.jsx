import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

const MainLayout = () => {
  return (
    <div className="page-container">
      <Navbar />
      
      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar />
        
        <main className="flex-1 md:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
