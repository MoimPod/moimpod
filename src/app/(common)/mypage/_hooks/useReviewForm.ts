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
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    reset,
  } = useForm<ReviewFormValues>({
    mode: "onBlur",
    defaultValues: {
      score: 0,
      comment: "",
    },
  });

  const comment = watch("comment");
  const mutation = usePostReviews();

  const onSubmit = (data: ReviewFormValues) => {
    mutation.mutate({ ...data, gatheringId });
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return {
    control,
    handleSubmit,
    isValid,
    errors,
    comment,
    onSubmit,
    handleClose,
  };
};
