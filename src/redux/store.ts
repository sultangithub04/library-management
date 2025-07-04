import { configureStore } from '@reduxjs/toolkit'
import { bookApi } from './api/booksapi';
// ...

export const store = configureStore({
 reducer: {
    // Add the generated reducer as a specific top-level slice
[bookApi.reducerPath]: bookApi.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
middleware:(getDefauldMiddleware)=>{
return getDefauldMiddleware().concat(bookApi.middleware)
}
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store;