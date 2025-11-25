import { useState, useEffect } from "react";
import { Loader2, Edit, Trash2, Plus, Lock } from "lucide-react";

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

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-slate-800 rounded-xl shadow-xl shadow-slate-950/50 p-8 border border-blue-700">
         
           <div className="flex items-center justify-center gap-3 text-3xl font-bold mb-8 text-blue-400">
            <Lock className="w-8 h-8" />
            Admin Access
          </div>
          <div className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">Admin Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border border-blue-600 bg-slate-700 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-inner shadow-slate-900/50"
              />
            </div>
            <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl shadow-blue-500/30">Login</button>
             <p className="text-xs text-slate-400 text-center">Hint: mobilelegends2025</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {message && (
        <div className={`mb-6 p-4 rounded-lg text-lg font-semibold ${message.type === "success" ? "bg-green-700 text-green-100" : "bg-red-700 text-red-100"} shadow-md`}>
          {message.text}
        </div>
      )}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-4 text-blue-400 drop-shadow-xl shadow-blue-500/40 tracking-wide">Admin Panel</h1>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
     
        <div className="bg-slate-800 rounded-2xl shadow-xl shadow-slate-950/50 p-8 border border-blue-700">
          <div className="flex items-center gap-3 text-2xl font-semibold mb-8 text-blue-300">
            {editingId ? <Edit className="w-6 h-6 text-blue-400" /> : <Plus className="w-6 h-6 text-green-400" />}
            {editingId ? "Edit Hero" : "Add New Hero"}
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
              <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-3 border border-blue-600 bg-slate-700 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

         
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
              <div className="relative">
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-slate-700 text-slate-100 rounded-lg border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Hero Role</option>
                  {HERO_ROLES.map((role) => (
                    <option key={role} value={role} className="bg-slate-800">
                      {role}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Specialty</label>
              <input value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} required className="w-full px-4 py-3 border border-blue-600 bg-slate-700 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Difficulty</label>
              <input value={formData.difficulty} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })} required placeholder="e.g. Easy, Hard" className="w-full px-4 py-3 border border-blue-600 bg-slate-700 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Image URL</label>
              <input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." className="w-full px-4 py-3 border border-blue-600 bg-slate-700 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex gap-4">
              <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl shadow-blue-500/30">{editingId ? "Update Hero" : "Create Hero"}</button>
              {editingId && <button type="button" onClick={resetForm} className="px-6 bg-slate-700 text-slate-300 py-3 rounded-lg hover:bg-slate-600 transition-colors">Cancel</button>}
            </div>
          </form>
        </div>

        {/* List Heroes */}
        <div className="bg-slate-800 rounded-2xl shadow-xl shadow-slate-950/50 p-8 border border-purple-700">
          <h2 className="text-2xl font-semibold mb-8 text-purple-300">Heroes List ({heroes.length})</h2>
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="w-10 h-10 animate-spin text-blue-500" /></div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {heroes.map((hero) => (
                <div key={hero.id} className="flex items-center gap-4 p-4 border border-slate-700 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors shadow-md">
                  {hero.image && <img src={hero.image} alt={hero.name} className="w-16 h-16 object-cover rounded-md border border-slate-600" />}
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-blue-200">{hero.name}</h3>
                    <p className="text-sm text-slate-400">{hero.role} - {hero.difficulty}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(hero)} className="p-2 text-blue-400 hover:text-blue-200 hover:bg-blue-900/30 rounded-full"><Edit className="w-5 h-5" /></button>
                    <button onClick={() => handleDelete(hero.id)} className="p-2 text-red-400 hover:text-red-200 hover:bg-red-900/30 rounded-full"><Trash2 className="w-5 h-5" /></button>
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