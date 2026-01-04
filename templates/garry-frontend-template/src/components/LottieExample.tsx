import React from 'react';
import Lottie from 'lottie-react';
import sampleAnimation from '../assets/animations/sample.json';

export default function LottieExample() {
  return <Lottie animationData={sampleAnimation} style={{ width: 300, height: 300 }} />;
}
