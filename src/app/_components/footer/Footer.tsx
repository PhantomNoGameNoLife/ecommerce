import logo from "@/../public/freshcart-logo.png";
import { navigationLinks, socialIcon } from "@/utilities/links";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="w-full max-w-7xl mx-auto px-6 py-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 border-b">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <Image
              src={logo}
              alt="logo"
              width={140}
              height={40}
            />
          </Link>

          {/* Nav Links */}
          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-muted-foreground">
            {navigationLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground text-center">
            © 2025{" "}
            <Link href="/" className="font-medium hover:text-primary transition">
              Sherif Alaa
            </Link>
            . All Rights Reserved.
          </span>

          {/* Socials*/}
          <ul className="flex items-center gap-4">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;