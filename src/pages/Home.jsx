"use client"

import { useState } from "react"

function Home() {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="min-h-screen bg-[#FFF2EE]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#88C7BC] via-[#88C7BC] to-[#6BB5A9]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#017679] rounded-full opacity-10 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D88B6F] rounded-full opacity-10 blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#017679] leading-tight">
              Dynamisez votre{" "}
              <span className="text-[#D88B6F] relative inline-block">
                innovation
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 5 150 5 198 10" stroke="#D88B6F" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>{" "}
              au Maroc.
            </h1>
            <p className="text-lg md:text-xl mb-12 text-[#017679] max-w-3xl mx-auto font-medium">
              Connectez-vous aux startups, investisseurs et aux événements tech qui façonnent l'avenir.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto items-stretch">
              <div className="flex-1 relative group">
                <div className="absolute inset-0 bg-white rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative flex items-center bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <svg
                    className="absolute left-5 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Rechercher une startup par nom ou description ..."
                    className="w-full pl-14 pr-5 py-4 rounded-xl bg-transparent text-gray-700 focus:outline-none"
                  />
                </div>
              </div>

              {/* Publier ma startup button */}
              <button
                onClick={() => {
                  const section = document.getElementById("ajouter-startup-section")
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                className="bg-[#017679] hover:bg-[#015f62] text-white px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                Publier ma startup
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 text-[#017679]">
              <div className="text-center">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm font-medium opacity-80">Startups</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">20+</div>
                <div className="text-sm font-medium opacity-80">Événements</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">100+</div>
                <div className="text-sm font-medium opacity-80">Membres</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Derniers Ajouts */}
      <section className="max-w-7xl mx-auto px-2 py-16">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-3xl font-bold text-[#017679]">Derniers Ajouts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1 overflow-hidden group"
            >
              <div className="w-full h-40 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4 group-hover:from-[#88C7BC]/10 group-hover:to-white transition-all">
                <img
                  src="https://tse3.mm.bing.net/th/id/OIP.6pkUQZRs38sy7d_brb2T2AHaFA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Startup illustration"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-5 border-t-2 border-[#88C7BC]/20">
                <p className="text-sm mb-1">
                  <span className="text-[#D88B6F] font-semibold">Nom :</span>{" "}
                  <span className="text-gray-800 font-medium">GreenShop</span>
                </p>
                <p className="text-sm">
                  <span className="text-[#D88B6F] font-semibold">Secteur :</span>{" "}
                  <span className="text-gray-800">E-commerce</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explorer par Secteur */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-[#017679] mb-8">Explorer par Secteur</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: "Tous", count: 9, icon: "🚀" },
            { name: "AI", count: 2, icon: "📈" },
            { name: "Tourisme", count: 2, icon: "📈" },
            { name: "E-commerce", count: 2, icon: "📈" },
            { name: "GennTech", count: 2, icon: "📈" },
            { name: "AgriTech", count: 2, icon: "📈" },
          ].map((sector) => (
            <div
              key={sector.name}
              className="bg-white border-2 border-[#017679] rounded-xl p-6 text-center cursor-pointer hover:bg-[#017679]/5 transition-all"
            >
              <div className="text-3xl mb-3 text-[#D88B6F]">{sector.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{sector.name}</h3>
              <p className="text-sm text-[#017679] font-medium">{sector.count} startups</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-[#017679] mb-8">Événements à Venir</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Events List */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-800 font-medium">Morocco Tech Summit 2025</span>
                  </div>
                  <span className="text-gray-500 text-sm mr-4">(10/25/2025)</span>
                  <button className="bg-[#017679] hover:bg-[#015f62] text-white px-6 py-2 rounded-lg text-sm transition-colors">
                    S'inscrire
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Start-up du mois */}
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">⭐</span>
              <h3 className="text-xl font-bold text-[#017679]">Start-up du mois</h3>
              <span className="text-2xl">⭐</span>
            </div>
            <div className="mb-4">
              <img
                src="https://tse3.mm.bing.net/th/id/OIP.6pkUQZRs38sy7d_brb2T2AHaFA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="GreenShop"
                className="w-32 h-32 mx-auto object-contain"
              />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-4">GreenShop</h4>
            <button className="bg-[#017679] hover:bg-[#015f62] text-white px-6 py-2 rounded-lg text-sm transition-colors w-full">
              Découvrir la start-up
            </button>
          </div>
        </div>
      </section>

      {/* Espace Startup */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#017679]">Espace Startup</h2>
          <button className="flex items-center gap-2 text-gray-600 hover:text-[#017679] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span className="text-sm font-medium">Filtrer par Secteur</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center p-6 bg-white">
                <div className="w-20 h-20 bg-[#8B6F5C] rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                  EC
                </div>
              </div>
              <div className="p-5 border-t border-gray-100">
                <h3 className="font-bold text-lg mb-2 text-gray-800">Casa E-Comm</h3>
                <span className="inline-block px-3 py-1 bg-[#E0F2F1] text-[#017679] text-xs rounded-full mb-3">
                  E-commerce
                </span>
                <p className="text-sm text-gray-600">Plateforme de paiement mobile sécurisé.</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="px-4 py-2 rounded-lg bg-[#D9D9D9] hover:bg-gray-400 text-gray-700 text-sm transition-colors"
          >
            Précédent
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[#017679] font-bold">1 / 3</span>
          </div>
          <button
            onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
            className="px-4 py-2 rounded-lg bg-[#D9D9D9] hover:bg-gray-400 text-gray-700 text-sm transition-colors"
          >
            Suivant
          </button>
        </div>
      </section>

      {/* Ajouter une startup Form */}
      <section id="ajouter-startup-section" className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-[#017679] mb-8 text-center">Ajouter une startup</h2>
        <div className="bg-white rounded-xl shadow-sm p-8">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la Startup</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#017679] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secteur d'activité</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#017679] text-sm text-gray-500">
                  <option>Sélectionnez un secteur</option>
                  <option>AI</option>
                  <option>E-commerce</option>
                  <option>Tourisme</option>
                  <option>AgriTech</option>
                  <option>GennTech</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (mission, produit ...)
              </label>
              <textarea
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#017679] text-sm resize-none"
              ></textarea>
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                className="px-6 py-3 bg-[#D9D9D9] hover:bg-gray-400 text-gray-700 rounded-lg text-sm font-medium transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#017679] hover:bg-[#015f62] text-white rounded-lg text-sm font-medium transition-colors"
              >
                Ajouter ma startup
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Home
