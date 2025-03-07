import usePostReviews from "@/app/(common)/mypage/_hooks/usePostReviews";
import { useForm } from "react-hook-form";

export type ReviewFormValues = {
  score: number;
  comment: string;
};

export type UseReviewFormProps = {
  gatheringId: number; // 또는 string
  onClose: () => void;
};

export const useReviewForm = ({ gatheringId, onClose }: UseReviewFormProps) => {
  const reviewForm = useForm<ReviewFormValues>({
    mode: "onBlur",
    defaultValues: {
      score: 0,
      comment: "",
    },
  });

  const comment = reviewForm.watch("comment");
  const mutation = usePostReviews();

  const onSubmit = (data: ReviewFormValues) => {
    mutation.mutate(
      { ...data, gatheringId },
      {
        onSuccess: () => {
          onClose();
        },
        onError: () => {},
      },
    );
  };

  const handleClose = () => {
    reviewForm.reset();
    onClose();
  };

  return {
    reviewForm,
    mutation,
    comment,
    onSubmit,
    handleClose,
  };
};
