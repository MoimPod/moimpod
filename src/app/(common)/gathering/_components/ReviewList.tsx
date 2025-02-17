import ListItem from "@/components/ListItem";

type ReviewListProps = {
  score: number;
  content: string;
  nickname: string;
  createdAt: string;
};

export default function ReviewList({ score, content, nickname, createdAt }: ReviewListProps) {
  return (
    <ListItem>
      <ListItem.Score score={score} />
      <ListItem.Body>{content}</ListItem.Body>
      <ListItem.MetaInfo primary={nickname} secondary={createdAt} />
    </ListItem>
  );
}
