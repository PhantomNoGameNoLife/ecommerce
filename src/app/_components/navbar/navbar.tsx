"use client";

import logo from "@/../public/freshcart-logo.svg";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import ToggleTheme from "./toggletheme";
import { usePathname } from "next/navigation";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", active: true },
  { href: "/cart", label: "Cart" },
  { href: "/product", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/brands", label: "Brands" },
];

const socialIcon = [
  { href: "https://www.instagram.com/", icon: <FaInstagram /> },
  { href: "https://facebook.com/", icon: <FaFacebook /> },
  { href: "https://www.tiktok.com/", icon: <FaTiktok /> },
  { href: "https://x.com/", icon: <FaTwitter /> },
  { href: "https://www.linkedin.com/", icon: <FaLinkedin /> },
  { href: "https://www.youtube.com/", icon: <FaYoutube /> },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    // to make ProductsDetails/[id] link active if user click on any product
    return pathname.startsWith(href);
  };

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <li key={index} className="w-full p-2">
                      <Link
                        href={link.href}
                        className={`py-1.5 ${
                          isActive(link.href)
                            ? "text-primary border-b-2 border-primary"
                            : "text-muted-foreground hover:text-primary"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-primary hover:text-primary/90">
              <Image
                src={logo}
                alt="logo"
                className="w-28 sm:w-full dark:invert"
              />
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2.5">
                {navigationLinks.map((link, index) => (
                  <li key={index} className="px-1">
                    <Link
                      href={link.href}
                      className={`text-muted-foreground hover:text-primary py-1.5 font-medium ${
                        isActive(link.href)
                          ? "text-primary border-b-2 border-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-2 sm:flex">
            {socialIcon.map((icon, idx) => (
              <li key={idx}>
                <Link
                  href={icon.href}
                  className="size-4 rounded-full hover:text-blue-500"
                  target="_blank"
                >
                  {icon.icon}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild variant="ghost" size="sm" className="text-sm">
            <Link href="/login">SignIn</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-sm">
            <Link href="/register">SignUp</Link>
          </Button>
          {/* <Button size="sm" className="text-sm cursor-pointer">
            SignOut
          </Button> */}
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}
