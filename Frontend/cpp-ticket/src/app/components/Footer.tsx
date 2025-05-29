import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { FiFacebook, FiGithub, FiGlobe } from "react-icons/fi";
import { SiCsdn } from "react-icons/si";

const Footer = () => {
  return (
    <>
      <footer className="p-4 bg-base-200 mt-auto">
        <Flex align="center" justify="center" direction="column" gap="3">
          <NavIconsComponent />
          <p className="text-base text-gray-400 dark:text-gray-500">
            Copyright © 2022 - {new Date().getFullYear()} Castamere
          </p>
        </Flex>
      </footer>
    </>
  );
};

const NavIcons = [
  { label: <FiGithub />, href: "https://github.com/Casta-mere/CPP-Ticket" },
  {
    label: <FiFacebook />,
    href: "https://www.facebook.com/profile.php?id=100064520177692",
  },
  { label: <FiGlobe />, href: "http://www.castamerego.com/" },
  { label: <SiCsdn />, href: "https://blog.csdn.net/qq_54869075" },
];

const NavIconsComponent = () => {
  return (
    <ul className="flex gap-6 items-center">
      {NavIcons.map((Icon) => (
        <li key={Icon.href}>
          <Link
            className="text-2xl text-zinc-500 hover:text-zinc-800 transaition-colors"
            href={Icon.href}
            target="_blank"
          >
            {Icon.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Footer;
