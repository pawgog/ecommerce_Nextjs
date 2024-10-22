"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Icons } from "./Icons";

const NavLinks = [
  { id: 1, name: "Home", path: "" },
  { id: 2, name: "Products", path: "products" },
  { id: 3, name: "Cart", path: "cart" },
];

const NavBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => path === pathname.split("/")[1];

  const handleNavBarOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="fixed w-full bg-white border-b z-20">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between z-20">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
              onClick={handleNavBarOpen}
            >
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center md:justify-start ">
            <div className="flex flex-shrink-0 items-center">
              <Icons.Sparkle className="w-16 h-16" />
            </div>
            <div
              className={`${
                isOpen ? "ml-0" : "ml-[-100%]"
              } transition-all duration-300 fixed md:static flex h-full left-0 top-[65px] border-r md:border-0 bg-white md:block md:ml-10`}
            >
              <ul className="flex sm:flex-row flex-col md:space-x-4">
                {NavLinks.map(({ id, path, name }) => {
                  return (
                    <li
                      key={id}
                      className="px-3 py-2 md:p-0 text-sm font-medium mx-auto"
                    >
                      <Link
                        href={`/${path}`}
                        className={`${
                          isActive(path) ? "bg-gray-900 text-white" : ""
                        } rounded-md px-3 py-2`}
                      >
                        {name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
