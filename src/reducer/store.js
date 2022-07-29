import { configureStore ,getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import taskReducer from "./taskSlice";

export default configureStore({
    reducer: {
      user: userReducer,
      task: taskReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  });