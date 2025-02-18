import ListItem from "@/components/ListItem";
import { Review } from "@/app/(common)/gathering/types";
import DashedLine from "@/components/DashedLine";
import Score from "@/components/Score";

export default function ReviewList({ reviewList }: { reviewList: Review[] }) {
  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-semibold">이용자들은 이 프로그램을 이렇게 느꼈어요!</h1>
      <div className="flex flex-col gap-4">
        {reviewList.map((item) => (
          <div key={item.id}>
            <ListItem>
              <div className="mb-2 flex flex-col gap-3">
                <Score score={item.score} />
                <ListItem.Body>{item.comment}</ListItem.Body>
              </div>
              <ListItem.MetaInfo primary={item.user.name} secondary={item.createdAt} />
            </ListItem>
            <DashedLine />
          </div>
        ))}
      </div>
    </div>
  );
}
