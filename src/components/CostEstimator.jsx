// src/components/CostEstimator.jsx
import React from 'react';
import { useDesign } from '../contexts/DesignContext';

const CostEstimator = () => {
  const { 
    design, 
    costEstimate, 
    calculateCostEstimate, 
    isLoading, 
    error 
  } = useDesign();

  const calculateVolume = () => {
    const { width, height, depth } = design.dimensions;
    return width * height * depth;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleCalculate = () => {
    calculateCostEstimate();
  };

  const canCalculate = design.selectedMaterial && design.elements.length > 0;

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '16px',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px' }}>Cost Estimator</h2>
      
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontWeight: '500', color: '#4A5568', marginBottom: '8px' }}>Design Dimensions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '8px' }}>
          {['Width', 'Height', 'Depth'].map((dim, index) => (
            <div key={index} style={{
              textAlign: 'center',
              padding: '8px',
              backgroundColor: '#F7FAFC',
              borderRadius: '4px'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#A0AEC0' }}>{dim}</div>
              <div style={{ fontWeight: '500' }}>
                {design.dimensions[dim.toLowerCase()]}mm
              </div>
            </div>
          ))}
        </div>
        <div style={{
          textAlign: 'center',
          padding: '8px',
          backgroundColor: '#F7FAFC',
          borderRadius: '4px'
        }}>
          <div style={{ fontSize: '0.875rem', color: '#A0AEC0' }}>Volume</div>
          <div style={{ fontWeight: '500' }}>{calculateVolume()} mm³</div>
        </div>
      </div>
      
      {!design.selectedMaterial && (
        <div style={{
          marginBottom: '16px',
          padding: '12px',
          backgroundColor: '#FEF3C7',
          border: '1px solid #FDE68A',
          borderRadius: '4px',
          fontSize: '0.875rem'
        }}>
          Please select a material to calculate costs
        </div>
      )}
      
      {design.selectedMaterial && design.elements.length === 0 && (
        <div style={{
          marginBottom: '16px',
          padding: '12px',
          backgroundColor: '#FEF3C7',
          border: '1px solid #FDE68A',
          borderRadius: '4px',
          fontSize: '0.875rem'
        }}>
          Add some elements to your design to calculate costs
        </div>
      )}
      
      <button
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '4px',
          backgroundColor: canCalculate ? '#4299E1' : '#E2E8F0',
          color: canCalculate ? 'white' : '#A0AEC0',
          cursor: canCalculate && !isLoading ? 'pointer' : 'not-allowed',
          transition: 'background-color 0.3s'
        }}
        onClick={handleCalculate}
        disabled={!canCalculate || isLoading}
      >
        {isLoading ? 'Calculating...' : 'Calculate Estimate'}
      </button>
      
      {error && (
        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#FED7D7',
          border: '1px solid #FEB2B2',
          borderRadius: '4px',
          fontSize: '0.875rem',
          color: '#C53030'
        }}>
          {error}
        </div>
      )}
      
      {costEstimate && !error && (
        <div style={{ marginTop: '16px' }}>
          <h3 style={{ fontWeight: '500', color: '#4A5568', marginBottom: '8px' }}>Cost Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px',
              backgroundColor: '#F7FAFC',
              borderRadius: '4px'
            }}>
              <span>Material ({design.selectedMaterial.name})</span>
              <span>{formatCurrency(costEstimate.materialCost)}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px',
              backgroundColor: '#F7FAFC',
              borderRadius: '4px'
            }}>
              <span>Manufacturing</span>
              <span>{formatCurrency(costEstimate.manufacturingCost)}</span>
            </div>
            {costEstimate.additionalCosts && costEstimate.additionalCosts.map(cost => (
              <div key={cost.name} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px',
                backgroundColor: '#F7FAFC',
                borderRadius: '4px'
              }}>
                <span>{cost.name}</span>
                <span>{formatCurrency(cost.amount)}</span>
              </div>
            ))}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px',
              backgroundColor: '#EBF8FF',
              border: '1px solid #90CDF4',
              borderRadius: '4px',
              fontWeight: '500'
            }}>
              <span>Total Estimate</span>
              <span>{formatCurrency(costEstimate.totalCost)}</span>
            </div>
          </div>
          {costEstimate.notes && (
            <div style={{ marginTop: '12px', fontSize: '0.875rem', color: '#4A5568' }}>
              <div style={{ fontWeight: '500' }}>Notes:</div>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '4px' }}>
                {costEstimate.notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CostEstimator;