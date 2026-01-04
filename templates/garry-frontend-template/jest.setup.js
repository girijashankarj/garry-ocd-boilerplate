// Basic jest setup: mock external modules here
import '@testing-library/jest-dom';
try {
  require.resolve('axios');
  jest.mock('axios');
} catch (err) {
  // axios not installed in this template; ignore
}
jest.mock('lottie-react', () => () => null);
