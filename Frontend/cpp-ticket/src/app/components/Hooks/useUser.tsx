"use client";
import { useCallback, useEffect, useState } from "react";

export default function useUser() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchLoginStatus = useCallback(async () => {
    try {
      const res = await fetch("http://127.0.0.1:8765/api/login");
      const data = await res.json();
      setIsLoggedIn(Boolean(data.loggedIn));
    } catch (error) {
      console.error("Error fetching login status:", error);
    }
  }, []);

  useEffect(() => {
    fetchLoginStatus();
  }, [fetchLoginStatus]);

  useEffect(() => {
    const onLogin = () => fetchLoginStatus();
    const onLogout = () => fetchLoginStatus();

    window.addEventListener("login-success", onLogin);
    window.addEventListener("logout-success", onLogout);

    return () => {
      window.removeEventListener("login-success", onLogin);
      window.removeEventListener("logout-success", onLogout);
    };
  }, [fetchLoginStatus]);

  return { isLoggedIn };
}
