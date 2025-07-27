import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./Layout.css";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
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
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `tab-button ${isActive ? "active" : ""}`
            }
          >
            내 건강
          </NavLink>
          <NavLink
            to="/records"
            className={({ isActive }) =>
              `tab-button ${isActive ? "active" : ""}`
            }
          >
            진료기록
          </NavLink>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
