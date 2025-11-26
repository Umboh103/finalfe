import React from "react";
import { Shield, Swords, Zap, Wand2, Target, Heart } from "lucide-react";

export const HERO_ROLES = [
  "Tank",
  "Fighter",
  "Assassin",
  "Mage",
  "Marksman",
  "Support",
];

const roleIcons = {
  Tank: Shield,
  Fighter: Swords,
  Assassin: Zap,
  Mage: Wand2,
  Marksman: Target,
  Support: Heart,
};

const Generations = ({ selectedRole, onSelectRole }) => {
  return (
    <div className="glass rounded-2xl p-6 mb-8 animate-fadeIn">
      <div className="flex flex-wrap justify-center gap-3">
        {/* All Button */}
        <button
          onClick={() => onSelectRole("All")}
          className={`btn-ripple px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border-2 tracking-wider flex items-center gap-2 ${selectedRole === "All"
              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white border-blue-400 shadow-lg glow-blue scale-105"
              : "bg-slate-800/80 text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-blue-300 hover:border-blue-500/50 hover:scale-105"
            }`}
        >
          <span className="text-lg">⚡</span>
          ALL HEROES
        </button>

        {/* Role Buttons */}
        {HERO_ROLES.map((role) => {
          const Icon = roleIcons[role];
          return (
            <button
              key={role}
              onClick={() => onSelectRole(role)}
              className={`btn-ripple px-5 py-3 rounded-full text-sm font-bold transition-all duration-300 border-2 tracking-wider flex items-center gap-2 ${selectedRole === role
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-400 shadow-lg glow-purple scale-105"
                  : "bg-slate-800/80 text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-purple-300 hover:border-purple-500/50 hover:scale-105"
                }`}
            >
              <Icon className="w-4 h-4" />
              {role.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Generations;