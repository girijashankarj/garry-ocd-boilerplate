import {
  modelCreateUser,
  modelDeleteUser,
  modelGetUserById,
  modelUpdateUser,
} from '../../../../../src/apis/common/utils/modelOperations';
import { User } from '../../../../../src/models/user';

beforeEach(() => {
  jest.restoreAllMocks();
});

test('modelGetUserById passes through id', async () => {
  const spy = jest.spyOn(User, 'findByPk').mockResolvedValue(null);
  await modelGetUserById(12);
  expect(spy).toHaveBeenCalledWith(12);
});

test('modelCreateUser forwards payload', async () => {
  const payload = { name: 'Ada', email: 'ada@example.com' };
  const spy = jest.spyOn(User, 'create').mockResolvedValue(payload as never);
  await modelCreateUser(payload);
  expect(spy).toHaveBeenCalledWith(payload);
});

test('modelUpdateUser returns null when missing', async () => {
  const spy = jest.spyOn(User, 'findByPk').mockResolvedValue(null);
  const res = await modelUpdateUser(1, { name: 'Ada', email: 'ada@example.com' });
  expect(spy).toHaveBeenCalledWith(1);
  expect(res).toBeNull();
});

test('modelUpdateUser updates when found', async () => {
  const update = jest.fn().mockResolvedValue({ id: 1 });
  const find = jest.spyOn(User, 'findByPk').mockResolvedValue({ update } as never);
  const payload = { name: 'Ada', email: 'ada@example.com' };
  const res = await modelUpdateUser(1, payload);
  expect(find).toHaveBeenCalledWith(1);
  expect(update).toHaveBeenCalledWith(payload);
  expect(res).toEqual({ id: 1 });
});

test('modelDeleteUser returns null when missing', async () => {
  const find = jest.spyOn(User, 'findByPk').mockResolvedValue(null);
  const res = await modelDeleteUser(5);
  expect(find).toHaveBeenCalledWith(5);
  expect(res).toBeNull();
});

test('modelDeleteUser destroys when found', async () => {
  const destroy = jest.fn().mockResolvedValue(undefined);
  const find = jest.spyOn(User, 'findByPk').mockResolvedValue({ destroy } as never);
  const res = await modelDeleteUser(5);
  expect(find).toHaveBeenCalledWith(5);
  expect(destroy).toHaveBeenCalled();
  expect(res).toEqual({ id: 5 });
});
