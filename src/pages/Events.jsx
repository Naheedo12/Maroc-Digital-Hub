"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import {
  fetchEventsStart,
  fetchEventsSuccess,
  fetchEventsFailure,
  addEvent,
  participateInEvent,
} from "../store/slices/eventsSlice"
import { eventsAPI } from "../services/api"

function Events() {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { events, loading } = useSelector((state) => state.events)

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  })

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        dispatch(fetchEventsStart())
        const data = await eventsAPI.getAll()
        dispatch(fetchEventsSuccess(data))
      } catch (error) {
        dispatch(fetchEventsFailure(error.message))
        toast.error("Erreur lors du chargement des événements")
      }
    }
    fetchEvents()
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isAuthenticated) {
      toast.error("Vous devez être connecté pour créer un événement")
      return
    }

    if (user.role === "Visiteur") {
      toast.error("Les visiteurs ne peuvent pas créer d'événements")
      return
    }

    if (!formData.title || !formData.date || !formData.location || !formData.description) {
      toast.error("Veuillez remplir tous les champs")
      return
    }

    try {
      const newEvent = await eventsAPI.create({
        ...formData,
        participants: [],
        createdBy: user.id,
        createdAt: new Date().toISOString(),
      })
      dispatch(addEvent(newEvent))
      toast.success("Événement créé avec succès !")
      setFormData({ title: "", date: "", location: "", description: "" })
    } catch (error) {
      toast.error("Erreur lors de la création de l'événement")
    }
  }

  const handleParticipate = async (eventId) => {
    if (!isAuthenticated) {
      toast.error("Vous devez être connecté pour participer")
      return
    }

    const event = events.find((e) => e.id === eventId)
    if (event.participants.includes(user.id)) {
      toast.info("Vous participez déjà à cet événement")
      return
    }

    try {
      const updatedEvent = await eventsAPI.update(eventId, {
        ...event,
        participants: [...event.participants, user.id],
      })
      dispatch(participateInEvent({ eventId, userId: user.id }))
      toast.success("Inscription réussie !")
    } catch (error) {
      toast.error("Erreur lors de l'inscription")
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-[#FFF2EE] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#017679] text-center mb-3">Calendrier des Événements</h1>
        <p className="text-center text-gray-600 mb-12 text-sm">
          Découvrez les prochains meetups, conférences et ateliers organisés par la communauté.
        </p>

        {/* Create Event Form */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#017679] text-center mb-3">Créer un nouvel événement</h2>
          <p className="text-center text-gray-600 mb-6 text-sm">Vous pouvez proposer un événement à la communauté.</p>

          {!isAuthenticated ? (
            <div className="text-center py-4">
              <p className="text-gray-600 mb-4">Vous devez être connecté pour créer un événement</p>
              <a
                href="/login"
                className="inline-block bg-[#017679] hover:bg-[#015a5d] text-white px-6 py-2 rounded-lg transition-colors"
              >
                Se connecter
              </a>
            </div>
          ) : user.role === "Visiteur" ? (
            <div className="text-center py-4">
              <p className="text-gray-600">Les visiteurs ne peuvent pas créer d'événements</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre de l'événement</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Conférence sur l'IA éthique"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#017679] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#017679] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lieu</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Ex: Casablanca"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#017679] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Détails, intervenants..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#017679] text-sm"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setFormData({ title: "", date: "", location: "", description: "" })}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#017679] hover:bg-[#015a5d] text-white rounded-lg transition-colors text-sm"
                >
                  Publier l'événement
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Events List */}
        <h2 className="text-2xl font-bold text-[#017679] mb-6">Les événements existants</h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#017679]"></div>
            <p className="mt-4 text-gray-600">Chargement des événements...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600">Aucun événement disponible pour le moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white border-l-[6px] border-[#017679] rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-lg mb-4">{event.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 mr-2 text-[#D88B6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>
                      <strong>Date :</strong> {formatDate(event.date)}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 mr-2 text-[#D88B6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <span>
                      <strong>Lieu :</strong> {event.location}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-6">{event.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {event.participants.length} participants
                  </div>
                  {isAuthenticated && event.participants.includes(user.id) ? (
                    <span className="bg-green-100 text-green-700 px-5 py-2 rounded-lg text-sm font-medium">
                      Inscrit
                    </span>
                  ) : (
                    <button
                      onClick={() => handleParticipate(event.id)}
                      className="bg-[#017679] hover:bg-[#015a5d] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Participer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Events
