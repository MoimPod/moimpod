"use client";

import { useForm, Controller } from "react-hook-form";
import Heart from "@/images/heart.svg";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import usePostReviews from "@/app/(common)/mypage/_hooks/usePostReviews";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  gatheringId: number;
}

type ReviewFormValues = {
  score: number;
  comment: string;
};

export default function ReviewModal({ isOpen, onClose, gatheringId }: ReviewModalProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
    watch,
  } = useForm<ReviewFormValues>({
    mode: "onChange",
    defaultValues: {
      score: 0,
      comment: "",
    },
  });
  const comment = watch("comment");
  const mutation = usePostReviews();
  const onSubmit = (data: ReviewFormValues) => {
    // gatheringId와 data를 이용해 API 요청
    mutation.mutate({ ...data, gatheringId });
    onClose();
  };

  const handleClickClose = () => {
    setValue("score", 0);
    setValue("comment", "");
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={handleClickClose} className="mx-4 flex w-full max-w-[520px] flex-col gap-6 md:mx-0">
      <div className="text-lg font-semibold">리뷰 쓰기</div>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        {/* 평점 입력 영역 */}
        <div className="flex flex-col gap-3">
          <label className="font-semibold">만족스러운 경험이었나요?</label>
          <Controller
            name="score"
            control={control}
            rules={{ validate: (value) => value > 0 || "평점은 0점 이상이어야 합니다." }}
            render={({ field }) => (
              <div className="flex">
                {[1, 2, 3, 4, 5].map((score) => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => field.onChange(score)}
                    className={`text-2xl ${field.value >= score ? "animate-heart-scale-up fill-blue-6" : "fill-gray-200"}`}
                  >
                    <Heart />
                  </button>
                ))}
              </div>
            )}
          />
        </div>
        {/* 리뷰 텍스트 입력 영역 */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <label className="font-semibold">경험에 대해 남겨주세요.</label>
            <span className="text-gray-300">{comment.length}/250</span>
          </div>
          <Controller
            name="comment"
            control={control}
            rules={{
              required: "리뷰를 작성해주세요",
              maxLength: { value: 250, message: "리뷰는 250자 이하로 작성해주세요" },
              validate: (value) => value.trim() === value || "앞뒤 공백을 지워주세요",
            }}
            render={({ field }) => (
              <textarea
                {...field}
                maxLength={250}
                className="h-[120px] resize-none border-none bg-gray-50 px-4 pt-2.5 placeholder:text-gray-400"
                placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다."
              />
            )}
          />
          {errors.comment && <p className="mt-1 text-sm font-semibold text-red-600">{errors.comment.message}</p>}
        </div>
        <div className="flex gap-4">
          <Button className="w-full" styleType={"outline"} onClick={handleClickClose}>
            취소
          </Button>
          <Button className="w-full" type="submit" disabled={!isValid}>
            리뷰 등록
          </Button>
        </div>
      </form>
    </Modal>
  );
}
