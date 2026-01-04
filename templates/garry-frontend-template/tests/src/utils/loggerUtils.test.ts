import { logger, loggerInfo } from '../../../src/utils/loggerUtils';

test('loggerInfo forwards to logger', () => {
  const spy = jest.spyOn(logger, 'info').mockImplementation(() => logger as any);
  loggerInfo('test_message', { ok: true }, 'ctx', 'file', 'fn');
  expect(spy).toHaveBeenCalled();
  spy.mockRestore();
});
