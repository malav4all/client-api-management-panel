import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearAuthData } from '../store/slices/authSlice';
import Modal from '../global-component/modal/modal.global.component';
import { patchRequest } from '../core-services/rest-api/apiHelpers';
import { store } from '../store';
import { toast } from 'react-toastify';
import UserInfoModal from '../global-component/modal/user-modal.global.component';

// Import an icon for the hamburger toggle (any icon you prefer)
import { FiMenu } from 'react-icons/fi';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false); // Mobile nav toggle state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state: any) => state.auth.user?.name || 'User');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setOldPassword('');
    setNewPassword('');
  };

  const changePasswordRequest = async () => {
    try {
      const response = await patchRequest(
        `clientChangePassword/${store.getState().auth.user?._id}`,
        {
          oldPassword,
          newPassword,
        }
      );
      await handleCloseModal();
      setIsDropdownOpen(false);
      toast.success(`${response?.message}`, {
        position: 'bottom-right',
        autoClose: 3000, // Closes automatically after 3 seconds
      });
      return response;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to update password'
      );
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Clear Redux store
    dispatch(clearAuthData());

    // Redirect to login page
    navigate('/');
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 py-3 md:flex-nowrap md:px-6">
        {/* Left Section: Logo and Hamburger (mobile) */}
        <div className="flex w-full items-center justify-between md:w-auto">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="https://www.canterburypilgrimages.com/wp-content/uploads/2021/04/dummy-logo-5b.png"
              alt="Company Logo"
              className="h-12 w-auto"
            />
            <span className="text-base font-semibold text-gray-800 md:text-sm">
              developers
            </span>
          </div>

          {/* Hamburger toggle (visible on mobile screens) */}
          <button
            type="button"
            className="ml-2 inline-flex items-center rounded-md p-2 text-gray-600 hover:text-gray-800 focus:outline-none md:hidden"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <FiMenu className="h-6 w-6" />
          </button>
        </div>

        {/* Full Navigation (hidden on mobile unless toggled) */}
        <div
          className={`${
            isNavOpen ? 'block' : 'hidden'
          } mt-4 w-full flex-grow md:mt-0 md:flex md:w-auto md:flex-grow-0 md:items-center md:justify-end`}
        >
          <div className="flex flex-col items-start space-y-4 md:flex-row md:items-center md:space-x-6 md:space-y-0">
            {/* Navigation Links (Left) */}
            <nav className="flex flex-col items-start space-y-3 md:flex-row md:items-center md:space-x-4 md:space-y-0">
              <a
                href="/guides"
                className="text-sm text-gray-600 transition hover:text-gray-800"
              >
                Guides
              </a>
              <a
                href="/recipes"
                className="text-sm text-gray-600 transition hover:text-gray-800"
              >
                Recipes
              </a>
              <a
                href="/api-reference"
                className="text-sm text-gray-600 transition hover:text-gray-800"
              >
                <span className="rounded-md bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-800">
                  API Reference
                </span>
              </a>
            </nav>

            {/* Additional Links (Left) */}
            <nav className="flex flex-col items-start space-y-3 md:flex-row md:items-center md:space-x-4 md:space-y-0">
              <a
                href="/app-directory"
                className="text-sm text-gray-600 transition hover:text-gray-800"
              >
                App directory
              </a>
              <a
                href="/docs"
                className="text-sm text-gray-600 transition hover:text-gray-800"
              >
                Docs
              </a>
              <a
                href="/forum"
                className="text-sm text-gray-600 transition hover:text-gray-800"
              >
                Forum
              </a>
              <a
                href="/my-apps"
                className="text-sm text-gray-600 transition hover:text-gray-800"
              >
                My apps
              </a>
            </nav>

            {/* Search (center on mobile, next to nav on larger screens) */}
            <div className="relative flex w-full items-center md:w-auto">
              <input
                type="text"
                placeholder="Search"
                aria-label="Search"
                className="w-full rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-300 md:w-48"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400"
                aria-hidden="true"
              >
                ⌘K
              </span>
            </div>

            {/* Profile Icon with Dropdown */}
            <div className="relative flex items-center">
              <button
                onClick={toggleDropdown}
                className="mt-2 flex items-center space-x-2 focus:outline-none md:mt-0"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Profile"
                  className="h-8 w-8 rounded-full border border-gray-300"
                />
                <span className="text-sm font-medium text-gray-800">
                  {userName}
                </span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-12 z-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                  <button
                    onClick={() => {
                      setIsUserModalOpen(true);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleOpenModal}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Change Password
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* User Info Modal */}
      <UserInfoModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        user={store.getState().auth.user ?? {}}
      />

      {/* Change Password Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Change Password"
        footer={
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCloseModal}
              className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={changePasswordRequest}
              className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
            >
              Change Password
            </button>
          </div>
        }
      >
        <div>
          <div className="mb-4">
            <label
              htmlFor="oldPassword"
              className="block text-sm text-gray-600"
            >
              Current Password
            </label>
            <input
              id="oldPassword"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm text-gray-600"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
