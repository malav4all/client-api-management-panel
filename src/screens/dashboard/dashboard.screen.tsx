import React, { useState, useEffect } from 'react';
import Sidebar from '../../layouts/sidebar.component';
import MainContent from '../../layouts/main-content.component';
import CurlSection from '../../layouts/curl-section.component';
import Header from '../../layouts/header.component';
import { store } from '../../store';

const Dashboard: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<any>();
  const [payload, setPayload] = useState<any>({});

  // Update the payload when the selected endpoint changes
  useEffect(() => {
    setPayload(selectedEndpoint?.payload || {});
  }, [selectedEndpoint]);

  return (
    <div className="flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      {/* 
        1. Use flex-col on small screens, switching to flex-row on md screens.
        2. Remove per-section scroll (overflow-y-auto) unless you really need it on small screens.
      */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="border-r bg-white md:w-[250px]">
          <Sidebar
            permissionMatrix={store.getState().auth.user?.permissionMatrix}
            setSelectedEndpoint={setSelectedEndpoint}
          />
        </div>

        {/* Main Content */}
        <div className="flex-grow bg-gray-100 p-4">
          <MainContent
            selectedEndpoint={selectedEndpoint}
            setPayload={setPayload}
          />
        </div>

        {/* Curl Section */}
        <div className="border-l bg-gray-50 md:max-h-screen md:w-1/3 md:min-w-[350px] md:overflow-y-auto">
          <CurlSection selectedEndpoint={selectedEndpoint} payload={payload} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
