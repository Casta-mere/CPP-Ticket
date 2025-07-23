"use client";
import { usePathname } from "next/navigation";
import { RiDashboardFill } from "react-icons/ri";
import Link from "next/link";
import classNames from "classnames";

const navLinks = [
  { label: <RiDashboardFill />, href: "/" },
  { label: "Events", href: "/events" },
];

const NavLinksComponent = () => {
  const currentPath = usePathname();

  return (
    <ul className="flex gap-6 items-center">
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              " font-bold hover:text-zinc-800 transaition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinksComponent;
