import React, { useState } from 'react';
import './styles.css';
import LottieExample from './components/LottieExample';

export default function App() {
  const [dark, setDark] = useState(false);
  return (
    <div className={dark ? 'theme-dark' : 'theme-light'}>
      <div className="container">
        <h1>Garry OCD Boilerplate — Example App</h1>
        <button onClick={() => setDark((d) => !d)}>Toggle theme</button>
        <div style={{ marginTop: 20 }}>
          <LottieExample />
        </div>
      </div>
    </div>
  );
}
