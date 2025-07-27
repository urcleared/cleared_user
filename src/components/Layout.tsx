import React, { useState } from 'react';
import './Layout.css';

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'record'>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="content-section">
            <h2>내 건강</h2>
            <p>다가오는 진료 예약, 건강 요약, 빠른 작업을 확인할 수 있습니다.</p>
            <div className="mock-card">
              <h3>Next Appointment</h3>
              <p>Dr. 김의사 - Tomorrow 2:00 PM</p>
            </div>
            <div className="mock-card">
              <h3>Recent Activity</h3>
              <p>Blood test completed - 3 days ago</p>
            </div>
            <div className="mock-card">
              <h3>Health Summary</h3>
              <p>All vitals normal</p>
            </div>
            {/* Add lots of content to test scrolling */}
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="mock-card">
                <h4>Sample Content {i + 1}</h4>
                <p>This is sample content to test the sticky navigation behavior when scrolling.</p>
              </div>
            ))}
          </div>
        );
      case 'record':
        return (
          <div className="content-section">
            <h2>진료기록</h2>
            <p>진료 기록, 검사 결과, 처방전을 확인할 수 있습니다.</p>
            <div className="mock-card">
              <h3>Recent Lab Results</h3>
              <p>Blood Test - Normal values</p>
            </div>
            <div className="mock-card">
              <h3>Prescriptions</h3>
              <p>Vitamin D supplement - Take daily</p>
            </div>
            <div className="mock-card">
              <h3>Visit History</h3>
              <p>Last visit: 2024-01-15</p>
            </div>
            {/* Add lots of content to test scrolling */}
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i} className="mock-card">
                <h4>Medical Record {i + 1}</h4>
                <p>This is sample medical record content to test the sticky navigation behavior.</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="layout">
      {/* Sticky Header */}
      <header className="header">
        {/* Top Navigation Bar */}
        <div className="top-nav">
          <div className="logo">
            <img src="/logo-cleared.png" alt="Cleared" className="logo-image" />
          </div>
          <button className="hamburger-menu">
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </button>
        </div>

        {/* Tab Navigator */}
        <nav className="tab-navigator">
          <button
            className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            내 건강
          </button>
          <button
            className={`tab-button ${activeTab === 'record' ? 'active' : ''}`}
            onClick={() => setActiveTab('record')}
          >
            진료기록
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default Layout;