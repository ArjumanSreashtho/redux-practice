import { combineReducers, configureStore } from "@reduxjs/toolkit";

import tasksReducer from "./slices/task.slice";

const rootReducer = combineReducers({
  tasks: tasksReducer
})

const store = configureStore({
  reducer: rootReducer
})

export default store;
