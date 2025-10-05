import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Events from "./pages/Events"
import Forum from "./pages/Forum"
import Login from "./pages/Login"
import Register from "./pages/Register"
import MyEvents from "./pages/MyEvents"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
