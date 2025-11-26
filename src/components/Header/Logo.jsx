import { Sword } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="relative">
        <Sword className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-all duration-300 group-hover:rotate-12" />
        <div className="absolute inset-0 blur-md bg-blue-500 opacity-50 group-hover:opacity-75 transition-opacity"></div>
      </div>
      <span className="text-3xl font-extrabold gradient-text drop-shadow-lg tracking-tight">
        ML Heroes
      </span>
    </div>
  );
};
export default Logo;