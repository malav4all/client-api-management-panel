import React, { useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

interface Permission {
  allowed: boolean;
  limit?: number;
  allowedEndpoints?: { allowed: boolean; name: string }[];
}

interface PermissionMatrix {
  [key: string]: {
    [action: string]: Permission;
  };
}

interface SidebarProps {
  permissionMatrix: PermissionMatrix;
  setSelectedEndpoint: (endpoint: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  permissionMatrix,
  setSelectedEndpoint,
}) => {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const handleToggle = (module: string) => {
    setExpandedModule((prev) => (prev === module ? null : module));
  };

  return (
    <div className="h-screen w-64 border-r bg-gray-100 p-4">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">Permissions</h2>
      <ul className="space-y-4">
        {Object.entries(permissionMatrix).map(([module, actions]) => (
          <li key={module}>
            {/* Module Title with Icon */}
            <div
              onClick={() => handleToggle(module)}
              className="text-md flex cursor-pointer items-center justify-between font-semibold capitalize text-gray-700 hover:underline"
            >
              <span>{module}</span>
              {expandedModule === module ? (
                <FiChevronDown className="text-gray-500" />
              ) : (
                <FiChevronRight className="text-gray-500" />
              )}
            </div>

            {/* Smooth Expand/Collapse */}
            <div
              className={`transition-all duration-300 ${
                expandedModule === module
                  ? 'max-h-screen'
                  : 'max-h-0 overflow-hidden'
              }`}
            >
              <ul className="ml-4 mt-2 space-y-2">
                {/* Iterating over module actions */}
                {Object.entries(actions).map(([action, details]) => {
                  if (details.allowed) {
                    return (
                      <li key={action}>
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
                        <ul className="ml-4 mt-2 space-y-2">
                          {/* Rendering endpoints for each action */}
                          {details.allowedEndpoints
                            ?.filter((endpoint) => endpoint.allowed)
                            .map((endpoint, index) => (
                              <li key={index}>
                                <button
                                  onClick={() =>
                                    setSelectedEndpoint({
                                      ...endpoint,
                                      accessType: action,
                                    })
                                  }
                                  className="text-sm text-gray-700 hover:underline"
                                >
                                  {endpoint.name}
                                </button>
                              </li>
                            ))}
                        </ul>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
