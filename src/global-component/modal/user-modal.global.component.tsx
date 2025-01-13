import React from 'react';

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold text-gray-800">
            User Information
          </h2>
          <button
            onClick={onClose}
            className="rounded-md bg-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-300"
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 p-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name:
            </label>
            <input
              type="text"
              value={user.name}
              disabled
              className="w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-800 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email:
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-800 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              API Key:
            </label>
            <input
              type="text"
              value={user.apiKey}
              disabled
              className="w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-800 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              API Key Expiration:
            </label>
            <input
              type="text"
              value={new Date(user.apiKeyExpiresAt).toLocaleString()}
              disabled
              className="w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-800 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Roles:
            </label>
            <input
              type="text"
              value={user.roles.join(', ')}
              disabled
              className="w-full rounded-md border bg-gray-100 px-4 py-2 text-gray-800 focus:outline-none"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end border-t p-4">
          <button
            onClick={onClose}
            className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoModal;
