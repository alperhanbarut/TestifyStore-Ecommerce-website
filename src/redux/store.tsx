import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./AppSlice";
import basketReducer from "./BasketSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    basket: basketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
