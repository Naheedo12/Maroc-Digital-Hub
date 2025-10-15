import { createSlice } from "@reduxjs/toolkit"

const TOKEN_EXPIRATION_TIME = 30 * 60 * 1000

const isTokenExpired = (loginTime) => {
  if (!loginTime) return true
  const currentTime = new Date().getTime()
  return currentTime - loginTime > TOKEN_EXPIRATION_TIME
}

const loadUserFromStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const loginTime = localStorage.getItem("loginTime")

  if (user && loginTime && !isTokenExpired(Number.parseInt(loginTime))) {
    return { user, isAuthenticated: true }
  }

  localStorage.removeItem("user")
  localStorage.removeItem("loginTime")
  return { user: null, isAuthenticated: false }
}

const { user, isAuthenticated } = loadUserFromStorage()

const initialState = {
  user,
  isAuthenticated,
  loading: false,
  error: null,
  loginTime: localStorage.getItem("loginTime") || null,
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
      state.isAuthenticated = true
      state.user = action.payload
      state.error = null
      const loginTime = new Date().getTime()
      state.loginTime = loginTime
      localStorage.setItem("user", JSON.stringify(action.payload))
      localStorage.setItem("loginTime", loginTime.toString())
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
      state.loginTime = null
      localStorage.removeItem("user")
      localStorage.removeItem("loginTime")
    },
    checkTokenExpiration: (state) => {
      if (state.loginTime && isTokenExpired(Number.parseInt(state.loginTime))) {
        state.user = null
        state.isAuthenticated = false
        state.loginTime = null
        localStorage.removeItem("user")
        localStorage.removeItem("loginTime")
      }
    },
    registerStart: (state) => {
      state.loading = true
      state.error = null
    },
    registerSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
      state.error = null
      const loginTime = new Date().getTime()
      state.loginTime = loginTime
      localStorage.setItem("user", JSON.stringify(action.payload))
      localStorage.setItem("loginTime", loginTime.toString())
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
  checkTokenExpiration,
  registerStart,
  registerSuccess,
  registerFailure,
} = authSlice.actions

export default authSlice.reducer
