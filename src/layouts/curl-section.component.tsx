import React from 'react';

const CurlSection: React.FC = () => {
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
        <select className="w-full rounded-md border p-2">
          <option value="Bearer">Bearer</option>
        </select>
        <input
          type="text"
          placeholder="token"
          className="mt-2 w-full rounded-md border p-2 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* CURL Request */}
      <div className="mb-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-800">CURL</h3>
        <div className="rounded-lg bg-gray-900 p-4 text-sm text-white">
          <pre>
            {`curl --request GET \\
--url https://app.asana.com/api/1.0/tasks/task_gid \\
--header 'accept: application/json'`}
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
