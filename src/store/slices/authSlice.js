import { createSlice } from "@reduxjs/toolkit"

const loadUserFromStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  if (user) return { user, isAuthenticated: true }
  return { user: null, isAuthenticated: false }
}

const { user, isAuthenticated } = loadUserFromStorage()

const initialState = {
  user,
  isAuthenticated,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.user = action.payload
      state.isAuthenticated = true
      state.error = null
      localStorage.setItem("user", JSON.stringify(action.payload))
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem("user")
    },
    registerStart: (state) => {
      state.loading = true
      state.error = null
    },
    registerSuccess: (state, action) => {
      state.loading = false
      state.user = action.payload
      state.isAuthenticated = true
      state.error = null
      localStorage.setItem("user", JSON.stringify(action.payload))
    },
    registerFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
} = authSlice.actions

export default authSlice.reducer
