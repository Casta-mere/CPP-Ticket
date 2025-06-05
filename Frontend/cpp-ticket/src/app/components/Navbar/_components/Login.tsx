"use client";
import {
  Button,
  Dialog,
  Flex,
  Text,
  TextField,
  Box,
  DropdownMenu,
  Avatar,
} from "@radix-ui/themes";

import React, { useEffect, useState } from "react";

type UserInfo = {
  faceUrl: string;
  nickname: string;
};

export const LoginComponent = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8765/api/login");
        const data = await res.json();
        setIsLoggedIn(Boolean(data.loggedIn));
        if (data.loggedIn) {
          const res = await fetch("http://127.0.0.1:8765/api/user");
          const data = await res.json();
          setUserInfo(data);
        }
      } catch (error) {
        console.error("Error fetching login status:", error);
      }
    };

    fetchLoginStatus();
  }, []);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener("open-dialog", handleOpen);
    window.addEventListener("close-dialog", handleClose);

    return () => {
      window.removeEventListener("open-dialog", handleOpen);
      window.removeEventListener("close-dialog", handleClose);
    };
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("http://127.0.0.1:8765/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ account, password }),
      });

      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true);
        const res = await fetch("http://127.0.0.1:8765/api/user");
        const data = await res.json();
        setUserInfo(data);
        window.dispatchEvent(new Event("login-success"));
      } else {
        setErrorMsg(data.errormsg);
      }
    } catch (error) {
      console.error("登录请求失败", error);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await fetch("http://127.0.0.1:8765/api/logout", {
        method: "POST",
      });
      const res = await fetch("http://127.0.0.1:8765/api/login");
      const data = await res.json();
      setIsLoggedIn(data.loggedIn);
      setUserInfo(null);
      window.dispatchEvent(new Event("logout-success"));
      window.dispatchEvent(new Event("select-success"));
    } catch (error) {
      console.error("登出失败", error);
    }
    setIsLoading(false);
  };

  const Logout = () => {
    return (
      <Box>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={userInfo?.faceUrl}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{userInfo?.nickname}</Text>
            </DropdownMenu.Label>

            <Dialog.Root>
              <Dialog.Trigger>
                <Button>登出</Button>
              </Dialog.Trigger>

              <Dialog.Content maxWidth="450px">
                <Dialog.Title>登出</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                  退出登录你的 CPP 账号
                </Dialog.Description>

                <Flex gap="3" mt="4" justify="end">
                  <Dialog.Close>
                    <Button variant="soft" color="gray">
                      取消
                    </Button>
                  </Dialog.Close>
                  <Dialog.Close>
                    <Button onClick={handleLogout}>登出</Button>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Box>
    );
  };

  if (!isLoggedIn)
    return (
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger>
          <button onClick={() => setErrorMsg("")}>
            <Avatar
              fallback="登录"
              size="2"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>登录</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            登录你的 CPP 账号
          </Dialog.Description>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <Flex direction="column" gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  账号
                </Text>
                <TextField.Root
                  placeholder="电话/邮箱"
                  onChange={(e) => setAccount(e.target.value)}
                />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  密码
                </Text>
                <TextField.Root
                  placeholder="xxxx"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </Flex>
            {errorMsg && (
              <Box mt="2">
                <Text color="red" size="2">
                  {errorMsg}
                </Text>
              </Box>
            )}

            <Flex gap="3" mt="2" justify="end">
              <Button
                variant="soft"
                type="button"
                color="gray"
                onClick={() => setIsOpen(false)}
              >
                取消
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "请稍等…" : "登录"}
              </Button>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    );
  return <Logout />;
};
