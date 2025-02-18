"use client";

import Button from "@/components/Button";
import { copyClipboard } from "@/utils/copyClipboard";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="sticky bottom-0 flex w-full border-t-2 bg-white px-4 py-5">{children}</div>;
}

export default function FloatingBar() {
  const isHost = true;

  if (isHost)
    return (
      <Container>
        <Button styleType="outline" size="sm" className="md:w-[115px]">
          취소하기
        </Button>
        <Button styleType="solid" size="sm" className="md:w-[115px]" onClick={copyClipboard}>
          공유하기
        </Button>
      </Container>
    );

  return (
    <Container>
      <Button styleType="solid" size="sm" className="md:w-[115px]">
        참여하기
      </Button>
    </Container>
  );
}
