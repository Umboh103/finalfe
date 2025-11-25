import { Link } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="border-b border-slate-700 bg-slate-800 shadow-xl shadow-slate-950/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <nav className="flex gap-6">
            <Link to="/" className="text-blue-300 hover:text-blue-500 hover:underline underline-offset-4 transition-colors text-lg">
              Home
            </Link>
            <Link to="/admin" className="text-blue-300 hover:text-blue-500 hover:underline underline-offset-4 transition-colors text-lg">
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Header;