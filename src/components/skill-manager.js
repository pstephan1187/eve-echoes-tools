import React, { useState } from 'react';
import { useSkills } from '../Skills';

export const useSkillManager = () => {
  const [skillManagerIsVisible, setSkillManagerVisibility] = useState(false);

  const openSkillManager = () => setSkillManagerVisibility(true);
  const closeSkillManager = () => setSkillManagerVisibility(false);

  const SkillManager = () => {
    const { skills, setSkillLevel } = useSkills();

    if (!skillManagerIsVisible) {
      return null;
    }


    return (
      <div className="fixed z-50 flex justify-center items-center inset-0">
        <div className="fixed z-0 w-full h-full bg-gray-700 opacity-75" onClick={closeSkillManager}></div>
        <div className="relative z-10 bg-white rounded-md overflow-hidden shadow-md w-3/4 md:w-1/2 lg:w-1/3 max-h-screen overflow-y-auto">
          <h3 className="text-xl mb-4 py-2 px-4 bg-gray-200">Skills</h3>
          {skills.map(skill => {
            return (
              <div className="flex px-4">
                <div className="flex-auto w-32 whitespace-no-wrap pr-4 truncate">{skill.label}</div>
                <div className="relative flex-none w-24 py-1">
                  <select
                    // block leading-tight focus:outline-none focus:bg-white focus:border-gray-500
                    className="appearance-none w-24 bg-gray-200 rounded-sm shadow-inner px-1 pr-5 mr-1"
                    type="text"
                    value={skill.characterLevel}
                    onChange={(e) => setSkillLevel(skill.label, e.target.value * 1)}
                  >
                    <option value={0}>None</option>
                    <option value={1}>Level 1</option>
                    <option value={2}>Level 2</option>
                    <option value={3}>Level 3</option>
                    <option value={4}>Level 4</option>
                    <option value={5}>Level 5</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-end p-4">
            <button className="bg-blue-600 text-blue-100 py-1 px-2 rounded" onClick={closeSkillManager}>Done</button>
          </div>
        </div>
      </div>
    );
  }

  return { SkillManager, openSkillManager, closeSkillManager };
}
