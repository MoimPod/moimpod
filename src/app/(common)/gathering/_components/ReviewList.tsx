import ListItem from "@/components/ListItem";
import { Review } from "@/app/(common)/gathering/types";

export default function ReviewList({ reviewList }: { reviewList: Review[] }) {
  return (
    <div>
      {reviewList.map((item) => (
        <ListItem key={item.id}>
          <ListItem.Score score={item.score} />
          <ListItem.Body>{item.comment}</ListItem.Body>
          <ListItem.MetaInfo primary={item.user.name} secondary={item.createdAt} />
        </ListItem>
      ))}
    </div>
  );
}
