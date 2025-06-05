"use client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";
import { useSelectedBuyer, useUser, Draggable } from "@/app/components";

export default function StepSidebar() {
  const { isLoggedIn } = useUser();
  const { isSelected } = useSelectedBuyer();
  const [ticket, setTicket] = useState(false);

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
        <Text size="4">{isSelected ? "✔" : "✖"}</Text>
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
    <Draggable
      initialX={50}
      initialY={100}
      className="w-72 cursor-grab active:cursor-grabbing"
    >
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
    </Draggable>
  );
}
