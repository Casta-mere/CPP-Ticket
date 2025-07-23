"use client";

import { EventCards, EventUpdater } from "@/app/components";
import { Flex } from "@radix-ui/themes";

export default function Page() {
  return (
    <Flex direction="column" gap="5">
      <EventUpdater />
      <EventCards />
    </Flex>
  );
}
