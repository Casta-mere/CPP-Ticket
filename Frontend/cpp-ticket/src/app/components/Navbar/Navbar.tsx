import { Flex } from "@radix-ui/themes";

import { LoginComponent } from "./_components/Login";
import NavLinksComponent from "./_components/NavLinks";

const NavBar = () => {
  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-white border-b border-b-gray-400 mb-5 px-5 py-4">
      <Flex align="center" justify="between">
        <NavLinksComponent />
        <LoginComponent />
      </Flex>
    </nav>
  );
};

export default NavBar;
