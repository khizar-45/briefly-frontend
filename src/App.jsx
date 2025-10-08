import { Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import { Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <>
      <Analytics />
      <SpeedInsights />

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/summarize" element={<Homepage />} />
    </Routes>
    </>
  );
}

export default App;
