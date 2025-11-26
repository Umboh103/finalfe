import { Users, Shield, Sword, Zap, Target, Crosshair, Heart } from "lucide-react";

const CardInfo = ({ heroes }) => {
    const stats = {
        total: heroes.length,
        tanks: heroes.filter(h => h.role === "Tank").length,
        fighters: heroes.filter(h => h.role === "Fighter").length,
        assassins: heroes.filter(h => h.role === "Assassin").length,
        mages: heroes.filter(h => h.role === "Mage").length,
        marksmen: heroes.filter(h => h.role === "Marksman").length,
        supports: heroes.filter(h => h.role === "Support").length,
    };

    const infoCards = [
        {
            icon: Users,
            label: "Total Heroes",
            value: stats.total,
            gradient: "from-blue-600 to-cyan-600",
            bgGradient: "from-blue-900/40 to-cyan-900/40",
            borderColor: "border-blue-500/50",
            iconBg: "bg-blue-600/30",
        },
        {
            icon: Shield,
            label: "Tank Heroes",
            value: stats.tanks,
            gradient: "from-green-600 to-emerald-600",
            bgGradient: "from-green-900/40 to-emerald-900/40",
            borderColor: "border-green-500/50",
            iconBg: "bg-green-600/30",
        },
        {
            icon: Sword,
            label: "Fighter Heroes",
            value: stats.fighters,
            gradient: "from-red-600 to-orange-600",
            bgGradient: "from-red-900/40 to-orange-900/40",
            borderColor: "border-red-500/50",
            iconBg: "bg-red-600/30",
        },
        {
            icon: Target,
            label: "Assassin Heroes",
            value: stats.assassins,
            gradient: "from-violet-600 to-indigo-600",
            bgGradient: "from-violet-900/40 to-indigo-900/40",
            borderColor: "border-violet-500/50",
            iconBg: "bg-violet-600/30",
        },
        {
            icon: Zap,
            label: "Mage Heroes",
            value: stats.mages,
            gradient: "from-purple-600 to-pink-600",
            bgGradient: "from-purple-900/40 to-pink-900/40",
            borderColor: "border-purple-500/50",
            iconBg: "bg-purple-600/30",
        },
        {
            icon: Crosshair,
            label: "Marksman Heroes",
            value: stats.marksmen,
            gradient: "from-amber-600 to-yellow-600",
            bgGradient: "from-amber-900/40 to-yellow-900/40",
            borderColor: "border-amber-500/50",
            iconBg: "bg-amber-600/30",
        },
        {
            icon: Heart,
            label: "Support Heroes",
            value: stats.supports,
            gradient: "from-rose-600 to-pink-600",
            bgGradient: "from-rose-900/40 to-pink-900/40",
            borderColor: "border-rose-500/50",
            iconBg: "bg-rose-600/30",
        },
    ];

    return (
        <div className="mb-8 animate-fadeIn">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                {infoCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={index}
                            className={`group relative overflow-hidden border-2 ${card.borderColor} rounded-2xl p-6 bg-gradient-to-br ${card.bgGradient} backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-xl`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className={`p-3 ${card.iconBg} rounded-xl mb-3`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <p className={`text-3xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent mb-1`}>
                                    {card.value}
                                </p>
                                <p className="text-slate-400 text-sm font-medium">{card.label}</p>
                            </div>

                            <div className={`absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-r ${card.gradient} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CardInfo;
