import axios from "axios"

const API_URL = "http://localhost:5000"

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
})

export const startupsAPI = {
  getAll: async () => (await api.get("/startups")).data,
  getById: async (id) => (await api.get(`/startups/${id}`)).data,
  create: async (data) => (await api.post("/startups", data)).data,
  update: async (id, data) => (await api.put(`/startups/${id}`, data)).data,
  delete: async (id) => (await api.delete(`/startups/${id}`)).data,
}

export const eventsAPI = {
  getAll: async () => (await api.get("/events")).data,
  getById: async (id) => (await api.get(`/events/${id}`)).data,
  create: async (data) => (await api.post("/events", data)).data,
  update: async (id, data) => (await api.put(`/events/${id}`, data)).data,
  delete: async (id) => (await api.delete(`/events/${id}`)).data,
}

export const discussionsAPI = {
  getAll: async () => (await api.get("/discussions")).data,
  create: async (data) => (await api.post("/discussions", data)).data,
  update: async (id, data) => (await api.put(`/discussions/${id}`, data)).data,
  delete: async (id) => (await api.delete(`/discussions/${id}`)).data,
}

export const authAPI = {
  register: async (userData) => {
    const existing = await api.get(`/users?email=${userData.email}`)
    if (existing.data.length > 0) throw new Error("Cet email est déjà utilisé")

    const newUser = { ...userData, createdAt: new Date().toISOString() }
    return (await api.post("/users", newUser)).data
  },

  login: async (email, password) => {
    const res = await api.get(`/users?email=${email}&password=${password}`)
    if (res.data.length === 0) throw new Error("Email ou mot de passe incorrect")
    return res.data[0]
  },

  checkEmailExists: async (email) => {
    const res = await api.get(`/users?email=${email}`)
    return res.data.length > 0
  },
}

export default api
