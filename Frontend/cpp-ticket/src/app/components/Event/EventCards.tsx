import EventCard from "./EventCard";
import { useEvents } from "@/app/components";
import { Flex } from "@radix-ui/themes";

import React from "react";

const EventCards = () => {
  const { events } = useEvents();
  return (
    <Flex gap="4" direction="column">
      {events.map((i) => {
        return <EventCard event={i} key={i.id} />;
      })}
    </Flex>
  );
};

export default EventCards;
