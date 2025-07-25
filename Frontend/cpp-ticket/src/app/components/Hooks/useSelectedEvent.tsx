"use client";
import { useCallback, useEffect, useState } from "react";

export default function useSelectedEvent() {
  const [selectedEvent, setSelectedEvent] = useState<string[]>([]);
  const [isEventSelected, setIsEventSelected] = useState(false);

  const fetchSelectedEvent = useCallback(async () => {
    try {
      const res = await fetch("http://127.0.0.1:8765/api/events/select");
      const data = await res.json();
      if (data.event_id) {
        setSelectedEvent([data.event_id]);
        setIsEventSelected(true);
      }
    } catch (error) {
      console.error("Error fetching selectedEvent: ", error);
    }
  }, []);

  useEffect(() => {
    fetchSelectedEvent();
  }, [fetchSelectedEvent]);

  useEffect(() => {
    const onEventSelectChange = () => fetchSelectedEvent();

    window.addEventListener("event-select-change", onEventSelectChange);

    return () => {
      window.removeEventListener("event-select-change", onEventSelectChange);
    };
  }, [fetchSelectedEvent]);

  return { selectedEvent, isEventSelected };
}
