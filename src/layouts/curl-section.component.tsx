import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CurlSection: React.FC = () => {
  const apiKey = useSelector((state: any) => state.auth.user?.apiKey || '');
  const [authType, setAuthType] = useState('apikey');
  const [token, setToken] = useState(apiKey);

  const handleAuthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAuthType = e.target.value;
    setAuthType(newAuthType);

    // Set the default token or key based on the selected auth type
    if (newAuthType === 'apikey') {
      setToken(apiKey);
    } else if (newAuthType === 'bearer') {
      setToken(''); // Clear the token for bearer auth
    }
  };

  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
      {/* Language Tabs */}
      <div className="mb-4 flex space-x-4">
        {['Shell', 'Node', 'Ruby', 'PHP', 'Python'].map((lang, index) => (
          <button
            key={index}
            className={`rounded px-4 py-2 ${
              lang === 'Shell'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Authentication Section */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Authentication
        </label>
        <select
          value={authType}
          onChange={handleAuthChange}
          className="w-full rounded-md border p-2"
        >
          <option value="apikey">API Key</option>
          <option value="bearer">Bearer</option>
        </select>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder={authType === 'apikey' ? 'x-api-key' : 'Bearer token'}
          className="mt-2 w-full rounded-md border p-2 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* CURL Request */}
      <div className="mb-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-800">CURL</h3>
        <div className="rounded-lg bg-gray-900 p-4 text-sm text-white">
          <pre>
            {`curl --request GET \\
--url http://localhost:3000/gateway/ \\
--header 'accept: application/json' \\
--header '${authType === 'apikey' ? `x-api-key: ${token}` : `Authorization: Bearer ${token}`}'
`}
          </pre>
        </div>
        <button className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Try It!
        </button>
      </div>

      {/* Response Section */}
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">Response</h3>
          <select className="rounded-md border p-2">
            <option value="application/json">application/json</option>
          </select>
        </div>
        <div className="rounded-lg bg-gray-100 p-4 text-sm">
          <p className="text-gray-600">
            Click <strong>Try It!</strong> to start a request and see the
            response here!
          </p>
          <p className="mt-2 text-gray-600">Or choose an example:</p>
          <div className="mt-2 flex items-center space-x-4">
            {[
              { code: '200', color: 'bg-green-500' },
              { code: '400', color: 'bg-red-500' },
              { code: '401', color: 'bg-red-500' },
              { code: '403', color: 'bg-red-500' },
              { code: '404', color: 'bg-red-500' },
              { code: '500', color: 'bg-red-500' },
            ].map((status, index) => (
              <div key={index} className="flex items-center space-x-1">
                <span className={`h-3 w-3 rounded-full ${status.color}`}></span>
                <span className="text-sm text-gray-700">{status.code}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurlSection;
