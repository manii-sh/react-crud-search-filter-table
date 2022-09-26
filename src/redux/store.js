import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import employeeReducer from "../redux/reducers/employeeReducer";

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  employees: employeeReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;