"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState("")

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

  return (
    <div className="min-h-screen bg-[#FFF2EE] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg overflow-hidden">
            <Link to="/login" className="px-8 py-3 bg-[#017679] text-white font-medium text-sm">
              Connexion
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 bg-[#D9D9D9] text-gray-700 font-medium text-sm hover:bg-gray-400 transition-colors"
            >
              Inscription
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-[#017679] text-center mb-8">Connectez-vous</h2>

          <form className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Adresse Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="salma@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#017679] text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#017679] text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Sélectionner votre Rôle</label>
              <div className="space-y-2.5">
                {roles.map((role) => (
                  <div
                    key={role.name}
                    onClick={() => setSelectedRole(role.name)}
                    className={`p-3.5 border rounded-lg cursor-pointer transition-all ${
                      selectedRole === role.name
                        ? "border-[#017679] bg-[#017679]/5"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="font-semibold text-gray-900 text-sm">{role.name}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{role.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#017679] hover:bg-[#015557] text-white py-2.5 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors text-sm mt-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span>Se connecter</span>
            </button>

            <div className="text-center text-sm mt-4">
              <span className="text-gray-600">Pas encore de compte ? </span>
              <Link to="/register" className="text-[#E3997E] hover:underline font-medium">
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
