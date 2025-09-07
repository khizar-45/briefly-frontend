// src/pages/Homepage.jsx
import React, { useRef, useState } from "react";
import { Keyboard, Clipboard } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { motion } from "motion/react";

const Homepage = () => {
  const [link, setLink] = useState("");
  // const [summary, setSummary] = useState("## Sample Title\n\n- point 1\n- point 2\n\nMore text... \n\n### Subtitle\n\n`code snippet`\n\n> blockquote \n\n[link](https://example.com) \n\n1. numbered list item 1\n2. numbered list item 2 \n\n```javascript\n// code block\nconsole.log('Hello, world!');\n```");
  const [summary, setSummary] = useState("");
  const [loadingPaste, setLoadingPaste] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [error, setError] = useState(null);
  const summaryRef = useRef(null);

  const BACKEND = import.meta.env.VITE_BACKENDLINK;

  const handlePasteFromClipboard = async () => {
    try {
      setLoadingPaste(true);
      const text = await navigator.clipboard.readText();
      setLink(text || "");
    } catch (err) {
      console.error("Clipboard read failed:", err);
      alert("Couldn't read clipboard. Make sure your browser allows clipboard access.");
    } finally {
      setLoadingPaste(false);
    }
  };

  const handleGenerateSummary = async () => {
    setError(null);
    if (!link) return alert("Paste a YouTube link first");
    if (!BACKEND) return alert("Set VITE_BACKENDLINK in your .env (and restart dev server).");

    try {
      setLoadingSummary(true);
      setSummary("");

      const resp = await axios.post(`${BACKEND}/summarize`, { videoUrl: link });
      const serverSummary = (resp && resp.data && (resp.data.summary || resp.data)) || "";

      if (!serverSummary) setError("No summary returned from server.");
      else setSummary(String(serverSummary));
    } catch (err) {
      console.error("Summarize request failed", err);
      setError("Failed to generate summary. Check console for details.");
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleExportPDF = async () => {
    if (!summaryRef.current) return alert("No summary to export.");

    try {
      const element = summaryRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ unit: "pt", format: "a4" });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const renderedHeight = (imgHeight * pdfWidth) / imgWidth;

      let heightLeft = renderedHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, renderedHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = position - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, renderedHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("summary.pdf");
    } catch (err) {
      console.error("Export failed", err);
      alert("Could not export PDF. Check console for details.");
    }
  };

  const heightClasses = "h-12 md:h-13 lg:h-14";
  const btnWidthClasses = "w-24 md:w-32 lg:w-40";
  const pasteBtnSize = "w-8 h-8 md:w-18 md:h-9 lg:w-22 items-center justify-center lg:h-10";

  const mdComponents = {
    h1: ({ node, ...props }) => <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mt-3 mb-2" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mt-2 mb-2" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-base md:text-lg lg:text-xl font-semibold mt-2 mb-2" {...props} />,
    p: ({ node, ...props }) => <p className="text-sm md:text-base lg:text-base leading-6 mb-2" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc ml-5 mb-2 space-y-1" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal ml-5 mb-2 space-y-1" {...props} />,
    li: ({ node, ...props }) => <li className="text-sm md:text-base lg:text-base" {...props} />,
    a: ({ node, ...props }) => <a className="underline text-blue-400" {...props} />,
    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 pl-4 italic text-gray-300 my-2" {...props} />,
    code: ({ inline, className, children, ...props }) =>
      inline ? (
        <code className="bg-gray-800 px-1 rounded text-xs" {...props}>
          {children}
        </code>
      ) : (
        <pre className="bg-gray-900 p-3 rounded overflow-auto text-sm" {...props}>
          <code>{children}</code>
        </pre>
      ),
  };

  return (
    <div className="w-full flex flex-col text-white overflow-x-hidden bg-gradient-to-b from-[#000000] to-[#191919] px-2 items-center">

      <motion.main 
       initial={{ filter: "blur(10px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{ duration: 0.4 }}
          className="min-h-[100dvh] max-w-4xl flex flex-col items-center text-center px-4 w-full mx-auto">
        <section className="w-full max-w-4xl mt-12 mx-auto">
          <div className="mb-6 w-44 md:w-54 lg:w-60 items-center mx-auto">
            <img
              src="/briefly_png.png"
              alt="Briefly Logo"
              className="mx-auto mb-2 md:mb-4 hover:drop-shadow-[0_0_4rem_rgba(255,249,85,1)] transition duration-300"
            />
          </div>

          <div className="flex items-center w-full gap-3">
            <div className={`relative flex-1 ${heightClasses}`}>
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Paste a YT Link..."
                className={`w-full ${heightClasses} pr-14 md:pr-16 lg:pr-20 bg-[#0b0b0b] border border-gray-800 rounded-xl px-4 text-sm placeholder:text-gray-500 outline-none focus:ring-1 focus:ring-[hsl(56,100%,50%)] transition`}
                aria-label="YouTube link"
              />

              <button
                onClick={handlePasteFromClipboard}
                className={`absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2 bg-[#252525] border border-gray-800 rounded-lg ${pasteBtnSize} px-2 text-xs`}
                title="Paste from clipboard"
                type="button"
              >
                <Clipboard className="w-3 h-3 md:w-4 md:h-4 lg:w-4 lg:h-4" />
                <span className="hidden md:inline-block text-xs md:text-[0.8rem] lg:text-[1rem]">{loadingPaste ? "Pasting" : "Paste"}</span>
              </button>
            </div>

            <button
              onClick={handleGenerateSummary}
              disabled={loadingSummary}
              className={`ml-0 ${btnWidthClasses} ${heightClasses} flex items-center justify-center rounded-xl font-medium text-sm text-black bg-[hsl(56,100%,50%)] hover:scale-[1.04] transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed md:text-lg cursor-pointer`}
            >
              {loadingSummary ? "Summarizing..." : "Summarize"}
            </button>
          </div>
        </section>

        {/* Export & Summary */}
        <section className="w-full max-w-4xl mt-4 mx-auto">
          <div className="flex justify-end">
            <button
              onClick={handleExportPDF}
              disabled={!summary}
              className={`${btnWidthClasses} ${heightClasses} flex items-center justify-center px-4 py-2 rounded-xl font-medium text-[0.75rem] ${
                summary ? "bg-[hsl(56,100%,50%)] text-black md:text-[1rem] hover:scale-[1.04] transition duration-200 cursor-pointer" : "bg-gray-700 text-gray-300 cursor-not-allowed md:text-[1rem]"
              }`}
            >
              Export PDF
            </button>
          </div>

          {/* Summary container: expanded when summary exists */}
          <div
            className={`mt-4 w-full overflow-hidden transition-all duration-500 ${
              summary ? "px-6 py-8 bg-[#070707] border border-gray-800 rounded-md mb-4" : "max-h-0 p-0"
            }`}
          >
            <div ref={summaryRef} className={`${summary ? "block" : "hidden"}`}>
              {error && <p className="text-red-400 mb-4">{error}</p>}

              {/* Styled markdown rendering (h1/h2/ul/ol/ etc) */}
              <div className="text-left">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                  {summary}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </section>
      </motion.main>
    </div>
  );
};

export default Homepage;
