import React from 'react';
import { render } from '@testing-library/react';
import LottieExample from '../../../src/components/LottieExample';

test('lottie example renders', () => {
  const { container } = render(<LottieExample />);
  expect(container).toBeTruthy();
});
