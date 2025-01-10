import React from 'react';

const MainContent: React.FC = () => {
  return (
    <div className="w-full p-6">
      {/* Title and Endpoint */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Get a Task</h1>
        <p className="mt-2 text-sm text-gray-600">
          Returns the complete task record for a single task.
        </p>
        <div className="mt-2 flex items-center space-x-2">
          <span className="rounded-md bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
            GET
          </span>
          <p className="rounded bg-gray-50 p-2 font-mono text-sm text-blue-600">
            https://app.asana.com/api/1.0/tasks/{`{task_gid}`}
          </p>
        </div>
      </div>

      {/* Path Parameters */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Path Params</h2>
        <div className="mt-2 rounded-lg border border-gray-300 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-700">
                task_gid <span className="text-red-500">required</span>
              </p>
              <p className="text-sm text-gray-600">The task to operate on.</p>
            </div>
            <input
              type="text"
              placeholder="321654"
              className="w-32 rounded-md border border-red-300 p-2 focus:outline-none focus:ring focus:ring-red-300"
            />
          </div>
        </div>
      </section>

      {/* Query Parameters */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Query Params</h2>
        <div className="mt-2 space-y-4 rounded-lg border border-gray-300 p-4">
          <div>
            <p className="font-semibold text-gray-700">
              opt_pretty <span className="text-gray-500">(boolean)</span>
            </p>
            <p className="text-sm text-gray-600">
              Provides "pretty" output. This will take extra time and increase
              the response size, so it is advisable only to use this during
              debugging.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">
              opt_fields{' '}
              <span className="text-gray-500">(array of strings)</span>
            </p>
            <p className="text-sm text-gray-600">
              Defines fields to return. Some requests return compact
              representations of objects in order to conserve resources and
              complete the request more efficiently.
            </p>
            <button className="mt-2 rounded-md border border-blue-500 px-4 py-2 text-sm text-blue-500 hover:bg-blue-100">
              Add String
            </button>
          </div>
        </div>
      </section>

      {/* Responses */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Responses</h2>
        <div className="mt-2 space-y-4 rounded-lg border border-gray-300 p-4">
          <div className="flex items-center space-x-3">
            <span className="h-4 w-4 rounded-full bg-green-500"></span>
            <p className="font-semibold text-gray-700">200</p>
            <p className="text-sm text-gray-600">
              Successfully retrieved the specified task.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="h-4 w-4 rounded-full bg-red-500"></span>
            <p className="font-semibold text-gray-700">400</p>
            <p className="text-sm text-gray-600">
              This usually occurs because of a missing or malformed parameter.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="h-4 w-4 rounded-full bg-red-500"></span>
            <p className="font-semibold text-gray-700">401</p>
            <p className="text-sm text-gray-600">
              A valid authentication token was not provided.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainContent;
