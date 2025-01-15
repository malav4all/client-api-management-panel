import React, { useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { FiMenu } from 'react-icons/fi';

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

  // State to control showing/hiding the sidebar on mobile
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (module: string) => {
    setExpandedModule((prev) => (prev === module ? null : module));
  };

  return (
    <div className="relative flex">
      {/* Toggle button visible on small screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-700 hover:text-gray-900 md:hidden"
      >
        <FiMenu size={24} />
      </button>

      {/* Overlay (dark background) when the sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed left-0 top-0 z-20 h-screen w-screen bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <div
        className={`fixed left-0 top-0 z-30 flex h-screen w-64 flex-col border-r bg-gray-100 p-4 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Permissions
        </h2>
        <ul className="space-y-4 overflow-auto">
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
    </div>
  );
};

export default Sidebar;
