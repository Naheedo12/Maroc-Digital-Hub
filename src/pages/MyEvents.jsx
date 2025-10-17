import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import {
  fetchEventsStart,
  fetchEventsSuccess,
  fetchEventsFailure,
  unparticipateFromEvent,
} from "../store/slices/eventsSlice"
import { eventsAPI } from "../services/api"

function MyEvents() {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { events, loading } = useSelector((state) => state.events)

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

  const myEvents = events.filter((event) => isAuthenticated && event.participants.includes(user.id))

  const handleUnparticipate = async (eventId) => {
    if (!isAuthenticated) {
      toast.error("Vous devez être connecté")
      return
    }

    if (window.confirm("Êtes-vous sûr de vouloir vous désinscrire de cet événement ?")) {
      try {
        const event = events.find((e) => e.id === eventId)
        const updatedEvent = await eventsAPI.update(eventId, {
          ...event,
          participants: event.participants.filter((id) => id !== user.id),
        })
        dispatch(unparticipateFromEvent({ eventId, userId: user.id }))
        toast.success("Désinscription réussie")
      } catch (error) {
        toast.error("Erreur lors de la désinscription")
      }
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFF2EE] py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-[#017679] mb-8">Mes Événements Personnels</h1>
          <p className="text-gray-600 mb-6">Vous devez être connecté pour voir vos événements</p>
          <Link
            to="/login"
            className="inline-block bg-[#017679] hover:bg-[#015f62] text-white px-6 py-3 rounded-lg transition-colors"
          >
            Se connecter
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFF2EE] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#017679] text-center mb-8">Mes Événements Personnels</h1>

        <div className="mb-8">
          <Link
            to="/events"
            className="text-gray-600 hover:text-[#017679] flex items-center space-x-1 text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Retour à Tous les Événements</span>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#017679]"></div>
            <p className="mt-4 text-gray-600">Chargement...</p>
          </div>
        ) : myEvents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600 mb-4">Vous n'êtes inscrit à aucun événement</p>
            <Link
              to="/events"
              className="inline-block bg-[#017679] hover:bg-[#015f62] text-white px-6 py-3 rounded-lg transition-colors"
            >
              Découvrir les événements
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {myEvents.map((event) => (
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
                  <button
                    onClick={() => handleUnparticipate(event.id)}
                    className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Se désinscrire
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyEvents
