import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import {
  fetchDiscussionsStart,
  fetchDiscussionsSuccess,
  fetchDiscussionsFailure,
  addDiscussion,
  deleteDiscussion,
  likeDiscussion,
} from "../store/slices/discussionsSlice"
import { discussionsAPI } from "../services/api"

function Forum() {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { discussions, loading } = useSelector((state) => state.discussions)

  const [message, setMessage] = useState("")

  // Charger toutes les discussions
  useEffect(() => {
    const loadDiscussions = async () => {
      try {
        dispatch(fetchDiscussionsStart())
        const data = await discussionsAPI.getAll()
        dispatch(fetchDiscussionsSuccess(data))
      } catch (err) {
        dispatch(fetchDiscussionsFailure(err.message))
        toast.error("Erreur lors du chargement des discussions")
      }
    }
    loadDiscussions()
  }, [dispatch])

  // Publier un message
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isAuthenticated) return toast.error("Connectez-vous pour publier")
    if (!message.trim()) return toast.error("Veuillez écrire un message")

    try {
      const newMessage = {
        author: user.name,
        userId: user.id,
        role: user.role,
        message: message.trim(),
        likes: [],
        createdAt: new Date().toISOString(),
      }

      const savedDiscussion = await discussionsAPI.create(newMessage)
      dispatch(addDiscussion(savedDiscussion))
      toast.success("Message publié !")
      setMessage("")
    } catch {
      toast.error("Erreur lors de la publication du message")
    }
  }

  // Aimer / Retirer un like
  const handleLike = async (discussionId) => {
    if (!isAuthenticated) return toast.error("Connectez-vous pour aimer")

    const discussion = discussions.find((d) => d.id === discussionId)
    const alreadyLiked = discussion.likes?.includes(user.id)
    const updatedLikes = alreadyLiked
      ? discussion.likes.filter((id) => id !== user.id)
      : [...(discussion.likes || []), user.id]

    try {
      await discussionsAPI.update(discussionId, { ...discussion, likes: updatedLikes })
      dispatch(likeDiscussion({ discussionId, userId: user.id }))
      if (!alreadyLiked) toast.success("Message aimé ❤️")
    } catch {
      toast.error("Erreur lors du like")
    }
  }

  // Supprimer un message
  const handleDelete = async (id, ownerId) => {
    if (!isAuthenticated) return toast.error("Connectez-vous d'abord")
    if (user.role !== "Admin" && user.id !== ownerId)
      return toast.error("Seuls les admins ou les auteurs peuvent supprimer")

    if (window.confirm("Supprimer ce message ?")) {
      try {
        await discussionsAPI.delete(id)
        dispatch(deleteDiscussion(id))
        toast.success("Message supprimé")
      } catch {
        toast.error("Erreur lors de la suppression")
      }
    }
  }

  // Couleur du badge selon le rôle
  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-gradient-to-r from-red-500 to-red-600"
      case "Startup":
        return "bg-gradient-to-r from-teal-500 to-teal-600"
      case "Investisseur":
        return "bg-gradient-to-r from-purple-500 to-purple-600"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600"
    }
  }

  // Afficher le temps sous format lisible
  const formatDate = (date) => {
    const d = new Date(date)
    const diff = Math.floor((new Date() - d) / 1000)
    if (diff < 60) return "À l'instant"
    if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`
    if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)} h`
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fef5f1] to-[#fff8f5] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0d7377] mb-3">Discussions & Networking</h1>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Partagez vos idées et échangez avec la communauté.
          </p>
        </div>

        {/* Formulaire de publication */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b6b] to-[#ff8787] rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Publier un nouveau message</h2>
          </div>

          {!isAuthenticated ? (
            <div className="text-center py-6 bg-gray-50 rounded-xl">
              <p className="text-gray-600 mb-4">Vous devez être connecté pour publier.</p>
              <a
                href="/login"
                className="inline-block bg-[#0d7377] hover:bg-[#0a5c5f] text-white px-6 py-2 rounded-lg text-sm"
              >
                Se connecter
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <textarea
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Partagez vos idées..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0d7377] text-sm resize-none"
                ></textarea>
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">{message.length} / 500</div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Soyez respectueux et constructif</span>
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#0d7377] to-[#0a5c5f] text-white px-6 py-2.5 rounded-xl flex items-center space-x-2 text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  <span>Publier</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Discussions */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#0d7377] border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Chargement des discussions...</p>
          </div>
        ) : discussions.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-600 font-medium">Aucune discussion pour le moment</p>
            <p className="text-gray-500 text-sm mt-1">Soyez le premier à publier !</p>
          </div>
        ) : (
          <div className="space-y-4">
            {discussions.map((discussion) => (
              <div
                key={discussion.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center font-bold text-gray-700">
                      {discussion.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{discussion.author}</span>
                        <span className={`${getRoleColor(discussion.role)} text-white text-xs px-3 py-1 rounded-full`}>
                          {discussion.role}
                        </span>
                        <span className="text-xs text-gray-400">• {formatDate(discussion.createdAt)}</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed mt-2">{discussion.message}</p>
                    </div>
                  </div>

                  {isAuthenticated && (user.role === "Admin" || user.id === discussion.userId) && (
                    <button
                      onClick={() => handleDelete(discussion.id, discussion.userId)}
                      className="text-gray-400 hover:text-red-600 transition-colors ml-2"
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

                <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleLike(discussion.id)}
                    disabled={!isAuthenticated}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      discussion.likes?.includes(user?.id)
                        ? "bg-red-50 text-red-600"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    } ${!isAuthenticated ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <svg
                      className={`w-5 h-5 ${discussion.likes?.includes(user?.id) ? "fill-current" : ""}`}
                      fill={discussion.likes?.includes(user?.id) ? "currentColor" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span>{discussion.likes?.length || 0}</span>
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

export default Forum
