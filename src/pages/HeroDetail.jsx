import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ArrowLeft, Loader2 } from "lucide-react";

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
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!hero) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-slate-400 text-lg">Hero not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 px-5 py-2 border border-slate-600 bg-slate-700
                   rounded-lg hover:bg-slate-600 transition-colors text-blue-300
                   shadow-md hover:shadow-lg hover:shadow-blue-500/20 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Heroes
      </button>
      <div className="max-w-4xl mx-auto bg-slate-800 rounded-2xl shadow-xl shadow-slate-950/50 overflow-hidden border border-blue-700">
        <img
          src={hero.image || "https://images.unsplash.com/photo-1614294148723-81f33961ed1e?w=800&h=500&fit=crop"}
          alt={hero.name}
          className="w-full h-80 object-cover object-top filter brightness-75 contrast-125"
        />
        <div className="p-8">
          <h1 className="text-4xl font-extrabold mb-6 text-blue-400 drop-shadow-lg">{hero.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-purple-700 rounded-xl p-6 bg-purple-900/30">
              <p className="text-sm text-purple-300 mb-2 font-light">Role</p>
              <p className="font-bold text-2xl text-purple-400">{hero.role}</p>
            </div>
            <div className="border border-green-700 rounded-xl p-6 bg-green-900/30">
              <p className="text-sm text-green-300 mb-2 font-light">Specialty</p>
              <p className="font-bold text-2xl text-green-400">{hero.specialty}</p>
            </div>
            <div className="col-span-1 md:col-span-2 border border-blue-700 rounded-xl p-6 bg-blue-900/30">
              <p className="text-sm text-blue-300 mb-2 font-light">Difficulty</p>
              <p className="font-bold text-2xl text-blue-400">{hero.difficulty}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroDetail;