"use client";

import React from "react";
import DateTimePicker from "@/components/Filtering/DateTimePicker";

type MeetingFormProps = {
  meetingDateTime: Date | null;
  setMeetingDateTime: (dateTime: Date | null) => void;
  deadlineDateTime: Date | null;
  setDeadlineDateTime: (dateTime: Date | null) => void;
};

export default function MeetingForm({
  meetingDateTime,
  setMeetingDateTime,
  deadlineDateTime,
  setDeadlineDateTime,
}: MeetingFormProps) {
  //   const [meetingDateTime, setMeetingDateTime] = useState<Date | null>(null);
  //   const [deadlineDateTime, setDeadlineDateTime] = useState<Date | null>(null);

  return (
    <div className="flex flex-col gap-3 md:flex-row">
      {/* 모임 날짜 & 시간 */}
      <div>
        <h2 className="mb-1 text-base font-semibold">모임 날짜</h2>
        <DateTimePicker selectedDateTime={meetingDateTime} onDateTimeChange={setMeetingDateTime} />
      </div>

      {/* 모집 마감 날짜 & 시간 */}
      <div>
        <h2 className="mb-1 text-base font-semibold">모집 마감 날짜</h2>
        <DateTimePicker selectedDateTime={deadlineDateTime} onDateTimeChange={setDeadlineDateTime} />
      </div>
    </div>
  );
}
