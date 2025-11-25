import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Generations from "../Header/Generations/Generations";

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
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
                    Mobile Legends Heroes
                </h1>
                <p className="text-slate-400 text-lg">
                    Explore and discover all heroes from the Land of Dawn
                </p>
            </div>

            {/* Role Filter */}
            <Generations selectedRole={selectedRole} onSelectRole={setSelectedRole} />

            {/* Heroes Grid */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
                </div>
            ) : (
                <>
                    <div className="text-center mb-6">
                        <p className="text-slate-400 text-sm">
                            Showing {filteredHeroes.length} {selectedRole === "All" ? "heroes" : `${selectedRole} heroes`}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredHeroes.map((hero) => (
                            <Link
                                key={hero.id}
                                to={`/hero/${hero.id}`}
                                className="group bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2"
                            >
                                {hero.image && (
                                    <div className="relative overflow-hidden aspect-square">
                                        <img
                                            src={hero.image}
                                            alt={hero.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                                    </div>
                                )}
                                <div className="p-4">
                                    <h3 className="text-xl font-bold text-blue-300 mb-2 group-hover:text-blue-400 transition-colors">
                                        {hero.name}
                                    </h3>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full border border-purple-500/50">
                                            {hero.role}
                                        </span>
                                        <span className="text-slate-400">{hero.difficulty}</span>
                                    </div>
                                    {hero.specialty && (
                                        <p className="text-slate-500 text-xs mt-2 line-clamp-1">
                                            {hero.specialty}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                    {filteredHeroes.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-400 text-lg">
                                No heroes found for {selectedRole} role
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
