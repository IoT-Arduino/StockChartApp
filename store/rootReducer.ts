import { combineReducers } from '@reduxjs/toolkit'
import editInfoSlice from './editInfoSlice'

const rootReducer = combineReducers({
  editInfo: editInfoSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
