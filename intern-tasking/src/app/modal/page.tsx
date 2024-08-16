import React, { FC } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onPrev,
  onNext,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-xl"
        >
          &times;
        </button>
        <div className="relative">
          {children}
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-3xl bg-white bg-opacity-75 p-2 rounded-full shadow-md"
            style={{ zIndex: 10 }}
          >
            &lt;
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black text-3xl bg-white bg-opacity-75 p-2 rounded-full shadow-md"
            style={{ zIndex: 10 }}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
