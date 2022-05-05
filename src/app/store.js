import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../components/tables/postsSlice'

export default configureStore({
  reducer: {
     posts: postsReducer,
  },
})
