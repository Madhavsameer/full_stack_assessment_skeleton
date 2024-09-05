import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'homes',
  initialState: {
    homes: [],
    refresh: false,
    loading: false
  },
  reducers: {
    setHomes: (state, action) => {
      state.homes = action.payload;
    },
    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },
  },
})

export const { setHomes, setRefresh } = homeSlice.actions;

export default homeSlice.reducer;