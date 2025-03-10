"use client";

import Modal from "@/components/Modal";
import CommentInput from "@/app/(common)/mypage/_components/ReviewModal/CommentInput";
import { FormActions } from "@/app/(common)/mypage/_components/ReviewModal/FormActions";
import { useReviewForm } from "@/app/(common)/mypage/_hooks/useReviewForm";
import RatingInput from "@/app/(common)/mypage/_components/ReviewModal/RatingInput";
import Button from "@/components/Button";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  gatheringId: number;
}

export default function ReviewModal({ isOpen, onClose, gatheringId }: ReviewModalProps) {
  const {
    reviewForm: {
      control,
      handleSubmit,
      formState: { isValid, errors },
    },
    comment,
    mutation,
    onSubmit,
    handleClose,
    isModalOpen,
    handleErrorModalClose,
  } = useReviewForm({
    gatheringId,
    onClose,
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} className="mx-4 flex w-full max-w-[520px] flex-col gap-6 md:mx-0">
        <div className="text-lg font-semibold">리뷰 쓰기</div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <RatingInput control={control} />
          <CommentInput control={control} errors={errors} commentLength={comment.length} />
          <FormActions onCancel={handleClose} isSubmitDisabled={!isValid} isPending={mutation.isPending} />
        </form>
      </Modal>
      <Modal isOpen={isModalOpen} onClose={handleErrorModalClose}>
        <div className="w-full min-w-[252px]">
          <p className="py-12 text-center text-base font-medium text-gray-900">에러: {mutation.error?.message}</p>
          <div className="m-auto flex w-[120px]">
            <Button onClick={handleErrorModalClose} size="sm" className="w-full">
              확인
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
