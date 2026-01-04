import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodoState {
  todos: { id: string; text: string; done: boolean }[];
}

const initialState: TodoState = { todos: [] };

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add(state, action: PayloadAction<{ id: string; text: string }>) {
      state.todos.push({ id: action.payload.id, text: action.payload.text, done: false });
    },
    toggle(state, action: PayloadAction<{ id: string }>) {
      const t = state.todos.find((x) => x.id === action.payload.id);
      if (t) t.done = !t.done;
    }
  }
});

export const { add, toggle } = todoSlice.actions;
export default todoSlice.reducer;
