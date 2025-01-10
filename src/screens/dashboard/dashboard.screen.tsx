import React from 'react';
import Sidebar from '../../layouts/sidebar.component';
import MainContent from '../../layouts/main-content.component';
import CurlSection from '../../layouts/curl-section.component';
import Header from '../../layouts/header.component';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <MainContent />
        <CurlSection />
      </div>
    </div>
  );
};

export default Dashboard;
