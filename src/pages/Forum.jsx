"use client"

import { useState } from "react"

function Forum() {
  const [message, setMessage] = useState("")

  const discussions = [
    {
      id: 1,
      author: "Salma ELQADI",
      role: "Admin",
      message: "Rappel : Le TechSummit est le 15 novembre. N'oubliez pas de vous inscrire à la page Événements !",
      date: "Publié le 30/09/2025 à 23:27",
    },
    {
      id: 2,
      author: "Salma ELQADI",
      role: "Startup",
      message: "Rappel : Le TechSummit est le 15 novembre. N'oubliez pas de vous inscrire à la page Événements !",
      date: "Publié le 30/09/2025 à 23:27",
    },
    {
      id: 3,
      author: "Salma ELQADI",
      role: "Investisseur",
      message: "Rappel : Le TechSummit est le 15 novembre. N'oubliez pas de vous inscrire à la page Événements !",
      date: "Publié le 30/09/2025 à 23:27",
    },
  ]

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-[#ef4444]"
      case "Startup":
        return "bg-[#0d7377]"
      case "Investisseur":
        return "bg-gray-600"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-[#fef5f1] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#0d7377] text-center mb-3">Discussions & Networking</h1>
        <p className="text-center text-gray-600 mb-12 text-sm">
          Partagez vos idées, posez des questions à la communauté. Trouvez des partenaires ou des investisseurs.
        </p>

        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-xl font-bold text-[#ff6b6b] text-center mb-3">Publier un nouveau message</h2>
          <p className="text-center text-gray-600 mb-6 text-sm">
            Vous devez être connecté pour publier.
            <button className="ml-2 text-gray-700 bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded text-sm transition-colors">
              Se connecter
            </button>
          </p>

          <form className="space-y-4">
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Votre message pour la communauté"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d7377] text-sm"
            ></textarea>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#0d7377] hover:bg-[#0a5c5f] text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                <span>Envoyer le message</span>
              </button>
            </div>
          </form>
        </div>

        <h2 className="text-2xl font-bold text-[#0d7377] mb-6">Fil de Discussion</h2>
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-600 text-sm flex-shrink-0">
                  {discussion.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{discussion.author}</div>
                  <span
                    className={`inline-block ${getRoleBadgeColor(discussion.role)} text-white text-xs px-2.5 py-0.5 rounded-full mt-1`}
                  >
                    {discussion.role}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3 ml-13">{discussion.message}</p>
              <div className="text-xs text-gray-500 ml-13">{discussion.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Forum
