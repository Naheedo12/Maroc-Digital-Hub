import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  startups: [],
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 6,
  selectedSector: "Tous",
}

const startupsSlice = createSlice({
  name: "startups",
  initialState,
  reducers: {
    fetchStartupsStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchStartupsSuccess: (state, action) => {
      state.loading = false
      state.startups = action.payload
      state.error = null
    },
    fetchStartupsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    addStartup: (state, action) => {
      state.startups.push(action.payload)
    },
    deleteStartup: (state, action) => {
      state.startups = state.startups.filter((startup) => startup.id !== action.payload)
    },
    updateStartup: (state, action) => {
      const index = state.startups.findIndex((startup) => startup.id === action.payload.id)
      if (index !== -1) {
        state.startups[index] = action.payload
      }
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setSelectedSector: (state, action) => {
      state.selectedSector = action.payload
      state.currentPage = 1
    },
  },
})

export const {
  fetchStartupsStart,
  fetchStartupsSuccess,
  fetchStartupsFailure,
  addStartup,
  deleteStartup,
  updateStartup,
  setCurrentPage,
  setSelectedSector,
} = startupsSlice.actions

export default startupsSlice.reducer
