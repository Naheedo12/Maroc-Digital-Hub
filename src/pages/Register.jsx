"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

function Register() {
  const [name, setName] = useState("")
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
            <Link
              to="/login"
              className="px-8 py-3 bg-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-400 transition-colors"
            >
              Connexion
            </Link>
            <Link to="/register" className="px-8 py-3 bg-[#0d7377] text-white font-medium text-sm">
              Inscription
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-[#0d7377] text-center mb-8">Créer un compte</h2>

          <form className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom / Pseudo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Salma ELOADI"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d7377] text-sm"
                />
              </div>
            </div>

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
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d7377] text-sm"
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
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d7377] text-sm"
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
                        ? "border-[#0d7377] bg-[#0d7377]/5"
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
              className="w-full bg-[#0d7377] hover:bg-[#0a5c5f] text-white py-2.5 rounded-lg font-medium transition-colors text-sm mt-6"
            >
              S'inscrire et rejoindre le Hub
            </button>

            <div className="text-center text-sm mt-4">
              <span className="text-gray-600">Déjà un compte ? </span>
              <Link to="/login" className="text-[#ff6b6b] hover:underline font-medium">
                Connectez-vous ici
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
