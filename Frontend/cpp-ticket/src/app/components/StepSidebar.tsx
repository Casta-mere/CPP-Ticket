"use client";
import { Draggable, useSelectedBuyer, useUser } from "@/app/components";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";
import { FaRegCircle, FaRegCircleCheck } from "react-icons/fa6";
import {
  PiNumberSquareFourFill,
  PiNumberSquareOneFill,
  PiNumberSquareThreeFill,
  PiNumberSquareTwoFill,
} from "react-icons/pi";

export default function StepSidebar() {
  const { isLoggedIn } = useUser();
  const { isSelected } = useSelectedBuyer();
  const [ticket, setTicket] = useState(false);

  const StepStatus = ({ status }: { status: boolean }) => {
    return (
      <Text size="4">
        {status ? (
          <FaRegCircleCheck className="text-xl text-green-400 font-bold" />
        ) : (
          <FaRegCircle className="text-xl text-red-400 font-bold" />
        )}
      </Text>
    );
  };

  const Step1 = () => {
    return (
      <Flex justify="between" className="items-center">
        <Text size="4">
          <span className="flex items-center gap-1">
            <PiNumberSquareOneFill className="text-blue-400 text-2xl" />
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
            )}
            CPP 账号
          </span>
        </Text>

        <StepStatus status={isLoggedIn} />
      </Flex>
    );
  };

  const Step2 = () => {
    return (
      <Flex justify="between" className="items-center">
        <Text size="4">
          <span className="flex items-center gap-1">
            <PiNumberSquareTwoFill className="text-blue-400 text-2xl" />
            选择购票人
          </span>
        </Text>
        <StepStatus status={isSelected} />
      </Flex>
    );
  };

  const Step3 = () => {
    return (
      <Flex justify="between" className="items-center">
        <Text size="4">
          <span className="flex items-center gap-1">
            <PiNumberSquareThreeFill className="text-blue-400 text-2xl" />
            选择活动
          </span>
        </Text>
        <StepStatus status={ticket} />
      </Flex>
    );
  };

  const Step4 = () => {
    return (
      <Flex justify="between" className="items-center">
        <Text size="4">
          <span className="flex items-center gap-1">
            <PiNumberSquareFourFill className="text-blue-400 text-2xl" />{" "}
            选择票种
          </span>
        </Text>
        <StepStatus status={ticket} />
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
            <Step4 />
          </Flex>
        </Card>
      </Box>
    </Draggable>
  );
}
