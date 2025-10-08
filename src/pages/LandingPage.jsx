import React from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { CometCard } from "../components/comet-card";
import Footer from "../components/Footer";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { motion } from "motion/react";
import Homepage from "./Home";
import { Route, Link } from "react-router-dom";
import { features } from "../data/features";

const LandingPage = () => {


  return (
    <>
    <div className="w-full flex flex-col text-white overflow-x-hidden bg-black px-2">
      <Navbar />
      <main className="min-h-[150dvh] max-w-4xl flex-1 -z-0 flex flex-col items-center text-center px-4 mx-auto lg:flex-col md:flex-col lg:items-center lg:justify-items-start">
        <div className="absolute inset-0 h-100vh w-full -z-10 [background:radial-gradient(200%_80%_at_50%_0%,_hsl(56,100%,25%)_0%,_transparent_80%)] md:[background:radial-gradient(100%_80%_at_50%_0%,_hsl(56,100%,25%)_0%,_transparent_80%)]" />

        <motion.section
          initial={{ filter: "blur(10px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{ duration: 0.4 }}
          id="home"
          className="max-w-4xl flex flex-col pt-[20vh] justify-center items-center text-center px-4 mx-auto lg:flex-row md:flex-col lg:items-start lg:pt-[25vh]"
        >
          <img
            src="/briefly_png.png"
            alt="Briefly Logo"
            className="w-40 md:w-52 lg:w-66 mb-8 md:mb-10 hover:drop-shadow-[0_0_4rem_rgba(255,249,85,1)] transition duration-300 lg:mr-6 aspect-square"
          />
          <div className="mx-auto flex flex-col items-center justify-items-start text-white text-center transition">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Instant YouTube Summaries
              <br />
              with{" "}
              <span className="bg-primary px-2 text-black border-r-4 border-white inline-block leading-[1.2]">
                Power of AI
              </span>
            </h1>
            <p className="text-gray-400 mb-2 max-w-xl">
              A tool that turns any YouTube video into a short, easy-to-read summary. Powered by a Python microservice, Gemini API, and a clean React UI.
            </p>
            <h4 className="text-sm font-medium text-primary mt-2 mb-4">
              Demo project! service may not be online 24/7. Reach out via mail/DM if you’d like to try
            </h4>
            <div className="flex flex-row gap-4">
              <Link to="/summarize">
              <Button text={"Get Started"}></Button>
              </Link>
              <a href="/Resume_SEP19.pdf" target="_blank" rel="noopener noreferrer" download={true}>
              <Button text={"Download Resume"}></Button>
              </a>
              
            </div>
            
            
          </div>
        </motion.section>

        <motion.section
        initial={{ filter: "blur(10px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{ duration: 0.4 }}
          className="w-full flex flex-col justify-center items-center mt-30">
            <div className="flex flex-row gap-2 justify-center items-center">
              <p className="text-4xl text-center ">Summary</p> 
              <span className="text-4xl text-center font-bold bg-primary px-2 text-black border-r-4 border-white inline-block leading-[1.2]">
                Demo
              </span>
            </div>
              <div className="w-full flex justify-center items-center mt-6 relative">
                <div className="w-full h-full absolute top-0 left-0 mx-auto bg-gradient-to-b from-transparent via-transparent to-black"></div>
                <img src="/Demo.png" alt="Demo Screenshot" className="w-[100%] mt-4 border-2 border-primary/30 rounded-4xl"/>
              </div>
            
        </motion.section>

        <motion.section
          initial={{ filter: "blur(10px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{ duration: 0.4 }}
          id="features"
          className="max-w-4xl flex flex-col items-center justify-center text-center px-4 mx-auto pt-[15vh] lg:pt-[20vh]"
        >
          <h2 className="text-4xl text-center">
            What Makes Us{" "}
            <span className="bg-primary px-2 text-black border-r-4 border-white inline-block leading-[1.2] font-bold">
              Different
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 gap-8 max-w-6xl mx-auto">
            {features.map((item, index) => (
              <CometCard
                key={index}
                className="flex flex-col justify-between max-w-xl min-h-10 rounded-2xl bg-transparent"
              >
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 max-w-[90%]">{item.description}</p>
              </CometCard>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ filter: "blur(10px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{ duration: 0.4 }}
          id="about"
          className="max-w-4xl flex flex-col items-center justify-center text-center px-4 mx-auto pt-[10vh] lg:pt-[15vh]"
        >
          <h2 className="text-4xl text-center mb-8">
            About the{" "}
            <span className="bg-primary px-2 text-black border-r-4 border-white inline-block leading-[1.2] font-bold">
              Creator
            </span>
          </h2>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-primary mb-2">
              Hey, I'm Khizar Ali !
            </h3>
            <p className="text-sm text-gray-400 max-w-2xl">
              I'm a passionate full-stack developer from India, building
              projects that blend creativity with real-world usefulness. Briefly
              was born out of a need, I was tired of watching long YouTube
              videos just to extract key points. So I built this.
            </p>
          </div>
          <div className="flex gap-7 justify-center items-center my-8">
            <a
              href="https://github.com/khizar-45"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-6 h-6 hover:text-primary transition" />
            </a>
            <a
              href="https://linkedin.com/in/khizar45"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-6 h-6 hover:text-primary transition" />
            </a>
            <a
              href="mailto:skkhizarali45@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail className="w-6 h-6 hover:text-primary transition" />
            </a>
            <a
              href="https://instagram.com/_khizar45"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-6 h-6 hover:text-primary transition" />
            </a>
          </div>

          <p className="text-gray-400 max-w-xl text-sm py-6">
            Built with ❤️ by Khizar Ali.
            <br />
            Always learning. Always shipping.
          </p>
          <Footer />
        </motion.section>
      </main>
    </div>
    </>
  );
};

export default LandingPage;
