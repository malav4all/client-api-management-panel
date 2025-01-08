import React from 'react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { name: 'Get multiple tasks', method: 'GET' },
    { name: 'Create a task', method: 'POST' },
    { name: 'Get a task', method: 'GET', active: true },
    { name: 'Update a task', method: 'PUT' },
    { name: 'Delete a task', method: 'DELETE' },
  ];

  return (
    <div className="w-1/4 border-r border-gray-300 bg-gray-100 p-4">
      <h2 className="mb-4 text-lg font-semibold">Tasks</h2>
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`flex items-center space-x-2 rounded-lg p-2 ${item.active ? 'bg-purple-100' : ''}`}
          >
            <span
              className={`text-xs font-semibold ${item.method === 'GET' ? 'text-green-500' : item.method === 'POST' ? 'text-blue-500' : item.method === 'PUT' ? 'text-orange-500' : 'text-red-500'}`}
            >
              {item.method}
            </span>
            <span className="text-sm">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
