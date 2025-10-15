// src/pages/Homepage.jsx
import React, { useRef, useState, useEffect } from "react";
import { Keyboard, Clipboard, TriangleAlert, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import { toPng } from "html-to-image";
import { Link } from "react-router-dom";

const Homepage = () => {
  const errorTimeout = useRef(null);

  const throwError = (message) => {
    if (!message) {
      setError(null);
      if (errorTimeout.current) clearTimeout(errorTimeout.current);
      return;
    }
    setError("");
    setTimeout(() => setError(message), 10);

    if (errorTimeout.current) clearTimeout(errorTimeout.current);
    errorTimeout.current = setTimeout(() => {
      setError(null);
      errorTimeout.current = null;
    }, 4000);
  };

  const YT_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

  const fakeSummary =
    '# Fake Markdown for Testing\n\n## Section 1: Lists\n- Item A\n- Item B\n  - Subitem B1\n  - Subitem B2\n- Item C\n\n1. Step one\n2. Step two\n3. Step three\n   1. Substep a\n   2. Substep b\n\n---\n\n## Section 2: Code Blocks\nHere is some **JavaScript**:\n\n```javascript\nfunction greet(name) {\n  console.log("Hello, " + name + "!");\n}\ngreet("World");\n\nfor (let i = 0; i < 5; i++) {\n  console.log(i);\n}\n```\n\nAnd some **Python**:\n\n```python\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nfor i in range(10):\n    print(fibonacci(i))\n```\n\n---\n\n## Section 3: Blockquotes\n> "The only way to do great work is to love what you do." – Steve Jobs\n\n---\n\n## Section 4: Links & Inline Code\nCheck out [React Docs](https://react.dev) for more info.\n\nInline code example: `const x = 42;`\n\n---\n\n## Section 5: Long Paragraph\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.\n\nAnother long paragraph here to make sure wrapping works fine. Repeat. Another long paragraph here to make sure wrapping works fine. Repeat. Another long paragraph here to make sure wrapping works fine. Repeat.\n\n---\n\n## Section 6: Table\n| Name     | Age | Role        |\n|----------|-----|-------------|\n| Alice    | 24  | Developer   |\n| Bob      | 29  | Designer    |\n| Charlie  | 32  | Manager     |\n\n--- \n\n## Section 7: More Headers\n### Subsection 1\nSome text under subsection 1.\n\n#### Sub-subsection 1.1\nDetails about sub-subsection 1.1.\n\n### Subsection 2\nSome text under subsection 2.\n\n#### Sub-subsection 2.1\nDetails about sub-subsection 2.1.\n \n#### Sub-subsection 2.2\nDetails about sub-subsection 2.2.\n ';

  const [link, setLink] = useState(() => {
    return sessionStorage.getItem("ytLink") || "";
  });
  const [summary, setSummary] = useState(() => {
    return sessionStorage.getItem("ytSummary") || "";
  });
  const [loadingPaste, setLoadingPaste] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryLength, setSummaryLength] = useState("small");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("Checking...");
  const summaryRef = useRef(null);

  const BACKEND = import.meta.env.VITE_BACKENDLINK;
  const NGROK = import.meta.env.VITE_NGROK_LINK;

  useEffect(() => {
    sessionStorage.setItem("ytLink", link);
  }, [link]);


  useEffect(() => {
    if (summary) sessionStorage.setItem("ytSummary", summary);
    else sessionStorage.removeItem("ytSummary");
  }, [summary]);

  const checkStatus = async () => {
    const body = { "video_url" : "https://www.youtube.com/watch?v=LlkcvvGbs9I" }
    try{
      const res = await axios.post(`${NGROK}/transcript`, body);
      console.log("Status check response:", res);
      if(res.data && res.data.transcript){
        setStatus("Online");
      }
    } catch(err){
      console.error("Python server offline", err);
      setStatus("Offline");
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const handlePasteFromClipboard = async () => {
    try {
      setLoadingPaste(true);
      const text = await navigator.clipboard.readText();
      setLink(text || "");
    } catch (err) {
      console.error("Clipboard read failed:", err);
      throwError(
        "Couldn't read clipboard. Make sure your browser allows clipboard access."
      );
    } finally {
      setLoadingPaste(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (!link) {
      setSummary("");
      setError(null);
      setTimeout(() => throwError("Paste a YouTube link first"), 10);
      return;
    }
    if (!YT_REGEX.test(link)) {
      setSummary("");
      setError(null);
      setTimeout(() => throwError("Please enter a valid YouTube link."), 10);
      return;
    }
    if (!BACKEND) {
      setSummary("");
      setError(null);
      setTimeout(() => throwError("No backend configured."), 10);
      return;
    }

    try {
      setLoadingSummary(true);
      setSummary("");

      const res = await axios.post(`${BACKEND}/summarize/generate-summary`, {
        videoUrl: link,
        summaryLength,
      });
      const serverSummary = (res && res.data && res.data.cleanedSummary) || "";

      if (!serverSummary) throwError("No summary returned from server.");
      else setSummary(String(serverSummary));
    } catch (err) {
      console.error("Summarize request failed", err);
      throwError("Failed to generate summary. Check console for details.");
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleDownload = async () => {
    if (!summaryRef.current) return throwError("No summary to export.");

    try {
      const dataUrl = await toPng(summaryRef.current, {
        pixelRatio: 2,
        backgroundColor: null,
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "summary.png";
      link.click();
    } catch (err) {
      console.error("Export failed", err);
      throwError("Could not export image. Check console.");
    }
  };

  const heightClasses = "h-12 md:h-13 lg:h-14";
  const btnWidthClasses = "w-24 md:w-32 lg:w-40";
  const pasteBtnSize =
    "w-8 h-8 md:w-18 md:h-9 lg:w-22 items-center justify-center lg:h-10";

  const mdComponents = {
    h1: ({ node, ...props }) => (
      <h1
        className="text-xl md:text-2xl lg:text-3xl font-bold mt-3 mb-2"
        {...props}
      />
    ),
    h2: ({ node, ...props }) => (
      <h2
        className="text-lg md:text-xl lg:text-2xl font-semibold mt-2 mb-2"
        {...props}
      />
    ),
    h3: ({ node, ...props }) => (
      <h3
        className="text-base md:text-lg lg:text-xl font-semibold mt-2 mb-2"
        {...props}
      />
    ),
    p: ({ node, ...props }) => (
      <p
        className="text-sm md:text-base lg:text-base leading-6 mb-2"
        {...props}
      />
    ),
    ul: ({ node, ...props }) => (
      <ul className="list-disc ml-5 mb-2 space-y-1" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="list-decimal ml-5 mb-2 space-y-1" {...props} />
    ),
    li: ({ node, ...props }) => (
      <li className="text-sm md:text-base lg:text-base" {...props} />
    ),
    a: ({ node, ...props }) => (
      <a className="underline text-blue-400" {...props} />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote
        className="border-l-4 pl-4 italic text-gray-300 my-2"
        {...props}
      />
    ),
    code: ({ inline, className, children, ...props }) =>
      inline ? (
        <code className="bg-gray-800 px-1 rounded text-xs" {...props}>
          {children}
        </code>
      ) : (
        <pre
          className="bg-gray-900 p-3 rounded overflow-auto text-sm"
          {...props}
        >
          <code>{children}</code>
        </pre>
      ),
  };

  return (
    <div className="w-full flex flex-col text-white overflow-hidden bg-gradient-to-b from-[#000000] to-[#0c0c0c] px-2 items-center relative">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ y: 50, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: 50, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-6 bg-red-500 rounded-xl py-2 px-4 flex items-center justify-center gap-2 max-w-[90%] text-center"
          >
            <TriangleAlert className="w-4.5 h-4.5 text-white flex-shrink-0" />
            <span className="text-white text-sm break-words">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>


      <Link to="/">
        <motion.div className="absolute top-0 left-0 p-6 rounded-full cursor-pointer">
        <ArrowLeft className="w-6 h-6 text-white" />
        </motion.div>
      </Link>
    

      <motion.main
        initial={{ filter: "blur(10px)" }}
        animate={{ filter: "blur(0px)" }}
        transition={{ duration: 0.4 }}
        className="min-h-[100dvh] max-w-4xl flex flex-col items-center text-center px-4 w-full mx-auto"
      >
        <motion.section layout className="w-full max-w-4xl mt-12 mx-auto">
          {/* <div className="mb-6 w-44 md:w-54 lg:w-60 items-center mx-auto aspect-[1/1]">
            <img
              src="/briefly_png.png"
              alt="Briefly Logo"
              className="mx-auto mb-2 md:mb-4 hover:drop-shadow-[0_0_4rem_rgba(255,249,85,1)] transition duration-300"
            />
          </div> */}

          <div className="flex flex-col justify-center items-center py-30">
            <h1 className="text-5xl font-semibold mb-2"> Paste a <span className="bg-primary px-2 text-black border-r-4 border-white inline-block leading-[1.2]">
                Youtube
              </span> Link</h1>
          </div>
          <div className="flex items-center w-full gap-3">
            <div className={`relative flex-1 ${heightClasses}`}>
              <input
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                  setError(null);
                }}
                placeholder="Paste a YT Link..."
                className={`w-full ${heightClasses} pr-12 md:pr-22 lg:pr-26 bg-[#0b0b0b] border border-white/30 rounded-xl px-4 text-sm placeholder:text-gray-500 outline-none focus:ring-1 focus:ring-primary transition `}
                aria-label="YouTube link"
              />

              {/* <div
                className={`absolute top-0 left-0 z-0 rounded-lg bg-gradient-to-r to-transparent from-[#0b0b0b] w-[50%] h-[100%]`}
              >
              </div> */}

              <button
                onClick={handlePasteFromClipboard}
                className={`absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2 bg-[#252525] border border-gray-800 rounded-lg ${pasteBtnSize} px-2 text-xs`}
                title="Paste from clipboard"
                type="button"
              >
                <Clipboard className="w-3 h-3 md:w-4 md:h-4 lg:w-4 lg:h-4" />
                <span className="hidden md:inline-block text-xs md:text-[0.8rem] lg:text-[1rem]">
                  {loadingPaste ? "Pasting" : "Paste"}
                </span>
              </button>
            </div>

            <button
              onClick={handleGenerateSummary}
              disabled={loadingSummary}
              className={`ml-0 ${btnWidthClasses} ${heightClasses} flex items-center justify-center rounded-xl font-medium text-sm text-black bg-primary hover:scale-[1.04] transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed md:text-lg cursor-pointer`}
            >
              {loadingSummary ? "Summarizing..." : "Summarize"}
            </button>
          </div>
        </motion.section>

        {/* Export & Summary */}
        <section className="w-full max-w-4xl mt-4 mx-auto justify-center items-center">
          <div className="flex justify-between">
            {/* Dropdown for summary length */}
            <div className="flex items-center gap-2">
              <span className="text-sm md:text-base">Length:</span>
              <select
                value={summaryLength}
                onChange={(e) => setSummaryLength(e.target.value)}
                className="bg-[#0b0b0b] border border-white/30 rounded-lg px-3 py-2 text-sm md:text-base focus:ring-1 focus:ring-primary justify-center items-center outline-none text-white"
              >
                <option value="small" className="active:bg-primary">
                  Small
                </option>
                <option value="detailed">Detailed</option>
              </select>
            </div>

            {/* <motion.div 
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="flex border rounded-xl overflow-hidden w-36 md:w-40 lg:w-44 justify-center border-white/30">
              <button
                onClick={() => setSummaryLength("small")}
                className={`px-4 py-2 w-[50%] ${
                  summaryLength === "small"
                    ? "bg-primary text-black"
                    : "bg-black text-white"
                }`}
              >
                Small
              </button>
              <button
                onClick={() => setSummaryLength("detailed")}
                className={`px-4 py-2 w-[50%] ${
                  summaryLength === "detailed"
                    ? "bg-primary text-black"
                    : "bg-black text-white"
                }`}
              >
                Detailed
              </button>
            </motion.div> */}
            <div className={` my-auto items-center ${status === "Online" ? "text-green-500" : status === "Offline" ? "text-red-500" : "text-primary"}`}>Status : {status}</div>


            <button
              onClick={handleDownload}
              disabled={!summary}
              className={`${btnWidthClasses} ${heightClasses} flex items-center justify-center px-4 py-2 rounded-xl font-medium text-[0.75rem] ${
                summary
                  ? "bg-primary text-black md:text-[1rem] hover:scale-[1.04] transition duration-200 cursor-pointer"
                  : "bg-gray-700 text-gray-300 cursor-not-allowed md:text-[1rem]"
              }`}
            >
              Download
            </button>
          </div>
          <div className="my-4 w-full">
            <button
              onClick={() => setSummary(fakeSummary)}
              className={`${btnWidthClasses} ${heightClasses} flex items-center justify-center px-4 py-2 rounded-xl font-medium text-[0.75rem] bg-primary text-black md:text-[1rem] hover:scale-[1.04] transition duration-200 cursor-pointer
              }`}
            >
              Try Demo
            </button>
          </div>

          {/* Summary container: expanded when summary exists */}
          <div
            ref={summaryRef}
            className={`mt-6 w-full overflow-hidden transition-all duration-500 ${
              summary
                ? "px-6 pt-4 pb-6 bg-[#070707] border border-white/30 rounded-md mb-4"
                : "max-h-0 p-0"
            }`}
          >
            <div className={`${summary ? "block" : "hidden"}`}>
              <div className="text-left">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={mdComponents}
                >
                  {summary}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          <div className={`${loadingSummary ? "block" : "hidden"}`}>
              <div className="w-full flex flex-col justify-center items-center animate-pulse mt-4">
                <img src="/briefly_png.png" className="h-25 w-25 animate-bounce mt-20"></img>
              </div>
            </div>
        </section>
      </motion.main>
    </div>
  );
};

export default Homepage;
