import React, { useState } from 'react';

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>('Tasks'); // Tracks expanded section

  const menuItems = [
    {
      category: 'Tasks',
      items: [
        { name: 'Get multiple tasks', method: 'GET' },
        { name: 'Create a task', method: 'POST' },
        { name: 'Get a task', method: 'GET', active: true },
        { name: 'Update a task', method: 'PUT' },
        { name: 'Delete a task', method: 'DELETE' },
        { name: 'Duplicate a task', method: 'POST' },
        { name: 'Get tasks from a project', method: 'GET' },
        { name: 'Get tasks from a section', method: 'GET' },
        { name: 'Get tasks from a tag', method: 'GET' },
      ],
    },
    {
      category: 'Team memberships',
      items: [],
    },
    {
      category: 'Teams',
      items: [],
    },
    {
      category: 'Time periods',
      items: [],
    },
    {
      category: 'Typeahead',
      items: [],
    },
  ];

  const toggleSection = (section: string) => {
    setExpanded(expanded === section ? null : section);
  };

  return (
    <div className="h-screen w-[30rem] border-r border-gray-300 bg-gray-100 p-4">
      {menuItems.map((menu, index) => (
        <div key={index} className="mb-4">
          {/* Category Header */}
          <button
            onClick={() => toggleSection(menu.category)}
            className="flex w-full items-center justify-between py-2 text-left font-semibold text-gray-800"
          >
            {menu.category}
            <span className="text-gray-600">
              {expanded === menu.category ? '-' : '+'}
            </span>
          </button>

          {/* Nested Items */}
          {expanded === menu.category && menu.items.length > 0 && (
            <ul className="ml-4 space-y-2">
              {menu.items.map((item, subIndex) => (
                <li
                  key={subIndex}
                  className={`flex items-center space-x-2 rounded-md p-2 ${
                    item.active ? 'bg-purple-100' : ''
                  }`}
                >
                  <span
                    className={`rounded px-2 py-1 text-xs font-semibold ${
                      item.method === 'GET'
                        ? 'bg-green-100 text-green-800'
                        : item.method === 'POST'
                          ? 'bg-blue-100 text-blue-800'
                          : item.method === 'PUT'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.method}
                  </span>
                  <span className="text-sm text-gray-700">{item.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
