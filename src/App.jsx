import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Transactions from "./components/Transactions";
import Stats from "./components/Statistics";
import { ThemeProvider, ThemeContext } from "./components/ThemeContext";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`flex ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Sidebar />
      <div className="w-11/12 p-8">
        <button
          onClick={toggleTheme}
          className="mb-4 px-4 py-2 rounded bg-indigo-500 text-white"
        >
          Toggle {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
        <Routes>
          <Route path="/" element={<Transactions />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <ThemeProvider>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  );
}
