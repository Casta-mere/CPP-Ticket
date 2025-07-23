"use client";
import { useCallback, useEffect, useState } from "react";

export default function uesEventsUpdateTime() {
  const [eventsUpdateTime, setEventsUpdateTime] = useState("");

  const fetchEventsUpdateTime = useCallback(async () => {
    try {
      const res = await fetch("http://127.0.0.1:8765/api/events/updatetime");
      const data = await res.json();
      setEventsUpdateTime(data.updatedAt);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }, []);

  useEffect(() => {
    fetchEventsUpdateTime();
  }, [fetchEventsUpdateTime]);

  useEffect(() => {
    const reloadEvent = () => fetchEventsUpdateTime();

    window.addEventListener("reload-event", reloadEvent);

    return () => {
      window.removeEventListener("reload-event", reloadEvent);
    };
  }, [fetchEventsUpdateTime]);

  return { eventsUpdateTime };
}
