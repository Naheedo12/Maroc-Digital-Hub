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
    likeDiscussion: (state, action) => {
      const { discussionId, userId } = action.payload
      const discussion = state.discussions.find((d) => d.id === discussionId)
      if (discussion) {
        if (!discussion.likes) {
          discussion.likes = []
        }
        const hasLiked = discussion.likes.includes(userId)
        if (hasLiked) {
          discussion.likes = discussion.likes.filter((id) => id !== userId)
        } else {
          discussion.likes.push(userId)
        }
      }
    },
  },
})

export const {
  fetchDiscussionsStart,
  fetchDiscussionsSuccess,
  fetchDiscussionsFailure,
  addDiscussion,
  deleteDiscussion,
  likeDiscussion,
} = discussionsSlice.actions

export default discussionsSlice.reducer
