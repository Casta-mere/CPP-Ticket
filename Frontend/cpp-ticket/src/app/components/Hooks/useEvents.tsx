"use client";
import { useCallback, useEffect, useState } from "react";
import { Event } from "@/app/types";

export default function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch("http://127.0.0.1:8765/api/events");
      const data = await res.json();
      setEvents(data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    const reloadEvent = () => fetchEvents();

    window.addEventListener("reload-event", reloadEvent);

    return () => {
      window.removeEventListener("reload-event", reloadEvent);
    };
  }, [fetchEvents]);

  return { events };
}
