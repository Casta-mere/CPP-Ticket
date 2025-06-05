"use client";
import { useCallback, useEffect, useState } from "react";

export default function useSelectedBuyer() {
  const [dbSelected, setDbSelected] = useState<string[]>([]);
  const [isSelected, setIsSelected] = useState(false);

  const getSelectedBuyer = useCallback(async () => {
    try {
      const res = await fetch("http://127.0.0.1:8765/api/selectBuyer");
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const ids = data.map((item: any[]) => item[0].toString());
        setDbSelected(ids);
        setIsSelected(true);
      } else {
        setIsSelected(false);
      }
    } catch (error) {
      console.error("Error fetching Selected buyer info:", error);
    }
  }, []);

  useEffect(() => {
    getSelectedBuyer();
  }, [getSelectedBuyer]);

  useEffect(() => {
    const onSelect = () => getSelectedBuyer();

    window.addEventListener("select-success", onSelect);

    return () => {
      window.removeEventListener("select-success", onSelect);
    };
  }, [getSelectedBuyer]);

  return { isSelected, dbSelected };
}
