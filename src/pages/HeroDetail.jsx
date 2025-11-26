import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Shield, Sparkles, Zap } from "lucide-react";

const HeroDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHero();
  }, [id]);

  const fetchHero = async () => {
    try {
      const response = await fetch(`http://localhost:3000/heroes/${id}`);
      const data = await response.json();
      setHero(data);
    } catch (error) {
      console.error("Error fetching hero:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-16 h-16 animate-spin text-blue-500 mb-4" />
        <p className="text-slate-400 text-lg">Loading hero details...</p>
      </div>
    );
  }

  if (!hero) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-slate-400 text-xl">Hero not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">

      <button
        onClick={() => navigate("/")}
        className="group flex items-center gap-2 px-6 py-3 glass border-2 border-slate-600
                   rounded-xl hover:border-blue-500 transition-all duration-300 text-blue-300
                   shadow-lg hover:shadow-xl hover:shadow-blue-500/20 mb-8 hover:scale-105"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="font-semibold">Back to Heroes</span>
      </button>


      <div className="max-w-5xl mx-auto glass-strong rounded-3xl shadow-2xl shadow-slate-950/50 overflow-hidden border-2 border-blue-700/50 animate-scaleIn">

        <div className="relative overflow-hidden h-96 group">
          <img
            src={hero.image || "https://images.unsplash.com/photo-1614294148723-81f33961ed1e?w=800&h=500&fit=crop"}
            alt={hero.name}
            className="w-full h-full object-cover object-top filter brightness-90 contrast-125 group-hover:scale-110 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>


          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-5xl md:text-6xl font-extrabold gradient-text drop-shadow-2xl mb-2 animate-slideUp">
              {hero.name}
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>


          <Sparkles className="absolute top-8 right-8 w-8 h-8 text-yellow-400 animate-float" />
          <Sparkles className="absolute top-20 right-20 w-6 h-6 text-blue-400 animate-float delay-200" />
        </div>


        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="group relative overflow-hidden border-2 border-purple-700/50 rounded-2xl p-6 bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-sm hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-purple-600/30 rounded-xl">
                  <Shield className="w-6 h-6 text-purple-300" />
                </div>
                <p className="text-sm text-purple-300 font-semibold uppercase tracking-wider">Role</p>
              </div>
              <p className="font-bold text-3xl text-purple-200">{hero.role}</p>


              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            </div>


            <div className="group relative overflow-hidden border-2 border-green-700/50 rounded-2xl p-6 bg-gradient-to-br from-green-900/40 to-green-800/20 backdrop-blur-sm hover:border-green-500 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/20">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-green-600/30 rounded-xl">
                  <Sparkles className="w-6 h-6 text-green-300" />
                </div>
                <p className="text-sm text-green-300 font-semibold uppercase tracking-wider">Specialty</p>
              </div>
              <p className="font-bold text-3xl text-green-200">{hero.specialty}</p>


              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-green-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            </div>


            <div className="group relative overflow-hidden col-span-1 md:col-span-2 border-2 border-blue-700/50 rounded-2xl p-6 bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-sm hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-blue-600/30 rounded-xl">
                  <Zap className="w-6 h-6 text-blue-300" />
                </div>
                <p className="text-sm text-blue-300 font-semibold uppercase tracking-wider">Difficulty</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-bold text-3xl text-blue-200">{hero.difficulty}</p>


                <div className="flex-1 flex gap-2">
                  {["Easy", "Medium", "Hard"].map((level, index) => (
                    <div
                      key={level}
                      className={`h-2 flex-1 rounded-full transition-all duration-500 ${(hero.difficulty === "Easy" && index === 0) ||
                        (hero.difficulty === "Medium" && index <= 1) ||
                        (hero.difficulty === "Hard" && index <= 2)
                        ? "bg-gradient-to-r from-blue-500 to-purple-500"
                        : "bg-slate-700"
                        }`}
                    ></div>
                  ))}
                </div>
              </div>


              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroDetail;