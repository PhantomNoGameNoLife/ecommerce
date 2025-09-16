import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export const socialIcon = [
  { href: "https://www.instagram.com/", icon: <FaInstagram /> },
  { href: "https://facebook.com/", icon: <FaFacebook /> },
  { href: "https://www.tiktok.com/", icon: <FaTiktok /> },
  { href: "https://x.com/", icon: <FaTwitter /> },
  { href: "https://www.linkedin.com/", icon: <FaLinkedin /> },
  { href: "https://www.youtube.com/", icon: <FaYoutube /> },
];

export const navigationLinks = [
  { href: "/", label: "Home", active: true },
  { href: "/categories", label: "Categories" },
  { href: "/brands", label: "Brands" },
];