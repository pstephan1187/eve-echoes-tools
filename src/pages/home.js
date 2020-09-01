import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <p className="mb-4">This is a set of tools that I have put together to help me progress through the Eve Echoes universe. I am sharing them here to help anyone else who might find them valuable. Current tools available:</p>

      <ul className="mb-4 ml-4 list-disc">
        <li><Link className="font-bold text-blue-700 underline hover:text-blue-800" to="/ores">Ore Value by volume calculations</Link> to help determine which ore will produce the most value <strong>per haul</strong> if you sell the ore directly on the market</li>
      </ul>

      <p className="mb-4">If you would like to contribute to this set of tools, you can do so here: <a className="text-blue-700 underline" target="blank" rel="noreferer noopener" href="https://github.com/pstephan1187/eve-echoes-tools">Github</a></p>
    </div>
  );
}
