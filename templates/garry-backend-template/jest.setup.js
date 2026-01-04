// jest setup for backend template
try {
  require.resolve('axios');
  jest.mock('axios');
} catch (err) {
  // axios not installed in this template; ignore
}
