// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-black text-white w-auto h-screen top-0 left-0 p-4">
      <img src="assets/roxiler.svg" alt="logo" />
      <h1 className="text-2xl font-bold mb-8">Roxiler Systems</h1>
      <ul>
        <li className="mb-4">
          <Link to="/" className="text-lg hover:text-gray-400">
            Transactions
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/stats" className="text-lg hover:text-gray-400">
            Statistics
          </Link>
        </li>
        <li className="mb-4">
          <a
            href="/assets/Abhishekh_RGIPT.pdf"
            className="text-lg hover:text-gray-400"
          >
            Resume
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
