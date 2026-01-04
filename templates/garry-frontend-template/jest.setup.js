// Basic jest setup: mock external modules here
import '@testing-library/jest-dom';
jest.mock('axios');
jest.mock('lottie-react', () => () => null);
