// Login.jsx

"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react'; // Assuming you have lucide-react or a similar icon library for modern icons

// If you don't have lucide-react, you can replace the icon components with the SVG paths provided later.

function Login() {
  const [email, setEmail] = useState("salma@gmail.com")
  const [password, setPassword] = useState("••••••••")
  const [selectedRole, setSelectedRole] = useState("Startup") // Pre-select a role for demo

  const roles = [
    {
      name: "Startup",
      description: "Publier et gérer votre entreprise.",
    },
    {
      name: "Investisseur",
      description: "Accéder aux dossiers et investir.",
    },
    {
      name: "Admin",
      description: "Gestion complète de la plateforme.",
    },
    {
      name: "Visiteur",
      description: "Consultation seule (anonyme).",
    },
  ]

  const primaryColor = "#017679"
  const primaryColorDark = "#015557"
  const lightBgColor = "#FFF2EE"
  const linkColor = "#E3997E" // Original light orange/pink for the link

  // Function to handle form submission (placeholder)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Attempting login with:", { email, selectedRole });
    // Add your actual login logic here
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: lightBgColor }}>
      <div className="max-w-md w-full">
        
        {/* --- Tab Navigation (Bolder and cleaner) --- */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl overflow-hidden shadow-lg">
            <Link
              to="/login"
              className="px-8 py-3 bg-white text-gray-800 font-bold text-base transition-all duration-300"
              style={{ backgroundColor: primaryColor, color: 'white', boxShadow: `inset 0 0 0 4px ${primaryColor}` }}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-gray-700 font-medium text-base hover:bg-gray-100 transition-colors duration-300"
            >
              Inscription
            </Link>
          </div>
        </div>

        {/* --- Main Card (Elevated Look) --- */}
        <div 
            className="bg-white rounded-2xl p-10 shadow-[0_20px_50px_rgba(1,118,121,0.15)] border border-gray-100/70 transform hover:shadow-[0_25px_60px_rgba(1,118,121,0.2)] transition-all duration-500"
        >
          <h2 className="text-3xl font-extrabold text-center mb-10" style={{ color: primaryColor }}>
            Connectez-vous
          </h2>

          <form className="space-y-7" onSubmit={handleSubmit}>
            
            {/* --- Email Input (Modern Look) --- */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="salma@gmail.com"
                  className="w-full pl-12 pr-4 py-3 border-b-2 border-gray-300 focus:border-b-2 focus:border-b-transparent rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-100 transition-all duration-300"
                  style={{ borderRadius: '8px', borderBottomColor: primaryColor }}
                />
              </div>
            </div>

            {/* --- Password Input (Modern Look) --- */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 border-b-2 border-gray-300 focus:border-b-2 focus:border-b-transparent rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-100 transition-all duration-300"
                  style={{ borderRadius: '8px', borderBottomColor: primaryColor }}
                />
              </div>
            </div>

            {/* --- Role Selection (Interactive and Vivid) --- */}
            <div className="pt-2">
              <label className="block text-sm font-semibold text-gray-700 mb-4">Sélectionner votre Rôle</label>
              <div className="space-y-3">
                {roles.map((role) => (
                  <div
                    key={role.name}
                    onClick={() => setSelectedRole(role.name)}
                    className={`p-4 border-2 rounded-xl cursor-pointer flex items-center justify-between transition-all duration-300 hover:shadow-md ${
                      selectedRole === role.name
                        ? "border-teal-500 bg-teal-50 shadow-lg"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-base text-gray-900">{role.name}</div>
                      <div className="text-sm text-gray-600 mt-0.5">{role.description}</div>
                    </div>
                    {/* Visual indicator (Checkmark) */}
                    {selectedRole === role.name ? (
                      <CheckCircle className="w-6 h-6" style={{ color: primaryColor }} fill={primaryColor} />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-gray-50"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* --- Submit Button (Big and Bold) --- */}
            <button
              type="submit"
              className="w-full text-white py-4 rounded-xl font-extrabold text-xl flex items-center justify-center space-x-3 transition-all duration-300 transform active:scale-[0.98] shadow-xl hover:shadow-2xl"
              style={{ 
                backgroundColor: primaryColor, 
                boxShadow: `0 10px 20px -5px ${primaryColor}50`, // Subtle color-matched shadow
                marginTop: '30px'
              }}
            >
              <ArrowRight className="w-6 h-6" strokeWidth={3} />
              <span>Se connecter</span>
            </button>

            {/* --- Sign Up Link --- */}
            <div className="text-center text-md pt-2">
              <span className="text-gray-600">Pas encore de compte ? </span>
              <Link to="/register" className="font-bold hover:underline" style={{ color: linkColor }}>
                Créez-en un ici
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login