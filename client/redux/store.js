import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./reducers/accountReducer";
import contractReducer from "./reducers/contractReducer";
import { combineReducers } from "redux";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  timeout: 1000,
  key: "root",
  version: 1,
  storage,
  blacklist: ["contract"],
};

const rootReducer = combineReducers({
  account: accountReducer,
  contract: contractReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
