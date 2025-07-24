"use client";
import { useUser, SelectBuyers, useSelectedBuyer } from "@/app/components";
import { Callout, Flex, Link, Strong } from "@radix-ui/themes";
import { GoInfo } from "react-icons/go";

export default function Home() {
  const { isLoggedIn } = useUser();
  const { isSelected } = useSelectedBuyer();

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

  return (
    <Flex gap="3" direction="column">
      {!isSelected && <Tips />}
      {isLoggedIn && <SelectBuyers />}
    </Flex>
  );
}
