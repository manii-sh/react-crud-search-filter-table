import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../redux/reducers/employeeReducer";

const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

export default store;