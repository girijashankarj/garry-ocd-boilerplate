import todoReducer, { addTodo } from '../../../src/store/todoSlice';

test('todo slice reducer adds item', () => {
  const state = todoReducer({ items: [] }, addTodo('test'));
  expect(state.items).toContain('test');
});
