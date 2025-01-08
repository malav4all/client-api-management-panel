import React from 'react';
import Sidebar from '../../layouts/sidebar.component';
import MainContent from '../../layouts/main-content.component';

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Dashboard;
