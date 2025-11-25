import React from "react";

export const HERO_ROLES = [
  "Tank",
  "Fighter",
  "Assassin",
  "Mage",
  "Marksman",
  "Support",
];

const Generations = ({ selectedRole, onSelectRole }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 py-4 bg-slate-900/50 rounded-xl backdrop-blur-sm border border-slate-800/50 mb-8">
 
      <button
        onClick={() => onSelectRole("All")}
        className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border tracking-wider
          ${
            selectedRole === "All"
              ? "bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
              : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-blue-300 hover:border-blue-500/50"
          }`}
      >
        ALL
      </button>

     
      {HERO_ROLES.map((role) => (
        <button
          key={role}
          onClick={() => onSelectRole(role)}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border tracking-wider
            ${
              selectedRole === role
                ? "bg-purple-600 text-white border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.5)]"
                : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-purple-300 hover:border-purple-500/50"
            }`}
        >
          {role.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default Generations;