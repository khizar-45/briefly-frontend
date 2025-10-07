import React from "react";

const Button = ({ href, text, target = "_blank" }) => {
  return (
    <button
      href={href}
      target={target}
      rel="noopener noreferrer"
      className=" cursor-pointer text-center px-4 py-2 bg-black text-white rounded-lg font-semibold shadow-[inset_0_0_0_1px_white]
            active:bg-primary active:text-black active:scale-90
            hover:shadow-none hover:bg-primary hover:text-black transition-all duration-50 text-[0.9rem]"
    >
      {text}
    </button>
  );
};

export default Button;
