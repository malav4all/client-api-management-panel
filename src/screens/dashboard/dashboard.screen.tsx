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
      <Header />
      <div className="flex flex-grow">
        <Sidebar
          permissionMatrix={store.getState().auth.user?.permissionMatrix}
          setSelectedEndpoint={setSelectedEndpoint}
        />
        <MainContent
          selectedEndpoint={selectedEndpoint}
          setPayload={setPayload}
        />
        <CurlSection selectedEndpoint={selectedEndpoint} payload={payload} />
      </div>
    </div>
  );
};

export default Dashboard;
