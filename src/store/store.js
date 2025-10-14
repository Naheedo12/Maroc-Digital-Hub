import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import startupsReducer from "./slices/startupsSlice"
import eventsReducer from "./slices/eventsSlice"
import discussionsReducer from "./slices/discussionsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    startups: startupsReducer,
    events: eventsReducer,
    discussions: discussionsReducer,
  },
})
