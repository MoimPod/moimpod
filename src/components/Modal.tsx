"use client";

import { useEffect } from "react";
import Close from "@/images/close.svg";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  closeOnBackdropClick?: boolean;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children, closeOnBackdropClick = false }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        if (e.target === e.currentTarget && closeOnBackdropClick) {
          onClose();
        }
      }}
    >
      <div className="relative rounded-lg bg-white p-[24px] shadow-lg">
        <button className="absolute right-[24px] top-[24px] cursor-pointer" onClick={onClose}>
          <Close />
        </button>
        {children}
      </div>
    </div>
  );
}
