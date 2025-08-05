import React from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { CometCard } from "../components/comet-card";
import Footer from "../components/Footer";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="w-full flex flex-col text-white overflow-x-hidden bg-linear-to-b from-[#000000] to-[#191919] px-2">
      <main className="min-h-[150dvh] max-w-4xl flex-1 -z-0 flex flex-col items-center text-center px-4 mx-auto lg:flex-col md:flex-col lg:items-center lg:justify-items-start">
        <div className="absolute inset-0 h-100vh w-full -z-10 [background:radial-gradient(200%_80%_at_50%_0%,_hsl(56,100%,25%)_0%,_transparent_80%)] md:[background:radial-gradient(100%_80%_at_50%_0%,_hsl(56,100%,25%)_0%,_transparent_80%)]" />
        <section
          id="home"
          className="max-w-4xl flex flex-col pt-[20vh] justify-center items-center text-center px-4 mx-auto lg:flex-row md:flex-col lg:items-start lg:pt-[25vh]"
        >
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
            <p className="text-gray-400 mb-8 max-w-xl">
              Designed to save your time and sharpen your understanding — this
              tool converts any YouTube video into a concise, readable summary
              using your ChatGPT
            </p>

            <GoogleLoginButton />
          </div>
        </section>
        <section
          id="features"
          className="max-w-4xl flex flex-col items-center justify-center text-center px-4 mx-auto pt-[15vh] lg:pt-[20vh]"
        >
          <h2 className="text-4xl text-center">
            What Makes Us{" "}
            <span className="bg-[hsl(56,100%,50%)] px-2 text-black border-r-4 border-white inline-block leading-[1.2] font-bold">
              Different
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 gap-8 max-w-6xl mx-auto">
            <CometCard className="flex flex-col justify-between max-w-xl">
              <h3 className="text-xl font-semibold text-[hsl(56,100%,50%)] mb-2">
                Personal API Key, Unlimited Control
              </h3>
              <p className="text-sm text-gray-400">
                You connect your own ChatGPT API key, which means you're in
                charge of how many summaries you generate, no limits from our
                side. Use your free OpenAI credits to get started, and simply
                switch your key anytime to continue without restrictions.
              </p>
            </CometCard>
            <CometCard className="flex flex-col justify-between max-w-xl ">
              <h3 className="text-xl font-semibold text-[hsl(56,100%,50%)] mb-2">
                Smart Chunking for Long Videos
              </h3>
              <p className="text-sm text-gray-400">
                Long YouTube video? No worries. Briefly automatically splits
                lengthy transcripts into manageable parts, processes them
                individually using ChatGPT, and combines them seamlessly into
                one clear and concise summary, so you never miss context.
              </p>
            </CometCard>
            <CometCard className="flex flex-col justify-between max-w-xl min-h-10">
              <h3 className="text-xl font-semibold text-[hsl(56,100%,50%)] mb-2">
                Complete History with Timestamps
              </h3>
              <p className="text-sm text-gray-400">
                Every summary you generate is saved securely in your personal
                history — along with the original video link and time-based
                highlights. Access, review, and revisit your past summaries
                anytime from one clean, organized page.
              </p>
            </CometCard>
            <CometCard className="flex flex-col justify-between max-w-xl min-h-10">
              <h3 className="text-xl font-semibold text-[hsl(56,100%,50%)] mb-2">
                Instant Export to PDF
              </h3>
              <p className="text-sm text-gray-400">
                Want to keep the summary for later? Just click the export button
                and download a clean, well-formatted PDF version instantly.
                Whether it’s for offline reading, sharing with friends, or
                saving notes, your summaries are now just a click away.
              </p>
            </CometCard>
            <CometCard className="flex flex-col justify-between max-w-xl min-h-10">
              <h3 className="text-xl font-semibold text-[hsl(56,100%,50%)] mb-2">
                Browser Extension (Coming Soon)
              </h3>
              <p className="text-sm text-gray-400">
                We’re building a powerful Chrome extension that brings Briefly
                right into YouTube. Soon, you’ll see a “Summarize” button
                directly on any video page, no need to switch tabs. It’s
                YouTube, upgraded with AI summaries in one click.
              </p>
            </CometCard>
          </div>
        </section>
        <section
          id="about"
          className="max-w-4xl flex flex-col items-center justify-center text-center px-4 mx-auto pt-[10vh] lg:pt-[15vh]"
        >
          <h2 className="text-4xl text-center mb-8">
            About the{" "}
            <span className="bg-[hsl(56,100%,50%)] px-2 text-black border-r-4 border-white inline-block leading-[1.2] font-bold">
              Creator
            </span>
          </h2>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-[hsl(56,100%,50%)] mb-2">
              Hey, I'm Khizar Ali !
            </h3>
            <p className="text-sm text-gray-400 max-w-2xl">
              I'm a passionate full-stack developer from India, building
              projects that blend creativity with real-world usefulness. Briefly
              was born out of a need, I was tired of watching long YouTube
              videos just to extract key points. So I built something better.
            </p>
          </div>
          <div className="flex gap-7 justify-center items-center my-8">
            <a
              href="https://github.com/khizar-45"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-6 h-6 hover:text-[hsl(56,100%,50%)] transition" />
            </a>
            <a
              href="https://linkedin.com/in/khizar45"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-6 h-6 hover:text-[hsl(56,100%,50%)] transition" />
            </a>
            <a
              href="mailto:skkhizarali45@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail className="w-6 h-6 hover:text-[hsl(56,100%,50%)] transition" />
            </a>
            <a
              href="https://instagram.com/_khizar45"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-6 h-6 hover:text-[hsl(56,100%,50%)] transition" />
            </a>
          </div>
          <p className="text-gray-400 max-w-xl text-sm py-6">
            Built with ❤️ by Khizar Ali.
            <br />
            Always learning. Always shipping.
          </p>
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
