"use client"

import { useState } from "react"

function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSector, setSelectedSector] = useState("Tous")
  const [currentPage, setCurrentPage] = useState(1)

  const sectors = [
    { name: "IA", icon: "🤖", count: 8 },
    { name: "Fintech", icon: "💰", count: 12 },
    { name: "E-commerce", icon: "🛒", count: 15 },
    { name: "Tourisme", icon: "✈️", count: 6 },
    { name: "AgriTech", icon: "🌾", count: 9 },
    { name: "HealthTech", icon: "⚕️", count: 7 },
  ]

  const startups = [
    { id: 1, name: "StartupName", sector: "IA", description: "Description de la startup...", participants: 8 },
    { id: 2, name: "StartupName", sector: "Fintech", description: "Description de la startup...", participants: 12 },
    { id: 3, name: "StartupName", sector: "E-commerce", description: "Description de la startup...", participants: 6 },
    { id: 4, name: "StartupName", sector: "Tourisme", description: "Description de la startup...", participants: 10 },
  ]

  const events = [
    { id: 1, title: "Morocco Tech Summit 2025", date: "sam. 15 nov. 2025", location: "Casablanca", participants: 4 },
    { id: 2, title: "Morocco Tech Summit 2025", date: "sam. 15 nov. 2025", location: "Casablanca", participants: 4 },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-400 to-teal-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Dynamisez votre <span className="text-orange-400">Innovation</span> au Maroc.
          </h1>
          <p className="text-lg mb-8">
            Connectez-vous aux startups, investisseurs et aux événements tech qui façonnent l'avenir.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Recherchez une startup, un secteur, un événement..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Publier ma startup
            </button>
          </div>
        </div>
      </section>

      {/* Derniers Ajouts */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-primary mb-8">Derniers Ajouts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {startups.map((startup) => (
            <div key={startup.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">🚀</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{startup.name}</h3>
              <p className="text-sm text-gray-600 mb-3">Secteur : {startup.sector}</p>
              <p className="text-sm text-gray-500 mb-4">{startup.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {startup.participants} participants
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explorer par Secteur */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-8">Explorer par Secteur</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sectors.map((sector) => (
              <div
                key={sector.name}
                className="bg-gray-50 hover:bg-teal-50 border-2 border-gray-200 hover:border-primary rounded-lg p-6 text-center cursor-pointer transition-all"
              >
                <div className="text-4xl mb-3">{sector.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-1">{sector.name}</h3>
                <p className="text-sm text-gray-500">{sector.count} startups</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Événements à Venir */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-primary">Événements à Venir</h2>
          <button className="text-primary hover:underline flex items-center space-x-1">
            <span>Voir tous</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white border-2 border-teal-500 rounded-lg p-6">
              <h3 className="font-bold text-xl mb-3">{event.title}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Date : {event.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Lieu : {event.location}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">Le plus grand sommet technologique du Maroc.</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {event.participants} participants
                </div>
                <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors">
                  Participer
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Découvrir plus
          </button>
        </div>
      </section>

      {/* Espace Startup */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-primary">Espace Startup</h2>
            <button className="text-primary hover:underline flex items-center space-x-1">
              <span>Filtrer par Secteur</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="w-full h-32 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                  <div className="w-16 h-16 bg-orange-400 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                    CC
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">Crea-E-Comm</h3>
                  <p className="text-sm text-gray-600 mb-4">Plateforme de création de sites e-commerce.</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    8 participants
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2">
            <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors">← Précédent</button>
            <button className="px-3 py-1 rounded bg-primary text-white">1</button>
            <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors">2</button>
            <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors">3</button>
            <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors">Suivant →</button>
          </div>
        </div>
      </section>

      {/* Ajouter une startup */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Ajouter une startup</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la Startup</label>
                <input
                  type="text"
                  placeholder="Ex: TechInnovate"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secteur d'activité</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Sélectionner un secteur</option>
                  <option>IA</option>
                  <option>Fintech</option>
                  <option>E-commerce</option>
                  <option>Tourisme</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description brève</label>
              <textarea
                rows="4"
                placeholder="Décrivez votre startup en quelques mots..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
              >
                Publier ma startup
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Home
