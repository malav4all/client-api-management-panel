import React from 'react';

const MainContent: React.FC = () => {
  return (
    <div className="w-3/4 p-6">
      <h1 className="text-2xl font-semibold text-gray-800">Get a Task</h1>
      <p className="mt-2 text-gray-600">
        Returns the complete task record for a single task.
      </p>

      {/* Path Parameters */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800">Path Parameters</h2>
        <div className="mt-2 rounded-lg bg-gray-100 p-4">
          <div className="mb-2">
            <p className="font-semibold">
              task_gid <span className="text-red-500">*</span>
            </p>
            <p className="text-sm text-gray-600">The task to operate on.</p>
          </div>
        </div>
      </section>

      {/* Query Parameters */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Query Parameters
        </h2>
        <div className="mt-2 rounded-lg bg-gray-100 p-4">
          <div className="mb-4">
            <p className="font-semibold">
              opt_pretty <span className="text-gray-500">(boolean)</span>
            </p>
            <p className="text-sm text-gray-600">
              Provides "pretty" output. Provides the response in a "pretty"
              format.
            </p>
          </div>
          <div>
            <p className="font-semibold">
              opt_fields{' '}
              <span className="text-gray-500">(array of strings)</span>
            </p>
            <p className="text-sm text-gray-600">
              Defines fields to return. Some requests return compact
              representations of objects.
            </p>
          </div>
        </div>
      </section>

      {/* Response Section */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800">Responses</h2>
        <div className="mt-2 rounded-lg bg-gray-100 p-4">
          <div className="mb-2">
            <p className="font-semibold">200</p>
            <p className="text-sm text-gray-600">
              Successfully retrieved the specified task.
            </p>
          </div>
          <div className="mb-2">
            <p className="font-semibold">400</p>
            <p className="text-sm text-gray-600">
              Missing or malformed parameter.
            </p>
          </div>
          <div>
            <p className="font-semibold">401</p>
            <p className="text-sm text-gray-600">
              Invalid authentication token.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainContent;
