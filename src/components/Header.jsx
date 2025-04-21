// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/header.css';
const Header = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation items
  const navigation = [
    { name: 'Dashboard', path: '/' },
    { name: 'My Designs', path: '/designs' },
    { name: 'Templates', path: '/templates' },
    { name: 'Materials', path: '/materials' },
  ];

  // Check if the current path matches the nav item path
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Toggle profile dropdown
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  };

  return (
    <header className="header" style={{ backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 60px', justifyContent: 'space-around', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', height: '64px', margin: '0', gap: '60px' }}>
          {/* Logo and desktop navigation */}
          <div style={{ display: 'flex', gap: '100px' }}>
            <div style={{ display: 'flex' }}>
              <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <svg
                  style={{ height: '32px', width: '32px', color: '#3b82f6', transition: 'transform 0.2s' }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <div style={{ marginLeft: '8px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>LeatherCraft</span>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Crafting Your Ideas</div>
                </div>
              </Link>
            </div>

            {/* Desktop navigation */}
            <nav style={{ display: 'none', marginLeft: '24px', gap: '60px' }}>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '4px 0',
                    borderBottom: '2px solid',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: isActive(item.path) ? '#1f2937' : '#6b7280',
                    borderColor: isActive(item.path) ? '#3b82f6' : 'transparent',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '60px' }}>
            <input
              type="text"
              placeholder="Search Designs..."
              style={{
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                padding: '8px',
                fontSize: '14px',
              }}
            />
            <Link
              to="/editor"
              style={{
                padding: '8px 60px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#3b82f6',
                color: 'white',
                fontSize: '14px',
                fontWeight: '500',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              Create New
            </Link>

            {/* Profile dropdown */}
            <div style={{ marginLeft: '60px', position: 'relative' }}>
              <button
                type="button"
                style={{
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={toggleProfileMenu}
              >
                <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}>
                  Open user menu
                </span>
                <div
                  style={{
                    height: '32px',
                    width: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#4b5563',
                  }}
                >
                  <svg style={{ height: '20px', width: '20px' }} fill="currentCo</svg>lor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </button>

              {/* Profile dropdown menu */}
              {isProfileMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    right: '0',
                    marginTop: '8px',
                    width: '192px',
                    borderRadius: '4px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'white',
                    zIndex: '10',
                  }}
                >
                  <div style={{ padding: '8px 0' }}>
                    <Link
                      to="/profile"
                      style={{
                        display: 'block',
                        padding: '8px 60px',
                        fontSize: '14px',
                        color: '#374151',
                        textDecoration: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/settings"
                      style={{
                        display: 'block',
                        padding: '8px 60px',
                        fontSize: '14px',
                        color: '#374151',
                        textDecoration: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Settings
                    </Link>
                  </div>
                  <div style={{ padding: '8px 0' }}>
                    <button
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px 60px',
                        fontSize: '14px',
                        color: '#374151',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onClick={() => console.log('Sign out')}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                borderRadius: '4px',
                backgroundColor: 'transparent',
                color: '#9ca3af',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={toggleMobileMenu}
            >
              <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}>
                Open main menu
              </span>
              {isMobileMenuOpen ? (
                <svg style={{ height: '24px', width: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg style={{ height: '24px', width: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;