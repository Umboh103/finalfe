import { useState, useEffect } from "react";
import { Loader2, Edit, Trash2, Plus, Lock, CheckCircle, XCircle, Shield } from "lucide-react";
import { HERO_ROLES } from "../components/Header/Generations/Generations";

const ADMIN_PASSWORD = "mobilelegends2025";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    specialty: "",
    difficulty: "",
    image: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchHeroes();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const showMessage = (text, type) => {
    setMessage({ text, type });
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      showMessage("Access Granted - Welcome to Admin Panel", "success");
    } else {
      showMessage("Access Denied - Incorrect password", "error");
    }
  };

  const fetchHeroes = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/heroes");
      const data = await response.json();
      setHeroes(data);
    } catch (error) {
      showMessage("Failed to fetch heroes", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await fetch(`http://localhost:3000/heroes/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        showMessage("Hero updated successfully", "success");
      } else {
        await fetch("http://localhost:3000/heroes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        showMessage("Hero created successfully", "success");
      }
      resetForm();
      fetchHeroes();
    } catch (error) {
      showMessage("Operation failed", "error");
    }
  };

  const handleEdit = (hero) => {
    setEditingId(hero.id);
    setFormData({
      name: hero.name,
      role: hero.role,
      specialty: hero.specialty,
      difficulty: hero.difficulty,
      image: hero.image || "",
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this hero?")) return;
    try {
      await fetch(`http://localhost:3000/heroes/${id}`, {
        method: "DELETE",
      });
      showMessage("Hero deleted successfully", "success");
      fetchHeroes();
    } catch (error) {
      showMessage("Failed to delete hero", "error");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", role: "", specialty: "", difficulty: "", image: "" });
    setEditingId(null);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full glass-strong rounded-3xl shadow-2xl shadow-slate-950/50 p-10 border-2 border-blue-700/50 animate-scaleIn">
          {/* Lock Icon with Animation */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <Lock className="w-16 h-16 text-blue-400 animate-float" />
              <div className="absolute inset-0 blur-xl bg-blue-500 opacity-50"></div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-2 gradient-text text-center">Admin Access</h2>
          <p className="text-slate-400 text-center mb-8">Enter password to continue</p>

          <div className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border-2 border-blue-600/50 bg-slate-800/50 text-slate-100 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                         shadow-inner transition-all duration-300 placeholder:text-slate-500"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl 
                       hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg 
                       hover:shadow-xl hover:shadow-blue-500/30 font-semibold text-lg btn-ripple
                       hover:scale-105"
            >
              Login
            </button>

            <p className="text-xs text-slate-500 text-center bg-slate-800/50 py-2 px-4 rounded-lg">
              💡 Hint: mobilelegends2025
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Admin Panel
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Toast Notification */}
      {message && (
        <div className={`fixed top-24 right-4 z-50 animate-slideInRight ${message.type === "success" ? "bg-gradient-to-r from-green-600 to-green-500" : "bg-gradient-to-r from-red-600 to-red-500"
          } text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[300px]`}>
          {message.type === "success" ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <XCircle className="w-6 h-6" />
          )}
          <span className="font-semibold">{message.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-10 animate-fadeIn">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Shield className="w-10 h-10 text-blue-400 animate-float" />
          <h1 className="text-5xl font-extrabold gradient-text drop-shadow-xl tracking-wide">
            Admin Panel
          </h1>
        </div>
        <p className="text-slate-400 text-lg">Manage your Mobile Legends heroes</p>
        <div className="mt-4 h-1 w-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="glass-strong rounded-3xl shadow-2xl shadow-slate-950/50 p-8 border-2 border-blue-700/50 animate-slideUp">
          <div className="flex items-center gap-3 text-2xl font-semibold mb-8 text-blue-300">
            {editingId ? (
              <>
                <Edit className="w-7 h-7 text-blue-400" />
                Edit Hero
              </>
            ) : (
              <>
                <Plus className="w-7 h-7 text-green-400" />
                Add New Hero
              </>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Hero Name</label>
              <input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="e.g., Layla"
                className="w-full px-4 py-3 border-2 border-blue-600/50 bg-slate-800/50 text-slate-100 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-300 placeholder:text-slate-500"
              />
            </div>

            {/* Role Select */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Role</label>
              <div className="relative">
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 text-slate-100 rounded-xl border-2 border-blue-600/50 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           appearance-none cursor-pointer transition-all duration-300"
                >
                  <option value="" disabled>Select Hero Role</option>
                  {HERO_ROLES.map((role) => (
                    <option key={role} value={role} className="bg-slate-800">
                      {role}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Specialty Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Specialty</label>
              <input
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                required
                placeholder="e.g., Burst Damage"
                className="w-full px-4 py-3 border-2 border-blue-600/50 bg-slate-800/50 text-slate-100 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-300 placeholder:text-slate-500"
              />
            </div>

            {/* Difficulty Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                required
                className="w-full px-4 py-3 bg-slate-800/50 text-slate-100 rounded-xl border-2 border-blue-600/50 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         appearance-none cursor-pointer transition-all duration-300"
              >
                <option value="" disabled>Select Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Image URL Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Image URL</label>
              <input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border-2 border-blue-600/50 bg-slate-800/50 text-slate-100 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-300 placeholder:text-slate-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl 
                         hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg 
                         hover:shadow-xl hover:shadow-blue-500/30 font-semibold btn-ripple hover:scale-105"
              >
                {editingId ? "Update Hero" : "Create Hero"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 bg-slate-700 text-slate-300 py-3 rounded-xl hover:bg-slate-600 
                           transition-all duration-300 font-semibold hover:scale-105"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Heroes List Section */}
        <div className="glass-strong rounded-3xl shadow-2xl shadow-slate-950/50 p-8 border-2 border-purple-700/50 animate-slideUp delay-100">
          <h2 className="text-2xl font-semibold mb-8 text-purple-300 flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Heroes List ({heroes.length})
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
              <p className="text-slate-400">Loading heroes...</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {heroes.map((hero) => (
                <div
                  key={hero.id}
                  className="flex items-center gap-4 p-4 border-2 border-slate-700/50 rounded-xl 
                           bg-slate-800/30 hover:bg-slate-700/50 hover:border-blue-500/50 
                           transition-all duration-300 shadow-md hover:shadow-lg group"
                >
                  {hero.image && (
                    <img
                      src={hero.image}
                      alt={hero.name}
                      className="w-16 h-16 object-cover rounded-lg border-2 border-slate-600 
                               group-hover:border-blue-500 transition-all duration-300 group-hover:scale-110"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-blue-200 group-hover:text-blue-300 transition-colors">
                      {hero.name}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {hero.role} • {hero.difficulty}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(hero)}
                      className="p-3 text-blue-400 hover:text-blue-200 hover:bg-blue-900/30 
                               rounded-xl transition-all duration-300 hover:scale-110"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(hero.id)}
                      className="p-3 text-red-400 hover:text-red-200 hover:bg-red-900/30 
                               rounded-xl transition-all duration-300 hover:scale-110"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;