import { Box } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const stickyItems = [
  {
    href: "/",
    title: "Home",
  },
  {
    href: "/books",
    title: "Books",
  },
  {
    href: "/magazine",
    title: "Magazine",
  },
  {
    href: "/textbooks",
    title: "Textbooks",
  },
  {
    href: "/audiobooks",
    title: "Audiobooks"
  },
  {
    href: "/recommended",
    title: "Recommended"
  },
  {
    href: "/sale",
    title: "Sale"
  }
];

const NavBar = () => {
  const currentHref = window.location.href;
  const lengthOriginHostname = window.location.origin.length;
  const indexOfSlash = currentHref.indexOf("/", lengthOriginHostname-1);

  return (
    <Box className="navbar-container">
      <ul className="navbar">
        {stickyItems.map(({ href, title }, i) => (
          <li className={(currentHref.slice(indexOfSlash) === href) ? "active" : ""} key={i}>
            <Link to={href}>{title}</Link>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default NavBar;
