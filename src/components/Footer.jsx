import React from "react";

const Footer = () => {
  return (
    <footer className="w-full text-center py-4 text-gray-500 text-xs">
      &copy; {new Date().getFullYear()} Briefly. All rights reserved.
    </footer>
  );
};

export default Footer;
