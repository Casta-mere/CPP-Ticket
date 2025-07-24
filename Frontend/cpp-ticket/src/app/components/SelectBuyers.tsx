"use client";
import { useSelectedBuyer, useUser, useEqual } from "@/app/components";
import {
  Box,
  Button,
  Card,
  CheckboxGroup,
  Flex,
  Heading,
  Link,
  Strong,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";

type BuyerInfo = {
  id: number;
  realname: string;
  idcard: string;
  mobile: string;
  validType: number;
};

const SelectBuyers = () => {
  const { isLoggedIn } = useUser();
  const { dbSelected } = useSelectedBuyer();
  const [buyerInfo, setBuyerInfo] = useState<[BuyerInfo] | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [confirming, setConfirming] = useState(false);
  const [manualRefresh, setManualRefresh] = useState(false);
  const maxSelections = 2;

  const getBuyer = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8765/api/buyer");
      const data = await res.json();
      if (data.length > 0) {
        setBuyerInfo(data);
      }
    } catch (error) {
      console.error("Error fetching buyer info:", error);
    }
  };

  const getSelectedBuyer = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8765/api/selectBuyer");
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const ids = data.map((item: any[]) => item[0].toString());
        setSelected(ids);
      }
    } catch (error) {
      console.error("Error fetching Selected buyer info:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getBuyer();
      getSelectedBuyer();
      setManualRefresh(false);
    }
  }, [isLoggedIn, manualRefresh]);

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      const res = await fetch("http://127.0.0.1:8765/api/selectBuyer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selected }),
      });
      const data = await res.json();
      if (data.success) {
        window.dispatchEvent(new Event("select-success"));
      }
    } catch (error) {
      console.error("选择请求失败", error);
    } finally {
      setConfirming(false);
    }
  };

  const Buyers = () => {
    return (
      <Box>
        {buyerInfo && (
          <Card>
            <Flex direction="column" gap="3" className="items-start">
              <Heading>选择你的英雄</Heading>
              <CheckboxGroup.Root
                name="Buyers"
                size="3"
                value={selected}
                onValueChange={(newSelected) => {
                  setSelected(newSelected);
                }}
              >
                <Flex gap="3">
                  {buyerInfo.map((i) => {
                    const isSelected = selected.includes(String(i.id));
                    const disableOthers =
                      selected.length >= maxSelections && !isSelected;

                    return (
                      <Card key={i.id}>
                        <CheckboxGroup.Item
                          value={String(i.id)}
                          disabled={disableOthers}
                        >
                          {i.realname}
                        </CheckboxGroup.Item>
                      </Card>
                    );
                  })}
                </Flex>
              </CheckboxGroup.Root>
              <Button
                onClick={handleConfirm}
                disabled={useEqual(dbSelected, selected) || confirming}
                className="w-auto"
              >
                确认
              </Button>
            </Flex>
          </Card>
        )}
        {!buyerInfo && (
          <div>
            你似乎还没有添加任何购票人，点击
            <Link
              href="https://cp.allcpp.cn/ticket/prePurchaser"
              target="_blank"
            >
              <Strong>这里</Strong>
            </Link>
            添加购票人。添加后请点击
            <Link
              href=""
              onClick={() => {
                setManualRefresh(true);
              }}
            >
              <Strong>这里</Strong>
            </Link>
            刷新
          </div>
        )}
      </Box>
    );
  };

  return (
    <>
      <Buyers />
    </>
  );
};

export default SelectBuyers;
