import React, { useContext, useState, useEffect } from 'react';
import { DesignContext } from '../contexts/DesignContext';
import { fetchTemplates } from '../services/api';
import '../styles/TemplateLibrary.css';

const TemplateLibrary = () => {
  const { updateDesign } = useContext(DesignContext);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const data = await fetchTemplates();
        setTemplates(data);
      } catch (error) {
        console.error('Error loading templates:', error);
        // Fallback to sample templates if API fails
        setTemplates([
          {
            _id: '1',
            name: 'Classic Wallet',
            type: 'wallet',
            thumbnail: 'https://via.placeholder.com/150?text=Wallet',
            dimensions: { width: 220, height: 100, depth: 10 },
            components: [
              { type: 'pocket', name: 'Card Pocket', width: 90, height: 60, x: 30, y: 20, color: '#b08968' },
              { type: 'pocket', name: 'Cash Pocket', width: 200, height: 90, x: 10, y: 5, color: '#b08968' }
            ]
          },
          {
            _id: '2',
            name: 'Tote Bag',
            type: 'bag',
            thumbnail: 'https://via.placeholder.com/150?text=Bag',
            dimensions: { width: 400, height: 350, depth: 120 },
            components: [
              { type: 'strap', name: 'Handle', width: 30, height: 150, x: 100, y: 20, color: '#8B4513' },
              { type: 'strap', name: 'Handle', width: 30, height: 150, x: 270, y: 20, color: '#8B4513' },
              { type: 'pocket', name: 'Inside Pocket', width: 150, height: 120, x: 125, y: 100, color: '#A0522D' }
            ]
          },
          {
            _id: '3',
            name: 'Simple Belt',
            type: 'belt',
            thumbnail: 'https://via.placeholder.com/150?text=Belt',
            dimensions: { width: 800, height: 40, depth: 4 },
            components: [
              { type: 'button', name: 'Buckle Hole', radius: 5, x: 100, y: 20, color: '#000000' },
              { type: 'button', name: 'Buckle Hole', radius: 5, x: 150, y: 20, color: '#000000' },
              { type: 'button', name: 'Buckle Hole', radius: 5, x: 200, y: 20, color: '#000000' }
            ]
          },
          {
            _id: '4',
            name: 'Crossbody Bag',
            type: 'bag',
            thumbnail: 'https://via.placeholder.com/150?text=Crossbody+Bag',
            dimensions: { width: 300, height: 250, depth: 80 },
            components: [
              { type: 'strap', name: 'Shoulder Strap', width: 20, height: 200, x: 50, y: 10, color: '#8B4513' },
              { type: 'zipper', name: 'Top Zipper', width: 250, height: 10, x: 25, y: 30, color: '#696969' },
              { type: 'pocket', name: 'Front Pocket', width: 120, height: 100, x: 90, y: 100, color: '#A0522D' }
            ]
          },
          {
            _id: '5',
            name: 'Card Holder',
            type: 'wallet',
            thumbnail: 'https://via.placeholder.com/150?text=Card+Holder',
            dimensions: { width: 90, height: 60, depth: 5 },
            components: [
              { type: 'pocket', name: 'Card Slot', width: 80, height: 50, x: 5, y: 5, color: '#b08968' }
            ]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    loadTemplates();
  }, []);
  
  const applyTemplate = (template) => {
    updateDesign({
      type: template.type,
      dimensions: template.dimensions,
      components: template.components
    });
  };
  
  const filteredTemplates = filter === 'all' 
    ? templates 
    : templates.filter(template => template.type === filter);
  
  if (loading) {
    return <div className="p-4 text-center">Loading templates...</div>;
  }
  
  return (
    <div style={{ padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Template Library</h2>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              backgroundColor: filter === 'all' ? '#3b82f6' : '#e5e7eb',
              color: filter === 'all' ? '#ffffff' : '#000000',
              cursor: 'pointer',
              border: 'none',
              transition: 'background-color 0.2s'
            }}
          >
            All
          </button>
          <button
            onClick={() => setFilter('wallet')}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              backgroundColor: filter === 'wallet' ? '#3b82f6' : '#e5e7eb',
              color: filter === 'wallet' ? '#ffffff' : '#000000',
              cursor: 'pointer',
              border: 'none',
              transition: 'background-color 0.2s'
            }}
          >
            Wallets
          </button>
          <button
            onClick={() => setFilter('bag')}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              backgroundColor: filter === 'bag' ? '#3b82f6' : '#e5e7eb',
              color: filter === 'bag' ? '#ffffff' : '#000000',
              cursor: 'pointer',
              border: 'none',
              transition: 'background-color 0.2s'
            }}
          >
            Bags
          </button>
          <button
            onClick={() => setFilter('belt')}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              backgroundColor: filter === 'belt' ? '#3b82f6' : '#e5e7eb',
              color: filter === 'belt' ? '#ffffff' : '#000000',
              cursor: 'pointer',
              border: 'none',
              transition: 'background-color 0.2s'
            }}
          >
            Belts
          </button>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {filteredTemplates.map(template => (
          <div 
            key={template._id}
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              overflow: 'hidden',
              transition: 'box-shadow 0.2s',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer'
            }}
          >
            <div style={{ height: '192px', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', color: '#9ca3af', marginBottom: '8px' }}>
                  {template.type === 'wallet' ? '👛' : 
                   template.type === 'bag' ? '👜' : 
                   template.type === 'belt' ? '🧵' : '🧶'}
                </div>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>
                  {template.dimensions.width} × {template.dimensions.height} mm
                </p>
              </div>
            </div>
            
            <div style={{ padding: '16px' }}>
              <h3 style={{ fontWeight: '500', fontSize: '18px' }}>{template.name}</h3>
              <p style={{ color: '#4b5563', fontSize: '14px', marginBottom: '16px' }}>
                {template.components.length} components • {template.type}
              </p>
              
              <button
                onClick={() => applyTemplate(template)}
                style={{
                  width: '100%',
                  padding: '8px 0',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                Apply Template
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredTemplates.length === 0 && (
        <div style={{ padding: '32px 0', textAlign: 'center', color: '#6b7280' }}>
          <p>No templates found for this category.</p>
        </div>
      )}
    </div>
  );
};

export default TemplateLibrary;