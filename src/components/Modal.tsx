import React from "react";

interface ModalProps {
  setShowModal: (show: boolean) => void;
  buttonText: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  setShowModal,
  buttonText,
  children,
}) => {
  return (
    <div
      className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      aria-modal="true"
    >
      <div className="modal__content font-crt border bg-primary flex flex-col items-center justify-center p-6 rounded-lg shadow-lg w-7/12 animate-fadeIn">
        {children}
        <button
          onClick={() => setShowModal(false)}
          className="modal__button mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Modal;
