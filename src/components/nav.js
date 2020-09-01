import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="bg-gray-300">
      <div className="container mx-auto flex justify-between items-center px-2">
        <h1 className="color-gray-800 text-2xl px-2 py-2">Eve Echoes Utilities</h1>
        <div>
          <Link className="px-2 py-2 hover:bg-gray-400" to="/">Home</Link>
          <Link className="px-2 py-2 hover:bg-gray-400" to="/ores">Ores</Link>
        </div>
      </div>
    </nav>
  );
}
