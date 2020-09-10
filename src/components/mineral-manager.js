import React from 'react';
import { useMinerals } from '../stores/minerals';

export default ({ onClose }) => {
  const { minerals, setMineralValue, resetMineralValue } = useMinerals();

  return (
    <div key="mineral-manager" className="fixed z-50 flex justify-center items-center inset-0">
      <div className="fixed z-0 w-full h-full bg-gray-700 opacity-75" onClick={onClose}></div>
      <div className="relative z-10 bg-white rounded-md overflow-hidden shadow-md w-3/4 md:w-1/2 lg:w-1/3 max-h-screen overflow-y-auto">
        <h3 className="text-xl mb-4 py-2 px-4 bg-gray-200">Minerals</h3>
        {minerals.map(mineral => (
          <div key={mineral.label} className="flex px-4">
            <div className="flex-none w-32 whitespace-no-wrap pr-4">{mineral.label}</div>
            <div className="flex-auto whitespace-no-wrap text-right py-1">
              <input
                className="w-16 bg-gray-200 rounded-sm shadow-inner text-right px-1 mr-1"
                type="text"
                value={mineral.value}
                onChange={(e) => setMineralValue(mineral, e.target.value)}
                onBlur={(e) => resetMineralValue(mineral, e.target.value)}
              />
                isk/unit
              </div>
          </div>
        ))}
        <div className="flex justify-end p-4">
          <button className="bg-blue-600 text-blue-100 py-1 px-2 rounded" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
