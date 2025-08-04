import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 h-20 w-full flex gap-4 justify-center items-center z-[10] px-8 py-4">
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto dark:bg-[#1d1d1dcb] backdrop-blur-lg overflow-x-hidden rounded-xl px-6 py-4 mt-4 border dark:border-white/30 bg-white/90 border-black/25 shadow-lg transition-all duration-300 md:px-20">
        <h1 className="text-2xl font-bold text-white">Briefly</h1>
        <div className="flex gap-4 fixed right-6 md:right-20 md:gap-8">
          <a
            href="https://github.com/khizar-45"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 text-sm hover:brightness-150 transition duration-300"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/khizar45"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 text-sm hover:brightness-150 transition duration-300"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
