"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import {
  fetchDiscussionsStart,
  fetchDiscussionsSuccess,
  fetchDiscussionsFailure,
  addDiscussion,
  deleteDiscussion,
} from "../store/slices/discussionsSlice"
import { discussionsAPI } from "../services/api"

function Forum() {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { discussions, loading } = useSelector((state) => state.discussions)

  const [message, setMessage] = useState("")

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        dispatch(fetchDiscussionsStart())
        const data = await discussionsAPI.getAll()
        dispatch(fetchDiscussionsSuccess(data))
      } catch (error) {
        dispatch(fetchDiscussionsFailure(error.message))
        toast.error("Erreur lors du chargement des discussions")
      }
    }
    fetchDiscussions()
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isAuthenticated) {
      toast.error("Vous devez être connecté pour publier un message")
      return
    }

    if (!message.trim()) {
      toast.error("Veuillez écrire un message")
      return
    }

    try {
      const newDiscussion = await discussionsAPI.create({
        author: user.name,
        userId: user.id,
        role: user.role,
        message: message.trim(),
        createdAt: new Date().toISOString(),
      })
      dispatch(addDiscussion(newDiscussion))
      toast.success("Message publié avec succès !")
      setMessage("")
    } catch (error) {
      toast.error("Erreur lors de la publication du message")
    }
  }

  const handleDelete = async (discussionId, discussionUserId) => {
    if (!isAuthenticated) {
      toast.error("Vous devez être connecté")
      return
    }

    if (user.role !== "Admin" && user.id !== discussionUserId) {
      toast.error("Seuls les admins peuvent supprimer les messages")
      return
    }

    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
      try {
        await discussionsAPI.delete(discussionId)
        dispatch(deleteDiscussion(discussionId))
        toast.success("Message supprimé avec succès")
      } catch (error) {
        toast.error("Erreur lors de la suppression")
      }
    }
  }

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

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `Publié le ${date.toLocaleDateString("fr-FR")} à ${date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`
  }

  return (
    <div className="min-h-screen bg-[#fef5f1] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#0d7377] text-center mb-3">Discussions & Networking</h1>
        <p className="text-center text-gray-600 mb-12 text-sm">
          Partagez vos idées, posez des questions à la communauté. Trouvez des partenaires ou des investisseurs.
        </p>

        {/* Post Message Form */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-xl font-bold text-[#ff6b6b] text-center mb-3">Publier un nouveau message</h2>

          {!isAuthenticated ? (
            <div className="text-center">
              <p className="text-gray-600 mb-4">Vous devez être connecté pour publier.</p>
              <a
                href="/login"
                className="inline-block text-gray-700 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm transition-colors"
              >
                Se connecter
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
          )}
        </div>

        {/* Discussions List */}
        <h2 className="text-2xl font-bold text-[#0d7377] mb-6">Fil de Discussion</h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0d7377]"></div>
            <p className="mt-4 text-gray-600">Chargement des discussions...</p>
          </div>
        ) : discussions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600">Aucune discussion pour le moment. Soyez le premier à publier !</p>
          </div>
        ) : (
          <div className="space-y-4">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
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

                  {/* Delete button for Admin or message owner */}
                  {isAuthenticated && (user.role === "Admin" || user.id === discussion.userId) && (
                    <button
                      onClick={() => handleDelete(discussion.id, discussion.userId)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Supprimer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                <p className="text-gray-700 text-sm mb-3 ml-13">{discussion.message}</p>
                <div className="text-xs text-gray-500 ml-13">{formatDate(discussion.createdAt)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Forum
