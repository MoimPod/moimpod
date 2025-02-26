"use client";

import CardList from "./_home/CardList";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="w-full">
      <Suspense>
        <CardList />
      </Suspense>
    </div>
  );
}
