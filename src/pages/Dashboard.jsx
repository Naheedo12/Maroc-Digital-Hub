"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { fetchStartupsStart, fetchStartupsSuccess, fetchStartupsFailure } from "../store/slices/startupsSlice"
import { fetchEventsStart, fetchEventsSuccess, fetchEventsFailure } from "../store/slices/eventsSlice"
import { startupsAPI, eventsAPI } from "../services/api"

function Dashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { startups } = useSelector((state) => state.startups)
  const { events } = useSelector((state) => state.events)

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "Admin") {
      toast.error("Accès refusé. Réservé aux administrateurs.")
      navigate("/")
      return
    }

    const fetchData = async () => {
      try {
        dispatch(fetchStartupsStart())
        dispatch(fetchEventsStart())

        const startupsData = await startupsAPI.getAll()
        const eventsData = await eventsAPI.getAll()

        dispatch(fetchStartupsSuccess(startupsData))
        dispatch(fetchEventsSuccess(eventsData))
      } catch (error) {
        dispatch(fetchStartupsFailure(error.message))
        dispatch(fetchEventsFailure(error.message))
        toast.error("Erreur lors du chargement des données")
      }
    }

    fetchData()
  }, [dispatch, isAuthenticated, user, navigate])

  if (!isAuthenticated || user?.role !== "Admin") {
    return null
  }

  const totalParticipants = events.reduce((sum, event) => sum + event.participants.length, 0)

  const sectors = ["AI", "E-commerce", "Tourisme", "GennTech", "AgriTech"]
  const sectorData = sectors.map((sector) => {
    const count = startups.filter((s) => s.sector === sector).length
    const percentage = startups.length > 0 ? Math.round((count / startups.length) * 100) : 0
    return {
      sector,
      count,
      percentage,
      color: percentage > 15 ? "bg-[#14b8a6]" : "bg-[#ff9f7f]",
    }
  })

  const stats = [
    {
      title: "Startups Inscrites",
      value: startups.length,
      icon: (
        <svg className="w-8 h-8 text-[#0d7377]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: "Événements Créés",
      value: events.length,
      icon: (
        <svg className="w-8 h-8 text-[#0d7377]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Participants",
      value: totalParticipants,
      icon: (
        <svg className="w-8 h-8 text-[#0d7377]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-[#fef5f1] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold text-[#0d7377]">Tableau de Bord Administrateur</h1>
          <Link to="/" className="text-gray-600 hover:text-[#0d7377] flex items-center space-x-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Retour à l'accueil</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4 mb-2">
                <div>{stat.icon}</div>
                <div className="text-4xl font-bold text-[#0d7377]">{stat.value}</div>
              </div>
              <h3 className="text-gray-600 font-medium text-sm">{stat.title}</h3>
            </div>
          ))}
        </div>

        {/* Sector Distribution Chart */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#0d7377] mb-8">Répartition des Startups par Secteur</h2>
          <div className="space-y-3">
            {sectorData.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-24 text-xs font-medium text-gray-600">{item.sector}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-7 overflow-hidden">
                  <div
                    className={`${item.color} h-full flex items-center justify-end pr-3 text-white text-xs font-semibold transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  >
                    {item.percentage > 0 && `${item.percentage}%`}
                  </div>
                </div>
                <div className="w-16 text-xs text-gray-600 text-right">
                  {item.count} startup{item.count !== 1 ? "s" : ""}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Startups */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-[#0d7377] mb-4">Dernières Startups</h3>
            <div className="space-y-3">
              {startups
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5)
                .map((startup) => (
                  <div key={startup.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{startup.name}</div>
                      <div className="text-xs text-gray-500">{startup.sector}</div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(startup.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                ))}
              {startups.length === 0 && <p className="text-gray-500 text-sm text-center py-4">Aucune startup</p>}
            </div>
          </div>

          {/* Recent Events */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-[#0d7377] mb-4">Derniers Événements</h3>
            <div className="space-y-3">
              {events
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5)
                .map((event) => (
                  <div key={event.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{event.title}</div>
                      <div className="text-xs text-gray-500">{event.location}</div>
                    </div>
                    <div className="text-xs text-gray-400">{event.participants.length} participants</div>
                  </div>
                ))}
              {events.length === 0 && <p className="text-gray-500 text-sm text-center py-4">Aucun événement</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
