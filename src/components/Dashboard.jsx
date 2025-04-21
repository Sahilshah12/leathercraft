// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDesign } from '../contexts/DesignContext';

const Dashboard = () => {
  // Removed unused destructuring of useDesign
  const [designs, setDesigns] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [isLoadingDesigns, setIsLoadingDesigns] = useState(true);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await fetch('/api/designs');
        const data = await response.json();
        setDesigns(data);
      } catch (error) {
        console.error('Error fetching designs:', error);
      } finally {
        setIsLoadingDesigns(false);
      }
    };

    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/templates/featured');
        const data = await response.json();
        setTemplates(data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchDesigns();
    fetchTemplates();

    setTimeout(() => {
      setDesigns([
        { id: '1', name: 'Chair Design', thumbnail: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&h=200', lastModified: '2025-03-15', status: 'completed' },
        { id: '2', name: 'Table Design', thumbnail: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&h=200', lastModified: '2025-03-12', status: 'in_progress' },
        { id: '3', name: 'Bookshelf', thumbnail: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&h=200', lastModified: '2025-03-10', status: 'completed' },
        { id: '4', name: 'Cabinet Draft', thumbnail: 'https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&h=200', lastModified: '2025-03-05', status: 'draft' },
      ]);

      setTemplates([
        { id: 't1', name: 'Modern Chair', thumbnail: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&h=200', category: 'Furniture' },
        { id: 't2', name: 'Simple Table', thumbnail: 'https://images.pexels.com/photos/1866147/pexels-photo-1866147.jpeg?auto=compress&cs=tinysrgb&h=200', category: 'Furniture' },
        { id: 't3', name: 'Minimalist Shelf', thumbnail: 'https://images.pexels.com/photos/276725/pexels-photo-276725.jpeg?auto=compress&cs=tinysrgb&h=200', category: 'Storage' },
      ]);

      setIsLoadingDesigns(false);
    }, 500);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'completed':
        return { backgroundColor: '#d1fae5', color: '#065f46', padding: '2px 8px', borderRadius: '12px', fontSize: '12px' };
      case 'in_progress':
        return { backgroundColor: '#bfdbfe', color: '#1e40af', padding: '2px 8px', borderRadius: '12px', fontSize: '12px' };
      case 'draft':
        return { backgroundColor: '#e5e7eb', color: '#374151', padding: '2px 8px', borderRadius: '12px', fontSize: '12px' };
      default:
        return { backgroundColor: '#e5e7eb', color: '#374151', padding: '2px 8px', borderRadius: '12px', fontSize: '12px' };
    }
  };

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Welcome to your Design Dashboard</h1>
        <p style={{ color: '#6b7280', marginBottom: '16px' }}>Manage your designs, start new projects, or use templates to kickstart your work.</p>
        <Link
          to="/editor"
          style={{
            display: 'inline-block',
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            fontWeight: '500',
            padding: '8px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#2563eb')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#3b82f6')}
        >
          Create New Design
        </Link>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Your Recent Designs</h2>
          <Link
            to="/designs"
            style={{ color: '#3b82f6', textDecoration: 'none', transition: 'color 0.3s' }}
            onMouseEnter={(e) => (e.target.style.color = '#2563eb')}
            onMouseLeave={(e) => (e.target.style.color = '#3b82f6')}
          >
            View All
          </Link>
        </div>

        {isLoadingDesigns ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '160px' }}>
            <div style={{ width: '48px', height: '48px', border: '4px solid #3b82f6', borderTop: '4px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          </div>
        ) : designs.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {designs.map((design) => (
              <div key={design.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                <img
                  src={design.thumbnail || '/placeholder/300/200'}
                  alt={design.name}
                  style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                />
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontWeight: '500' }}>{design.name}</h3>
                    <span style={getStatusBadgeStyle(design.status)}>
                      {design.status === 'in_progress' ? 'In Progress' : design.status.charAt(0).toUpperCase() + design.status.slice(1)}
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>Last modified: {formatDate(design.lastModified)}</p>
                  <Link
                    to={`/editor/${design.id}`}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      backgroundColor: '#ffffff',
                      border: '1px solid #d1d5db',
                      color: '#374151',
                      fontWeight: '500',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#f9fafb')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#ffffff')}
                  >
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '48px', border: '1px dashed #d1d5db', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#6b7280', marginBottom: '8px' }}>No designs yet</h3>
            <p style={{ color: '#9ca3af', marginBottom: '16px' }}>Create your first design to get started</p>
            <Link
              to="/editor"
              style={{
                display: 'inline-block',
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                fontWeight: '500',
                padding: '8px 16px',
                borderRadius: '4px',
                textDecoration: 'none',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#2563eb')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#3b82f6')}
            >
              Create New Design
            </Link>
          </div>
        )}
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Featured Templates</h2>
          <Link
            to="/templates"
            style={{ color: '#3b82f6', textDecoration: 'none', transition: 'color 0.3s' }}
            onMouseEnter={(e) => (e.target.style.color = '#2563eb')}
            onMouseLeave={(e) => (e.target.style.color = '#3b82f6')}
          >
            Browse All
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {templates.map((template) => (
            <div key={template.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <img
                src={template.thumbnail || '/placeholder/300/200'}
                alt={template.name}
                style={{ width: '100%', height: '160px', objectFit: 'cover' }}
              />
              <div style={{ padding: '16px' }}>
                <h3 style={{ fontWeight: '500', marginBottom: '8px' }}>{template.name}</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>{template.category}</p>
                <Link
                  to={`/editor?templateId=${template.id}`}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    backgroundColor: '#ffffff',
                    border: '1px solid #d1d5db',
                    color: '#374151',
                    fontWeight: '500',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#f9fafb')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#ffffff')}
                >
                  Use Template
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

