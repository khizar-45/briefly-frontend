import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 h-20 w-full flex gap-4 justify-center items-center z-[10] px-8 py-4">
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto bg-[#1d1d1dcb] backdrop-blur-lg overflow-x-hidden rounded-xl px-6 py-4 mt-4 border border-white/30 shadow-lg transition-all duration-300 md:px-20">
        <h1 className="text-md font-bold text-white md:text-2xl">Briefly</h1>
        <div className="flex gap-4 fixed right-6 md:right-20 md:gap-8">
          <a
            href="#home"
            rel="noopener noreferrer"
            className="text-gray-400 text-xs md:text-sm hover:brightness-150 active:scale-90 transition duration-300"
          >
            Home
          </a>
          <a
            href="#features"
            rel="noopener noreferrer"
            className="text-gray-400 text-xs md:text-sm hover:brightness-150 active:scale-90 transition duration-300"
          >
            Features
          </a>
          <a
            href="#about"
            rel="noopener noreferrer"
            className="text-gray-400 text-xs md:text-sm hover:brightness-150 active:scale-90 transition duration-300"
          >
            About
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
