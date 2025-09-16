import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export const socialIcon = [
  { href: "https://www.instagram.com/", icon: <FaInstagram /> , label: "Instagram" },
  { href: "https://facebook.com/", icon: <FaFacebook /> , label: "Facebook" },
  { href: "https://www.tiktok.com/", icon: <FaTiktok />  , label: "Tiktok"},
  { href: "https://x.com/", icon: <FaTwitter /> , label: "Twitter" },
  { href: "https://www.linkedin.com/", icon: <FaLinkedin /> , label: "Linkedin" },
  { href: "https://www.youtube.com/", icon: <FaYoutube /> , label: "Youtube" },
];

export const navigationLinks = [
  { href: "/", label: "Home", active: true },
  { href: "/categories", label: "Categories" },
  { href: "/brands", label: "Brands" },
];