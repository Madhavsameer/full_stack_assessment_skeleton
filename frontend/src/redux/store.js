import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice';
import homeReducer from './homeSlice';
import paginationReducer from './paginationSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    homes: homeReducer,
    pagination: paginationReducer
  },
})