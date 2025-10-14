import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  events: [],
  loading: false,
  error: null,
  userEvents: [],
}

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    fetchEventsStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchEventsSuccess: (state, action) => {
      state.loading = false
      state.events = action.payload
      state.error = null
    },
    fetchEventsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    addEvent: (state, action) => {
      state.events.push(action.payload)
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter((event) => event.id !== action.payload)
    },
    updateEvent: (state, action) => {
      const index = state.events.findIndex((event) => event.id === action.payload.id)
      if (index !== -1) {
        state.events[index] = action.payload
      }
    },
    participateInEvent: (state, action) => {
      const { eventId, userId } = action.payload
      const event = state.events.find((e) => e.id === eventId)
      if (event && !event.participants.includes(userId)) {
        event.participants.push(userId)
      }
    },
    unparticipateFromEvent: (state, action) => {
      const { eventId, userId } = action.payload
      const event = state.events.find((e) => e.id === eventId)
      if (event) {
        event.participants = event.participants.filter((id) => id !== userId)
      }
    },
    setUserEvents: (state, action) => {
      state.userEvents = action.payload
    },
  },
})

export const {
  fetchEventsStart,
  fetchEventsSuccess,
  fetchEventsFailure,
  addEvent,
  deleteEvent,
  updateEvent,
  participateInEvent,
  unparticipateFromEvent,
  setUserEvents,
} = eventsSlice.actions

export default eventsSlice.reducer
