import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EditedComment, EditedMarker } from '../types/StoreTypes'

interface EditInfoState {
  editedComment: EditedComment
  editedMarker: EditedMarker
}

const initialState: EditInfoState = {
  editedComment: { ticker: '', date: '', memo: '', id: null },
  editedMarker: { ticker: '', date: '', memo: '', id: null },
}

const editInfoSlice = createSlice({
  name: 'editInfo',
  initialState,
  reducers: {
    updateEditedComment: (state, action: PayloadAction<EditedComment>) => {
      state.editedComment = action.payload
    },
    resetEditedComment: (state) => {
      state.editedComment = { ticker: '', date: '', memo: '', id: null }
    },
    updateEditedMarker: (state, action: PayloadAction<EditedMarker>) => {
      state.editedMarker = action.payload
    },
    resetEditedMarker: (state) => {
      state.editedMarker = { ticker: '', date: '', memo: '', id: null }
    },
  },
})

export const { updateEditedComment, resetEditedComment, updateEditedMarker, resetEditedMarker } =
  editInfoSlice.actions

export default editInfoSlice.reducer
