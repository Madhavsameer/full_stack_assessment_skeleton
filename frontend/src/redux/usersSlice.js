import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: null,
    selectedUserId: null,
    loading: false
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setSelectedUserId: (state, action) => {
      state.selectedUserId = action.payload;
    },
  },
})

export const { setUsers, setSelectedUserId } = usersSlice.actions;

export default usersSlice.reducer;