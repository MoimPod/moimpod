"use client";

import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Input from "@/components/Input";
import LocationSelect from "@/app/_home/_components/LocationSelect";

type CreateGatheringsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateGatheringsModal({ isOpen, onClose }: CreateGatheringsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="mx-4 flex w-full max-w-[520px] flex-col gap-6 md:mx-0">
      <div></div>
      <Input placeholder="모임 이름을 작성해주세요." />
      <Input placeholder="장소를 선택해주세요." />
      <Input placeholder="이미지를 첨부해주세요." />
      <Input placeholder="최소 3인 이상 입력해주세요." />
    </Modal>
  );
}
