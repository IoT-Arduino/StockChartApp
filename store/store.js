import create from 'zustand'


const useStore = create((set) => ({

  // Comment
  editedComment: { ticker: '', date: '', memo: '',id:null },
  updateEditedComment: (payload) =>
    set({
      editedComment: {
        ticker: payload.ticker,
        date: payload.date,
        memo: payload.memo,
        id:payload.id,
      },
    }),
  resetEditedComment: () => set({ editedComment: { ticker: '', date: '', memo: '' } }),

  // Marker
  editedMarker: { ticker: '', date: '', memo: '',id:null },
  updateEditedMarker: (payload) =>
    set({
      editedMarker: {
        ticker: payload.ticker,
        date: payload.date,
        memo: payload.memo,
        id:payload.id,
      },
    }),
  resetEditedMarker: () => set({ editedMarker: { ticker: '', date: '', memo: '' } }),
}))

export default useStore
