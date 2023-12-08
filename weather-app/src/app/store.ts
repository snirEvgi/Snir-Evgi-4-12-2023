import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import weatherSlice from "../app/pages/HomePage/weatherSlice"
import { themeReducer } from "./UI-components/Themeswitcher/themeSlice"

export const store = configureStore({
  reducer: {
    weather: weatherSlice,
    theme:themeReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
