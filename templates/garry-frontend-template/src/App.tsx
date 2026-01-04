import React, { useState } from 'react';
import './styles.css';
import UserDashboard from './components/UserDashboard';
import LottieExample from './components/LottieExample';

export default function App() {
  const [dark, setDark] = useState(false);
  return (
    <div className={dark ? 'theme-dark' : 'theme-light'}>
      <div className="container">
        <button className="toggle" onClick={() => setDark((d) => !d)}>
          Toggle theme
        </button>
        <UserDashboard />
        <div className="card" style={{ marginTop: 20 }}>
          <h2>Brand motion</h2>
          <LottieExample />
        </div>
      </div>
    </div>
  );
}
