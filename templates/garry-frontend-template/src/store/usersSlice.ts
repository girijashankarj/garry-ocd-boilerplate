import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../common/types';

interface UsersState {
  items: User[];
}

const initialState: UsersState = { items: [] };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.items = action.payload;
    },
    addUser(state, action: PayloadAction<User>) {
      state.items.push(action.payload);
    },
    updateUser(state, action: PayloadAction<User>) {
      const idx = state.items.findIndex((u) => u.id === action.payload.id);
      if (idx >= 0) state.items[idx] = action.payload;
    },
    removeUser(state, action: PayloadAction<string>) {
      state.items = state.items.filter((u) => u.id !== action.payload);
    },
  },
});

export const { setUsers, addUser, updateUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
