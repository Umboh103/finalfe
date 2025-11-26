import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center animate-fadeIn">

        <div className="mb-8 flex justify-center">
          <div className="relative">
            <AlertCircle className="w-32 h-32 text-blue-400 animate-float" />
            <div className="absolute inset-0 blur-2xl bg-blue-500 opacity-30"></div>
          </div>
        </div>


        <h1 className="mb-4 text-8xl font-extrabold gradient-text">404</h1>
        <p className="mb-2 text-2xl font-semibold text-slate-300">Oops! Page not found</p>
        <p className="mb-8 text-lg text-slate-400 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>


        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 
                   text-white rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 
                   shadow-lg hover:shadow-xl hover:shadow-blue-500/30 font-semibold text-lg btn-ripple
                   hover:scale-105"
        >
          <Home className="w-5 h-5" />
          Return to Home
        </Link>


        <div className="mt-12 flex justify-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;