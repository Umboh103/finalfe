import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, Sparkles } from "lucide-react";
import Generations from "../Header/Generations/Generations";
import CardInfo from "./CardInfo/CardInfo";

const Home = () => {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRole, setSelectedRole] = useState("All");

    useEffect(() => {
        fetchHeroes();
    }, []);

    const fetchHeroes = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/heroes");
            const data = await response.json();
            setHeroes(data);
        } catch (error) {
            console.error("Failed to fetch heroes:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredHeroes =
        selectedRole === "All"
            ? heroes
            : heroes.filter((hero) => hero.role === selectedRole);

    return (

        <div className="container mx-auto px-4 py-8">

            <div className="text-center mb-12 animate-fadeIn">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Sparkles className="w-10 h-10 text-yellow-400 animate-float" />
                    <h1 className="text-5xl md:text-6xl font-extrabold gradient-text drop-shadow-2xl">
                        Mobile Legends Heroes
                    </h1>
                    <Sparkles className="w-10 h-10 text-yellow-400 animate-float delay-200" />
                </div>
                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                    Explore and discover all heroes from the Land of Dawn
                </p>
                <div className="mt-4 h-1 w-32 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
            </div>

            <CardInfo heroes={heroes} />
            <Generations selectedRole={selectedRole} onSelectRole={setSelectedRole} />


            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-16 h-16 animate-spin text-blue-500 mb-4" />
                    <p className="text-slate-400 text-lg">Loading heroes...</p>
                </div>
            ) : (
                <>
                    <div className="text-center mb-6 animate-fadeIn">
                        <p className="text-slate-400 text-sm font-medium">
                            Showing <span className="text-blue-400 font-bold">{filteredHeroes.length}</span> {selectedRole === "All" ? "heroes" : `${selectedRole} heroes`}
                        </p>
                    </div>

                    {filteredHeroes.length === 0 ? (
                        <div className="text-center py-20 animate-fadeIn">
                            <div className="mb-6">
                                <div className="text-6xl mb-4">🔍</div>
                                <p className="text-slate-400 text-xl font-medium">
                                    No heroes found for <span className="text-purple-400 font-bold">{selectedRole}</span> role
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredHeroes.map((hero, index) => (
                                <Link
                                    key={hero.id}
                                    to={`/hero/${hero.id}`}
                                    className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border-2 border-slate-700 hover:border-blue-500 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 card-hover animate-fadeIn"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >

                                    {hero.image && (
                                        <div className="relative overflow-hidden aspect-square">
                                            <img
                                                src={hero.image}
                                                alt={hero.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-70"></div>


                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                                            </div>
                                        </div>
                                    )}


                                    <div className="p-5">
                                        <h3 className="text-xl font-bold text-blue-300 mb-3 group-hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                                            {hero.name}
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">✨</span>
                                        </h3>

                                        <div className="flex items-center justify-between text-sm mb-3">
                                            <span className="px-3 py-1.5 bg-gradient-to-r from-purple-600/40 to-pink-600/40 text-purple-200 rounded-full border border-purple-500/50 font-semibold backdrop-blur-sm">
                                                {hero.role}
                                            </span>
                                            <span className="text-slate-400 font-medium">{hero.difficulty}</span>
                                        </div>

                                        {hero.specialty && (
                                            <p className="text-slate-500 text-xs line-clamp-1 italic">
                                                {hero.specialty}
                                            </p>
                                        )}
                                    </div>


                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl"></div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
