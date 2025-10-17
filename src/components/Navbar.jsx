import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../store/slices/authSlice"
import { toast } from "react-toastify"

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isAdmin = user?.role === "Admin"

  const handleLogout = () => {
    dispatch(logout())
    toast.success("Déconnexion réussie")
    navigate("/")
    setMobileMenuOpen(false)
  }

  // Returns the right class for active links
  const getLinkClass = (path) =>
    location.pathname === path
      ? "text-[#017679] font-medium"
      : "text-gray-600 hover:text-[#017679] transition-colors"

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-xl font-bold"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="text-[#017679]">Maroc </span>
            <span className="text-[#E3997E]">Digital Hub</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`flex items-center space-x-2 text-sm ${getLinkClass("/")}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Accueil</span>
            </Link>

            <Link to="/events" className={`flex items-center space-x-2 text-sm ${getLinkClass("/events")}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Événements</span>
            </Link>

            <Link to="/forum" className={`flex items-center space-x-2 text-sm ${getLinkClass("/forum")}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              <span>Discussions</span>
            </Link>

            {isAuthenticated && (
              <Link to="/my-events" className={`flex items-center space-x-2 text-sm ${getLinkClass("/my-events")}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span>Mes Événements</span>
              </Link>
            )}

            {isAdmin && (
              <Link to="/dashboard" className={`flex items-center space-x-2 text-sm ${getLinkClass("/dashboard")}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Dashboard</span>
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium">{user?.name}</div>
                  <div className="text-xs text-gray-500">{user?.role}</div>
                </div>
                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-[#017679] hover:bg-[#015f62] text-white px-6 py-2 rounded-lg text-sm">
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Links */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 space-y-2 pt-4">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-2 rounded-lg text-sm ${getLinkClass("/")}`}>Accueil</Link>
            <Link to="/events" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-2 rounded-lg text-sm ${getLinkClass("/events")}`}>Événements</Link>
            <Link to="/forum" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-2 rounded-lg text-sm ${getLinkClass("/forum")}`}>Discussions</Link>
            {isAuthenticated && <Link to="/my-events" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-2 rounded-lg text-sm ${getLinkClass("/my-events")}`}>Mes Événements</Link>}
            {isAdmin && <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-2 rounded-lg text-sm ${getLinkClass("/dashboard")}`}>Dashboard</Link>}
            <div className="border-t border-gray-200 pt-2 mt-2">
              {isAuthenticated ? (
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50">Déconnexion</button>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-lg text-sm bg-[#017679] text-white hover:bg-[#015f62] text-center">Connexion</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
