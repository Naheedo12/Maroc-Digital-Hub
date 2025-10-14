import axios from "axios"

const API_URL = "http://localhost:5000"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const startupsAPI = {
  getAll: async () => {
    const response = await api.get("/startups")
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/startups/${id}`)
    return response.data
  },

  create: async (startupData) => {
    const response = await api.post("/startups", startupData)
    return response.data
  },

  update: async (id, startupData) => {
    const response = await api.put(`/startups/${id}`, startupData)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/startups/${id}`)
    return response.data
  },
}

export const eventsAPI = {
  getAll: async () => {
    const response = await api.get("/events")
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/events/${id}`)
    return response.data
  },

  create: async (eventData) => {
    const response = await api.post("/events", eventData)
    return response.data
  },

  update: async (id, eventData) => {
    const response = await api.put(`/events/${id}`, eventData)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/events/${id}`)
    return response.data
  },
}

export const discussionsAPI = {
  getAll: async () => {
    const response = await api.get("/discussions")
    return response.data
  },

  create: async (discussionData) => {
    const response = await api.post("/discussions", discussionData)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/discussions/${id}`)
    return response.data
  },
}

export const authAPI = {
  register: async (userData) => {
    const existingUsers = await api.get(`/users?email=${userData.email}`)
    if (existingUsers.data.length > 0) {
      throw new Error("Cet email est déjà utilisé")
    }

    const response = await api.post("/users", {
      ...userData,
      createdAt: new Date().toISOString(),
    })
    return response.data
  },

  login: async (email, password) => {
    const response = await api.get(`/users?email=${email}&password=${password}`)
    if (response.data.length > 0) {
      return response.data[0]
    }
    throw new Error("Email ou mot de passe incorrect")
  },

  checkEmailExists: async (email) => {
    const response = await api.get(`/users?email=${email}`)
    return response.data.length > 0
  },
}

export default api
