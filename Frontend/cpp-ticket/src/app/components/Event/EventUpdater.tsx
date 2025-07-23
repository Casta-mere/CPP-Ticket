import { uesEventsUpdateTime, useEvents } from "@/app/components";
import { Button, Flex } from "@radix-ui/themes";

const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return date.toLocaleString("zh-CN", options);
};

const EventUpdater = () => {
  const { eventsUpdateTime } = uesEventsUpdateTime();
  const { events } = useEvents();
  const handleUpdate = async () => {
    try {
      fetch("http://127.0.0.1:8765/api/events/update", {
        method: "POST",
      });
      // refresh website
      window.dispatchEvent(new Event("reload-event"));
    } catch (error) {
      console.error("Error updating events:", error);
    }
  };
  return (
    <div className="bg-blue-50 rounded-lg p-4 w-full">
      <Flex className="items-center w-full" justify="between" gap="9">
        <Flex className="flex-1" style={{ minWidth: 0 }}>
          当前有 {events.length} 个活动，数据最后更新于{" "}
          {formatTime(eventsUpdateTime)}
        </Flex>
        <Button color="green" onClick={handleUpdate}>
          更新数据
        </Button>
      </Flex>
    </div>
  );
};

export default EventUpdater;
