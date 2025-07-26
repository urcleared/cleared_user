import React from 'react';
import './App.css';
import DatabaseTest from './components/DatabaseTest';

function App() {
  return (
    <div className="App">
      <div className="mobile-wrapper">
        <div className="app-container">
          <header className="app-header">
            <h1>Cleared</h1>
            <p style={{ fontSize: '16px', margin: '10px 0 0 0', opacity: 0.9 }}>
              Database Connection Test
            </p>
          </header>
          <main className="app-content" style={{ padding: '0', alignItems: 'stretch', justifyContent: 'flex-start' }}>
            <DatabaseTest />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
