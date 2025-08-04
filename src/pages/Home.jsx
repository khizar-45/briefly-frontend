import React from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import GoogleLoginButton from "../components/GoogleLoginButton";

const Homepage = () => {
  return (
    <div className="w-full flex flex-col text-white overflow-x-hidden bg-linear-to-b from-[#000000] to-[#191919] px-2">
      <main className="min-h-[100dvh] max-w-4xl flex-1 -z-0 flex flex-col justify-center items-center text-center px-4 mx-auto lg:flex-row lg:justify-center md:flex-col md:justify-center">
        <div className="absolute inset-0 h-100vh w-full -z-10 [background:radial-gradient(200%_80%_at_50%_0%,_hsl(56,100%,25%)_0%,_transparent_80%)] md:[background:radial-gradient(100%_80%_at_50%_0%,_hsl(56,100%,25%)_0%,_transparent_80%)]" />
        <img
          src="/brieflyLogoPng.png"
          alt="Briefly Logo"
          className="w-30 md:w-44 lg:w-56 mb-8 md:mb-10 hover:drop-shadow-[0_0_4rem_rgba(255,249,85,0.6)] transition duration-300 lg:mr-6"
        />

        <div className="mx-auto flex flex-col items-center justify-items-start text-white text-center transition">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Instant YouTube Summaries
            <br />
            with{" "}
            <span className="bg-[hsl(56,100%,50%)] px-2 text-black border-r-4 border-white inline-block leading-[1.2]">
              Power of AI
            </span>
          </h1>
          <p className="text-gray-400 mb-8 max-w-xl">Designed to save your time and sharpen your understanding — this tool converts any YouTube video into a concise, readable summary using your ChatGPT</p>

          <GoogleLoginButton />
        </div>
      </main>
      <section className="min-h-[100dvh] flex flex-col items-center justify-center mt-8">

      </section>
    </div>
  );
};

export default Homepage;
