import React from "react";
import { Link } from "react-router-dom";
import { toUniversalTime } from '../utils';

export default function Home() {
  const roadmap = [
    { label: 'Skill Levels', description: 'Calculate ore reprocessing rates with skill levels', completedOn: toUniversalTime(2020, 9, 9, 23, 0) },
    { label: 'Add Mining Speed', description: 'Include mining speed in ore calculator', completedOn: null },
    { label: 'Mining Targets', description: 'Determine which ores are best to mine based on the desired minerals', completedOn: null },
    { label: 'Manufacturing Calculator', description: 'Determine which ores to mine and calculate how much it will cost to manufacture a ship', completedOn: null },
  ];
  return (
    <div>
      <h2 className="mb-4 text-2xl">Current Tools</h2>

      <p className="mb-4">This is a set of tools that I have put together to help me progress through the Eve Echoes universe. I am sharing them here to help anyone else who might find them valuable. Current tools available:</p>

      <ul className="mb-4 ml-4 list-disc">
        <li><Link className="font-bold text-blue-700 underline hover:text-blue-800" to="/ores">Ore Value by volume calculations</Link> to help determine which ore will produce the most value <strong>per haul</strong> if you sell the ore directly on the market, or if you sold the reprocessed minerals directly on the market. Includes the ability to set your skill levels and hold size and override the market values of the ores and minerals.</li>
      </ul>

      <h2 className="mb-4 text-2xl">Roadmap</h2>

      <p className="mb-4">These are the features and tools that are planned to be added (in no particular order):</p>

      <ul className="mb-4 ml-4 list-disc">
        {roadmap.map(entry => (
          <li key={entry.label}>
            <span className={entry.completedOn ? 'line-through' : ''}>
              <strong>{entry.label}: </strong>
              {entry.description}
            </span>

            {entry.completedOn && (
              <span className="font-bold"> Completed on {entry.completedOn.toLocaleDateString()}</span>
            )}
          </li>
        )) }
      </ul>

      <h2 className="mb-4 text-2xl">Contributing</h2>

      <p className="mb-4">If you would like to contribute to this set of tools, you can do so here: <a className="text-blue-700 underline" target="blank" rel="noreferer noopener" href="https://github.com/pstephan1187/eve-echoes-tools">Github</a></p>
    </div>
  );
}
