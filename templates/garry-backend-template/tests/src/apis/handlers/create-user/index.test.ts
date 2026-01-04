import handler from '../../../../../src/apis/handlers/create-user';

test('create-user handler exports function', () => {
  expect(typeof handler).toBe('function');
});
