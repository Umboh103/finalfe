import { Heart, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-700/50 glass mt-auto">
      <div className="container mx-auto px-4 py-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">

          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold gradient-text-blue mb-2">ML Heroes</h3>
            <p className="text-slate-400 text-sm">
              Your ultimate Mobile Legends hero database
            </p>
          </div>


          <div className="text-center">
            <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <a href="/" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                Home
              </a>
              <a href="/admin" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                Admin Panel
              </a>
            </div>
          </div>


          <div className="text-center md:text-right">
            <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Connect</h4>
            <div className="flex gap-3 justify-center md:justify-end">
              <a
                href="https://github.com/Umboh103/finalfe"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white 
                         rounded-lg transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>

            </div>
          </div>
        </div>


        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6"></div>


        <div className="text-center">
          <p className="text-sm text-slate-400 flex items-center justify-center gap-2">
            © 2024 Mobile Legends Heroes • Made with
            <Heart className="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" />
            by Pro player MLBB
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;