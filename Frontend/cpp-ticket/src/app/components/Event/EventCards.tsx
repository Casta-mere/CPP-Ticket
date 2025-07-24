"use client";
import EventCard from "./EventCard";
import { useEvents } from "@/app/components";
import { Badge, CheckboxGroup, Flex } from "@radix-ui/themes";

import React, { useState } from "react";

const EventCards = () => {
  const { events } = useEvents();
  const [selectedStatus, setSelectedStatus] = useState<string[]>(["4"]);

  const filteredCount = events.filter((i) =>
    selectedStatus.includes(String(i.ticketStatus))
  ).length;

  return (
    <Flex gap="5" direction="column">
      <Flex align="center" gap="4">
        <CheckboxGroup.Root
          defaultValue={["4"]}
          name="status"
          onValueChange={setSelectedStatus}
        >
          <Flex gap="5">
            <CheckboxGroup.Item value="4">
              <Badge color="green">正在售票</Badge>
            </CheckboxGroup.Item>
            <CheckboxGroup.Item value="1">
              <Badge color="gray">暂未开票</Badge>
            </CheckboxGroup.Item>
            <CheckboxGroup.Item value="2">
              <Badge color="orange">即将开票</Badge>
            </CheckboxGroup.Item>
            <CheckboxGroup.Item value="3">
              <Badge color="red">售票结束</Badge>
            </CheckboxGroup.Item>
          </Flex>
        </CheckboxGroup.Root>
        <span className="text-sm text-gray-500">
          筛选出 {filteredCount} 个活动
        </span>
      </Flex>
      {events.map((i) => {
        if (selectedStatus.includes(String(i.ticketStatus)))
          return <EventCard event={i} key={i.id} />;
      })}
    </Flex>
  );
};

export default EventCards;
