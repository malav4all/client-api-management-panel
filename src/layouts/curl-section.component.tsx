import React, { useState } from 'react';
import { useSelector } from 'react-redux';

interface CurlSectionProps {
  selectedEndpoint: any; // Pass the selected endpoint from the parent component
  payload: any; // Pass the updated payload from the parent
}

const CurlSection: React.FC<CurlSectionProps> = ({
  selectedEndpoint,
  payload,
}) => {
  const apiKey = useSelector((state: any) => state.auth.user?.apiKey || '');
  const [authType, setAuthType] = useState('apikey');
  const [token, setToken] = useState(apiKey);

  const mapAccessTypeToMethod = (accessType: string) => {
    switch (accessType) {
      case 'read':
        return 'GET';
      case 'write':
        return 'POST';
      case 'delete':
        return 'DELETE';
      default:
        return 'GET';
    }
  };

  const httpMethod = mapAccessTypeToMethod(selectedEndpoint?.accessType);

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

  if (!selectedEndpoint) {
    return (
      <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
        <p className="text-gray-600">
          Select an endpoint to view the cURL command.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
      {/* Language Tabs */}
      <div className="mb-4 flex space-x-4">
        {['Node', 'Ruby', 'PHP', 'Python'].map((lang, index) => (
          <button
            key={index}
            className={`rounded px-4 py-2 ${
              lang === 'Node'
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
      <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h3 className="mb-2 text-sm font-semibold text-gray-800">CURL</h3>
        <div className="rounded-lg bg-gray-900 p-4 text-sm text-white">
          <pre>
            {`curl --request ${httpMethod} \\
--url http://localhost:3000/gateway/${selectedEndpoint.name} \\
--header 'accept: application/json' \\
--header '${
              authType === 'apikey'
                ? `x-api-key: ${token}`
                : `Authorization: Bearer ${token}`
            }'${
              payload
                ? ` \\
--data '${JSON.stringify(payload, null, 2)}'`
                : ''
            }
`}
          </pre>
        </div>
        <button className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Try It!
        </button>
      </div>

      {/* Response Section */}
      {/* Response Section */}
      {/* Response Section */}
      <div className="mt-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">Response</h3>
          <select className="rounded-md border p-2">
            <option value="application/json">application/json</option>
          </select>
        </div>
        <div className="rounded-lg bg-gray-100 p-4 text-sm">
          <p className="mb-4 text-gray-600">
            Click <strong>Try It!</strong> to start a request and see the
            response here!
          </p>
          <p className="mb-2 font-semibold text-gray-800">Response codes:</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {selectedEndpoint.responseCodes.map(
              (response: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 rounded-md bg-white p-4 shadow-sm"
                >
                  <span
                    className={`h-5 w-5 rounded-full ${
                      response.code === 200
                        ? 'bg-green-500'
                        : response.code >= 400
                          ? 'bg-red-500'
                          : 'bg-gray-500'
                    }`}
                  ></span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {response.code}
                    </p>
                    <p className="text-sm text-gray-600">
                      {response.description}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurlSection;
