import React from 'react';
import { store } from '../store';

interface Permission {
  allowed: boolean;
  limit?: number;
  allowedEndpoints?: string[];
}

interface PermissionMatrix {
  [key: string]: {
    [action: string]: Permission;
  };
}

const permissionMatrix: PermissionMatrix =
  store.getState().auth.user?.permissionMatrix;

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-64 border-r bg-gray-100 p-4">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">Permissions</h2>
      <ul className="space-y-4">
        {Object.entries(permissionMatrix).map(
          ([module, actions]) => (
            <li key={module}>
              <h3 className="text-md font-semibold capitalize text-gray-700">
                {module}
              </h3>
              <ul className="ml-4 mt-2 space-y-2">
                {Object.entries(actions).map(([action, details]) => {
                  if (details.allowed) {
                    return (
                      <li key={action} className="flex items-center space-x-2">
                        <span
                          className={`rounded px-2 py-1 text-xs font-bold ${
                            action === 'read'
                              ? 'bg-green-100 text-green-800'
                              : action === 'write'
                                ? 'bg-blue-100 text-blue-800'
                                : action === 'delete'
                                  ? 'bg-red-100 text-red-800'
                                  : ''
                          }`}
                        >
                          {action}
                        </span>
                        <span className="text-sm text-gray-700">
                          {details.allowedEndpoints?.join(', ') || 'N/A'}
                        </span>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
