import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  discussions: [],
  loading: false,
  error: null,
}

const discussionsSlice = createSlice({
  name: "discussions",
  initialState,
  reducers: {
    fetchDiscussionsStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchDiscussionsSuccess: (state, action) => {
      state.loading = false
      state.discussions = action.payload
      state.error = null
    },
    fetchDiscussionsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    addDiscussion: (state, action) => {
      state.discussions.unshift(action.payload)
    },
    deleteDiscussion: (state, action) => {
      state.discussions = state.discussions.filter((discussion) => discussion.id !== action.payload)
    },
  },
})

export const {
  fetchDiscussionsStart,
  fetchDiscussionsSuccess,
  fetchDiscussionsFailure,
  addDiscussion,
  deleteDiscussion,
} = discussionsSlice.actions

export default discussionsSlice.reducer
