"use client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function StepSidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [buyer, setBuyer] = useState(false);
  const [ticket, setTicket] = useState(false);

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

  const Step1 = () => {
    return (
      <Flex justify="between">
        <Text size="4">
          1️⃣{" "}
          {isLoggedIn ? (
            "登录"
          ) : (
            <Link
              onClick={() => {
                window.dispatchEvent(new Event("open-dialog"));
              }}
              href=""
              className="text-purple-500 hover:text-purple-700 underline cursor-pointer"
            >
              登录
            </Link>
          )}{" "}
          CPP 账号
        </Text>

        <Text size="4">{isLoggedIn ? "✔" : "✖"}</Text>
      </Flex>
    );
  };

  const Step2 = () => {
    return (
      <Flex justify="between">
        <Text size="4">2️⃣ 选择购票人</Text>
        <Text size="4">{buyer ? "✔" : "✖"}</Text>
      </Flex>
    );
  };

  const Step3 = () => {
    return (
      <Flex justify="between">
        <Text size="4">3️⃣ 选择票种</Text>
        <Text size="4">{ticket ? "✔" : "✖"}</Text>
      </Flex>
    );
  };

  return (
    <div className="fixed top-24 left-5 w-72 z-50">
      <Box maxWidth="300px" p="4">
        <Card size="2" className="shadow-xl">
          <Heading>抢票流程</Heading>
          <Flex direction="column" mt="3">
            <Step1 />
            <Step2 />
            <Step3 />
          </Flex>
        </Card>
      </Box>
    </div>
  );
}
