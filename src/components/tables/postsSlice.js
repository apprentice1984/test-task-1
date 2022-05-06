import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    filterPosts(state, { payload }) {
      state.posts = state.posts.filter(
        (post) =>
          post.title.includes(payload) ||
          post.body.includes(payload) ||
          post.id.toString().includes(payload)
      )
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { filterPosts } = postsSlice.actions

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch(POSTS_URL)
  const data = await response.json()
  return data
})

export default postsSlice.reducer

export const selectAllPosts = (state) => state.posts.posts
