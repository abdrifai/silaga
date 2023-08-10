
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./actions/auth-slice";
import currentAsnReducer from "./actions/currentAsn-slice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
     reducer: {
          auth: authReducer,
          currentAsn: currentAsnReducer,
     }
});



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch = () => useDispatch<AppDispatch>();