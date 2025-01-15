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
    <div className="flex h-screen flex-col bg-gray-50">
      {/* Header Section */}
      <Header />

      {/* Main Content Area */}
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <div className="min-w-[250px] border-r bg-white">
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
        <div className="w-1/3 min-w-[350px] border-l bg-gray-50">
          <CurlSection selectedEndpoint={selectedEndpoint} payload={payload} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
