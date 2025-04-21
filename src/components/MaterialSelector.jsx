// src/components/MaterialSelector.jsx
import React, { useState } from 'react';
import { useDesign } from '../contexts/DesignContext';
import '../styles/MaterialSelector.css';
const MaterialSelector = () => {
  const { materials, selectMaterial, design, isLoading } = useDesign();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Filter materials based on search and type filter
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || material.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Get unique material types for filter dropdown
  const materialTypes = ['all', ...new Set(materials.map(m => m.type))];

  // Group materials by category
  const groupedMaterials = filteredMaterials.reduce((groups, material) => {
    const category = material.category || 'Other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(material);
    return groups;
  }, {});

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '1rem' }}>
      <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Materials</h2>
      
      {/* Search and filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search materials..."
          style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isLoading}
        />
        
        <select
          style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          disabled={isLoading}
        >
          {materialTypes.map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      {/* Currently selected material */}
      {design.selectedMaterial && (
        <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#ebf8ff', border: '1px solid #bee3f8', borderRadius: '0.375rem' }}>
          <h3 style={{ fontWeight: '500' }}>Selected Material:</h3>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
            <div 
              style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', marginRight: '0.5rem', backgroundColor: design.selectedMaterial.color }}
            ></div>
            <span>{design.selectedMaterial.name}</span>
          </div>
          <div style={{ fontSize: '0.875rem', color: '#4a5568', marginTop: '0.25rem' }}>
            {design.selectedMaterial.description}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.875rem' }}>
            <span>Cost: ${design.selectedMaterial.costPerUnit}/{design.selectedMaterial.unit}</span>
            <span>Weight: {design.selectedMaterial.weightPerUnit}g/{design.selectedMaterial.unit}</span>
          </div>
        </div>
      )}
      
      {/* Material list */}
      <div style={{ overflowY: 'auto', maxHeight: '24rem' }}>
        {Object.entries(groupedMaterials).map(([category, materials]) => (
          <div key={category} style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: '500', color: '#4a5568', marginBottom: '0.5rem' }}>{category}</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
              {materials.map(material => (
                <button
                  key={material.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0.75rem',
                    border: '1px solid',
                    borderRadius: '0.375rem',
                    transition: 'all 0.2s',
                    borderColor: design.selectedMaterial?.id === material.id ? '#4299e1' : '#e2e8f0',
                    backgroundColor: design.selectedMaterial?.id === material.id ? '#ebf8ff' : 'white',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                  }}
                  onClick={() => selectMaterial(material.id)}
                  disabled={isLoading}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div 
                      style={{ width: '1rem', height: '1rem', borderRadius: '50%', marginRight: '0.5rem', backgroundColor: material.color }}
                    ></div>
                    <span style={{ fontSize: '0.875rem', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{material.name}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#718096', marginTop: '0.25rem' }}>${material.costPerUnit}/{material.unit}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
        
        {filteredMaterials.length === 0 && (
          <div style={{ textAlign: 'center', padding: '1.5rem', color: '#a0aec0' }}>
            No materials matching your search criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialSelector;