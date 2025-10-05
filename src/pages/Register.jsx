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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg overflow-hidden shadow-sm">
            <Link
              to="/login"
              className="px-8 py-3 bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition-colors"
            >
              Connexion
            </Link>
            <Link to="/register" className="px-8 py-3 bg-primary text-white font-semibold">
              Inscription
            </Link>
          </div>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-primary text-center mb-8">Créer un compte</h2>

          <form className="space-y-6">
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Sélectionner votre Rôle</label>
              <div className="space-y-3">
                {roles.map((role) => (
                  <div
                    key={role.name}
                    onClick={() => setSelectedRole(role.name)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedRole === role.name ? "border-primary bg-teal-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-semibold text-gray-800">{role.name}</div>
                    <div className="text-sm text-gray-600">{role.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              S'inscrire et rejoindre le Hub
            </button>

            {/* Login Link */}
            <div className="text-center text-sm">
              <span className="text-gray-600">Déjà un compte ? </span>
              <Link to="/login" className="text-orange-500 hover:underline font-semibold">
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