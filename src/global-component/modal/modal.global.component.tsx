import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b p-4">
          {title && (
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          )}
          <button
            onClick={onClose}
            className="rounded-md bg-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-300"
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">{children}</div>

        {/* Modal Footer */}
        {footer && <div className="border-t p-4">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
