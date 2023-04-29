

import { configureStore } from '@reduxjs/toolkit'
import rootReducer, { RootState } from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export default store

// import { create } from 'zustand'

// // Types
// import { EditedMarker, EditedComments } from '../types/StoreTypes'

// type State = {
//   editedComment: EditedComments
//   editedMarker: EditedMarker
//   updateEditedComment: (payload: EditedComments) => void
//   updateEditedMarker: (payload: EditedMarker) => void
//   resetEditedComment: () => void
//   resetEditedMarker: () => void
// }

// const useStore = create<State>((set) => ({
//   // Comment
//   editedComment: { ticker: '', date: '', memo: '', id: null },
//   updateEditedComment: (payload) =>
//     set({
//       editedComment: {
//         ticker: payload.ticker,
//         date: payload.date,
//         memo: payload.memo,
//         id: payload.id,
//       },
//     }),
//   resetEditedComment: () => set({ editedComment: { ticker: '', date: '', memo: '', id: null  } }),

//   // Marker
//   editedMarker: { ticker: '', date: '', memo: '', id: null },
//   updateEditedMarker: (payload) =>
//     set({
//       editedMarker: {
//         ticker: payload.ticker,
//         date: payload.date,
//         memo: payload.memo,
//         id: payload.id,
//       },
//     }),
//   resetEditedMarker: () => set({ editedMarker: { ticker: '', date: '', memo: '' , id: null } }),
// }))

// export default useStore
