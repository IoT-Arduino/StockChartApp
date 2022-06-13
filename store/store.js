import create from 'zustand'


const useStore = create((set) => ({
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
  
}))

export default useStore
