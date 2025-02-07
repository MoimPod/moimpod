"use client";

import { useEffect } from "react";
import Close from "@/images/close.svg";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative rounded-lg bg-white p-[24px] shadow-lg">
        <button className="absolute right-[24px] top-[24px]" onClick={onClose}>
          <Close />
        </button>
        {children}
      </div>
    </div>
  );
}
