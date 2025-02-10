import Card from "@/components/Card";

export default function test() {
  return (
    <div>
      <div>hello world</div>
      <Card
        name="달빛 오피스 스트레칭"
        dateTime="2025-02-06T17:30:00"
        registrationEnd="2025-02-06T17:30:00"
        location="서울 강남구"
        participantCount={16}
        capacity={20}
      />
    </div>
  );
}
