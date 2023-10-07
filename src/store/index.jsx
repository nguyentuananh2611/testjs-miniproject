import { configureStore, combineReducers } from "@reduxjs/toolkit";
import reducer from "./auth/store";

const rootReducer = combineReducers({
  auth: reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
