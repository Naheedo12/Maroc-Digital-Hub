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
  likeDiscussion,
} from "../store/slices/discussionsSlice"
import { discussionsAPI } from "../services/api"

function Forum() {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { discussions, loading } = useSelector((state) => state.discussions)

  const [message, setMessage] = useState("")
  const [sortBy, setSortBy] = useState("recent")

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
        likes: [],
        createdAt: new Date().toISOString(),
      })
      dispatch(addDiscussion(newDiscussion))
      toast.success("Message publié avec succès !")
      setMessage("")
    } catch (error) {
      toast.error("Erreur lors de la publication du message")
    }
  }

  const handleLike = async (discussionId) => {
    if (!isAuthenticated) {
      toast.error("Vous devez être connecté pour aimer un message")
      return
    }

    const discussion = discussions.find((d) => d.id === discussionId)
    const hasLiked = discussion.likes?.includes(user.id)

    try {
      const updatedLikes = hasLiked
        ? discussion.likes.filter((id) => id !== user.id)
        : [...(discussion.likes || []), user.id]

      await discussionsAPI.update(discussionId, {
        ...discussion,
        likes: updatedLikes,
      })

      dispatch(likeDiscussion({ discussionId, userId: user.id }))

      if (!hasLiked) {
        toast.success("Message aimé !")
      }
    } catch (error) {
      toast.error("Erreur lors de l'action")
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
        return "bg-gradient-to-r from-red-500 to-red-600"
      case "Startup":
        return "bg-gradient-to-r from-teal-500 to-teal-600"
      case "Investisseur":
        return "bg-gradient-to-r from-purple-500 to-purple-600"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600"
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) return "À l'instant"
    if (diffInSeconds < 3600) return `Il y a ${Math.floor(diffInSeconds / 60)} min`
    if (diffInSeconds < 86400) return `Il y a ${Math.floor(diffInSeconds / 3600)} h`
    if (diffInSeconds < 604800) return `Il y a ${Math.floor(diffInSeconds / 86400)} j`

    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })
  }

  const sortedDiscussions = [...discussions].sort((a, b) => {
    if (sortBy === "popular") {
      return (b.likes?.length || 0) - (a.likes?.length || 0)
    }
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fef5f1] to-[#fff8f5] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0d7377] mb-3">Discussions & Networking</h1>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Partagez vos idées, posez des questions à la communauté. Trouvez des partenaires ou des investisseurs.
          </p>
        </div>

        {/* Post Message Form */}
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
                className="inline-block bg-[#0d7377] hover:bg-[#0a5c5f] text-white px-6 py-2 rounded-lg text-sm transition-colors"
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
                  placeholder="Partagez vos idées avec la communauté..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0d7377] text-sm transition-colors resize-none"
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
                  className="bg-gradient-to-r from-[#0d7377] to-[#0a5c5f] hover:from-[#0a5c5f] hover:to-[#084a4d] text-white px-6 py-2.5 rounded-xl flex items-center space-x-2 transition-all shadow-md hover:shadow-lg text-sm font-medium"
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

        {/* Sort and Filter */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#0d7377]">
            Fil de Discussion <span className="text-lg text-gray-500">({discussions.length})</span>
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy("recent")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === "recent"
                  ? "bg-[#0d7377] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              Récents
            </button>
            <button
              onClick={() => setSortBy("popular")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === "popular"
                  ? "bg-[#0d7377] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              Populaires
            </button>
          </div>
        </div>

        {/* Discussions List */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#0d7377] border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Chargement des discussions...</p>
          </div>
        ) : discussions.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-gray-600 font-medium">Aucune discussion pour le moment</p>
            <p className="text-gray-500 text-sm mt-1">Soyez le premier à publier !</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedDiscussions.map((discussion) => (
              <div
                key={discussion.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center font-bold text-gray-700 text-base flex-shrink-0 shadow-sm">
                      {discussion.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{discussion.author}</span>
                        <span
                          className={`${getRoleBadgeColor(discussion.role)} text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm`}
                        >
                          {discussion.role}
                        </span>
                        <span className="text-xs text-gray-400">• {formatDate(discussion.createdAt)}</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed mt-2">{discussion.message}</p>
                    </div>
                  </div>

                  {/* Delete button for Admin or message owner */}
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

                {/* Like Button */}
                <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleLike(discussion.id)}
                    disabled={!isAuthenticated}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      discussion.likes?.includes(user?.id)
                        ? "bg-red-50 text-red-600 hover:bg-red-100"
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

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>Vu par la communauté</span>
                  </div>
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
