"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import {
  fetchStartupsStart,
  fetchStartupsSuccess,
  fetchStartupsFailure,
  addStartup,
  deleteStartup,
  setCurrentPage,
  setSelectedSector,
} from "../store/slices/startupsSlice"
import { startupsAPI, eventsAPI } from "../services/api"

function Home() {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { startups, loading, currentPage, itemsPerPage, selectedSector } = useSelector((state) => state.startups)
  const { events } = useSelector((state) => state.events)

  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    sector: "",
    description: "",
  })

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        dispatch(fetchStartupsStart())
        const data = await startupsAPI.getAll()
        dispatch(fetchStartupsSuccess(data))
      } catch (error) {
        dispatch(fetchStartupsFailure(error.message))
        toast.error("Erreur lors du chargement des startups")
      }
    }

    const fetchEvents = async () => {
      try {
        const eventData = await eventsAPI.getAll()
        dispatch({ type: "SET_EVENTS", payload: eventData })
      } catch (error) {
        toast.error("Erreur lors du chargement des événements")
      }
    }

    fetchStartups()
    fetchEvents()
  }, [dispatch])

  const filteredStartups = startups.filter((startup) => {
    const matchesSector = selectedSector === "Tous" || startup.sector === selectedSector
    const matchesSearch =
      startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSector && matchesSearch
  })

  const totalPages = Math.ceil(filteredStartups.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentStartups = filteredStartups.slice(startIndex, endIndex)

  const latestStartups = [...startups].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4)

  const sectors = ["Tous", "AI", "E-commerce", "Tourisme", "GennTech", "AgriTech"]
  const sectorCounts = sectors.map((sector) => ({
    name: sector,
    count: sector === "Tous" ? startups.length : startups.filter((s) => s.sector === sector).length,
    icon: "📈",
  }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isAuthenticated) {
      toast.error("Vous devez être connecté pour ajouter une startup")
      return
    }

    if (user.role !== "Startup" && user.role !== "Admin") {
      toast.error("Seuls les startups et les administrateurs peuvent ajouter des startups")
      return
    }

    if (!formData.name || !formData.sector || !formData.description) {
      toast.error("Veuillez remplir tous les champs")
      return
    }

    try {
      const newStartup = await startupsAPI.create({
        ...formData,
        userId: user.id,
        createdAt: new Date().toISOString(),
      })
      dispatch(addStartup(newStartup))
      toast.success("Startup ajoutée avec succès !")
      setFormData({ name: "", sector: "", description: "" })
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la startup")
    }
  }

  const handleDelete = async (startupId, startupUserId) => {
    if (!isAuthenticated) {
      toast.error("Vous devez être connecté")
      return
    }

    if (user.id !== startupUserId && user.role !== "Admin") {
      toast.error("Vous ne pouvez supprimer que vos propres startups")
      return
    }

    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette startup ?")) {
      try {
        await startupsAPI.delete(startupId)
        dispatch(deleteStartup(startupId))
        toast.success("Startup supprimée avec succès")
      } catch (error) {
        toast.error("Erreur lors de la suppression")
      }
    }
  }

  const handleParticipateFromHome = async (eventId) => {
    if (!isAuthenticated) {
      toast.error("Vous devez être connecté pour vous inscrire à un événement")
      return
    }

    try {
      await eventsAPI.participate(eventId, user.id)
      toast.success("Vous êtes inscrit à cet événement avec succès")
    } catch (error) {
      toast.error("Erreur lors de l'inscription à cet événement")
    }
  }

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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                <div className="text-3xl font-bold">{startups.length}+</div>
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
          {latestStartups.map((startup) => (
            <div
              key={startup.id}
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
                  <span className="text-gray-800 font-medium">{startup.name}</span>
                </p>
                <p className="text-sm">
                  <span className="text-[#D88B6F] font-semibold">Secteur :</span>{" "}
                  <span className="text-gray-800">{startup.sector}</span>
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
          {sectorCounts.map((sector) => (
            <div
              key={sector.name}
              onClick={() => dispatch(setSelectedSector(sector.name))}
              className={`bg-white border-2 rounded-xl p-6 text-center cursor-pointer transition-all ${
                selectedSector === sector.name
                  ? "border-[#017679] bg-[#017679]/5"
                  : "border-[#017679] hover:bg-[#017679]/5"
              }`}
            >
              <div className="text-3xl mb-3 text-[#D88B6F]">{sector.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{sector.name}</h3>
              <p className="text-sm text-[#017679] font-medium">{sector.count} startups</p>
            </div>
          ))}
        </div>
      </section>

      {/* Événements à Venir */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-[#017679] mb-8">Événements à Venir</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Events List */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-4">
              {events.slice(0, 4).map((event) => (
                <div
                  key={event.id}
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
                    <span className="text-gray-800 font-medium">{event.title}</span>
                  </div>
                  <span className="text-gray-500 text-sm mr-4">
                    ({new Date(event.date).toLocaleDateString("fr-FR")})
                  </span>
                  <button
                    onClick={() => handleParticipateFromHome(event.id)}
                    className="bg-[#017679] hover:bg-[#015f62] text-white px-6 py-2 rounded-lg text-sm transition-colors"
                  >
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
                alt={latestStartups[0]?.name || "Startup"}
                className="w-32 h-32 mx-auto object-contain"
              />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-4">{latestStartups[0]?.name || "GreenShop"}</h4>
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
          <div className="text-sm text-gray-600">
            {selectedSector !== "Tous" && (
              <span className="bg-[#017679] text-white px-3 py-1 rounded-full">Filtré par: {selectedSector}</span>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#017679]"></div>
            <p className="mt-4 text-gray-600">Chargement des startups...</p>
          </div>
        ) : currentStartups.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucune startup trouvée</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentStartups.map((startup) => (
                <div
                  key={startup.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-center p-6 bg-white">
                    <div className="w-20 h-20 bg-[#8B6F5C] rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                      {startup.name.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                  <div className="p-5 border-t border-gray-100">
                    <h3 className="font-bold text-lg mb-2 text-gray-800">{startup.name}</h3>
                    <span className="inline-block px-3 py-1 bg-[#E0F2F1] text-[#017679] text-xs rounded-full mb-3">
                      {startup.sector}
                    </span>
                    <p className="text-sm text-gray-600 mb-3">{startup.description}</p>
                    {isAuthenticated && (user.id === startup.userId || user.role === "Admin") && (
                      <button
                        onClick={() => handleDelete(startup.id, startup.userId)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Supprimer
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3">
                <button
                  onClick={() => dispatch(setCurrentPage(Math.max(1, currentPage - 1)))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-[#D9D9D9] hover:bg-gray-400 text-gray-700 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Précédent
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-[#017679] font-bold">
                    {currentPage} / {totalPages}
                  </span>
                </div>
                <button
                  onClick={() => dispatch(setCurrentPage(Math.min(totalPages, currentPage + 1)))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-[#D9D9D9] hover:bg-gray-400 text-gray-700 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Ajouter une startup Form */}
      <section id="ajouter-startup-section" className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-[#017679] mb-8 text-center">Ajouter une startup</h2>
        <div className="bg-white rounded-xl shadow-sm p-8">
          {!isAuthenticated ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Vous devez être connecté pour ajouter une startup</p>
              <a
                href="/login"
                className="inline-block bg-[#017679] hover:bg-[#015f62] text-white px-6 py-3 rounded-lg transition-colors"
              >
                Se connecter
              </a>
            </div>
          ) : user.role !== "Startup" && user.role !== "Admin" ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-2">
                Seuls les startups et les administrateurs peuvent ajouter des startups
              </p>
              <p className="text-sm text-gray-500">Votre rôle actuel: {user.role}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la Startup</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#017679] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Secteur d'activité</label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#017679] text-sm text-gray-700"
                  >
                    <option value="">Sélectionnez un secteur</option>
                    <option value="AI">AI</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Tourisme">Tourisme</option>
                    <option value="AgriTech">AgriTech</option>
                    <option value="GennTech">GennTech</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (mission, produit ...)
                </label>
                <textarea
                  rows="6"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#017679] text-sm resize-none"
                ></textarea>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setFormData({ name: "", sector: "", description: "" })}
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
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
