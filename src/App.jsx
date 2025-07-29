function App() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-black text-white overflow-x-hidden">
      <nav className="h-25 w-full flex justify-between items-center px-10 py-4 bg-black shadow-lg">
        <div className="flex gap-4 items-center">
          <img
            src="/brieflyLogoPng.png"
            alt="Briefly Logo"
            className="w-12 h-12"
          />
        <h1 className="text-3xl font-bold text-white">Briefly</h1>
        </div>
        <div className="flex gap-4">
          <a
            href="https://github.com/khizar-45"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[hsl(56,100%,50%)] text-black rounded-lg font-semibold hover:brightness-125 transition"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/khizar45"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[hsl(56,100%,50%)] text-black rounded-lg font-semibold hover:brightness-125 transition"
          >
            LinkedIn
          </a>
        </div>
      </nav>

      <main className="w-full flex-1 flex flex-col justify-center items-center text-center px-4">
        <img
          src="/brieflyLogoPng.png"
          alt="Briefly Logo"
          className="w-64 mb-8 animate-pulse hover:drop-shadow-[0_0_4rem_#fff9559e] transition duration-300"
        />

        <p className="text-xl md:text-xl font-bold mb-2">
        Website Under Construction
        </p>
        <p className="text-lg text-gray-400 max-w-xl">
          We are working hard to bring you something amazing!<br />
          Stay tuned for updates.
        </p>
      </main>

      <footer className="w-full text-center py-4 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Briefly. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
