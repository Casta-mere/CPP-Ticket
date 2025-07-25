"use client";
import {
  useUser,
  SelectBuyers,
  useSelectedBuyer,
  useSelectedEvent,
  useEvents,
  EventCard,
} from "@/app/components";
import { Button, Callout, Flex, Link, Strong, Text } from "@radix-ui/themes";
import { GoInfo } from "react-icons/go";

export default function Home() {
  const { isLoggedIn } = useUser();
  const { isSelected } = useSelectedBuyer();
  const { selectedEvent, isEventSelected } = useSelectedEvent();
  const { events } = useEvents();

  const Tips = () => (
    <Callout.Root variant="soft" color="blue">
      <Callout.Icon>
        <GoInfo />
      </Callout.Icon>
      <Callout.Text>
        请提前添加好购票人，可以点击
        <Link href="https://cp.allcpp.cn/ticket/prePurchaser" target="_blank">
          <Strong>这里</Strong>
        </Link>
        添加
      </Callout.Text>
    </Callout.Root>
  );

  const handleCancelSelection = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8765/api/events/select", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event_id: "" }),
      });
      const data = await res.json();
      if (data.success) {
        window.dispatchEvent(new Event("event-select-change"));
        window.location.reload();
      }
    } catch (error) {
      console.error("Error selecting event: ", error);
    }
  };

  return (
    <Flex gap="5" direction="column">
      {!isSelected && <Tips />}
      {isLoggedIn && <SelectBuyers />}
      {!isEventSelected && (
        <Flex direction="column" gap="2">
          <Text size="4">接下来选择要抢票的活动</Text>
          <Text size="4">
            方式1: 点击
            <Link
              className={
                "text-zinc-900 font-bold hover:text-zinc-800 transaition-colors"
              }
              href={"/events"}
            >
              这里
            </Link>
            跳转并选择活动
          </Text>
        </Flex>
      )}
      {isEventSelected && (
        <Flex justify="between">
          <Text size="4">当前选择的活动 ID: {selectedEvent}</Text>
          <Button onClick={handleCancelSelection}>取消选择</Button>
        </Flex>
      )}
      {isEventSelected &&
        (() => {
          const event = events.find(
            (e) => String(e.id) === String(selectedEvent)
          );
          return event ? (
            <EventCard event={event} disableSelect={true} />
          ) : null;
        })()}
    </Flex>
  );
}
