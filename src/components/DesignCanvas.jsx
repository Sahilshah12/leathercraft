// src/components/DesignCanvas.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useDesign } from '../contexts/DesignContext';
// import '../styles/DesignCanvas.css';

const DesignCanvas = () => {
  const canvasRef = useRef(null);
  const { design, addElement, removeElement, isLoading } = useDesign();
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [selectedElement, setSelectedElement] = useState(null);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background grid
    drawGrid(ctx, canvas.width, canvas.height);
    
    // Draw design elements
    drawElements(ctx);
    
  }, [design, selectedElement]);

  // Draw grid
  const drawGrid = (ctx, width, height) => {
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    
    const gridSize = 20;
    
    // Draw vertical lines
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  // Draw design elements
  const drawElements = (ctx) => {
    design.elements.forEach(element => {
      ctx.save();
      
      // Highlight selected element
      if (selectedElement && selectedElement.id === element.id) {
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2;
      } else {
        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 1;
      }
      
      // Draw based on element type
      switch (element.type) {
        case 'rectangle':
          ctx.fillStyle = element.color || '#95a5a6';
          ctx.fillRect(element.x, element.y, element.width, element.height);
          ctx.strokeRect(element.x, element.y, element.width, element.height);
          break;
        case 'circle':
          ctx.fillStyle = element.color || '#95a5a6';
          ctx.beginPath();
          ctx.arc(element.x, element.y, element.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
        case 'line':
          ctx.beginPath();
          ctx.moveTo(element.x1, element.y1);
          ctx.lineTo(element.x2, element.y2);
          ctx.stroke();
          break;
        default:
          break;
      }
      
      ctx.restore();
    });
  };

  // Find element under the cursor
  const findElementAt = (x, y) => {
    // Search in reverse to find top-most element first
    for (let i = design.elements.length - 1; i >= 0; i--) {
      const element = design.elements[i];
      
      // Check based on element type
      switch (element.type) {
        case 'rectangle':
          if (x >= element.x && x <= element.x + element.width &&
              y >= element.y && y <= element.y + element.height) {
            return element;
          }
          break;
        case 'circle':
          const distance = Math.sqrt((x - element.x) ** 2 + (y - element.y) ** 2);
          if (distance <= element.radius) {
            return element;
          }
          break;
        // Line hit detection is more complex, simplified here
        case 'line':
          const lineWidth = 5; // Hit area width
          const dx = element.x2 - element.x1;
          const dy = element.y2 - element.y1;
          const length = Math.sqrt(dx * dx + dy * dy);
          
          // Calculate distance from point to line
          const t = ((x - element.x1) * dx + (y - element.y1) * dy) / (length * length);
          
          if (t >= 0 && t <= 1) {
            const projX = element.x1 + t * dx;
            const projY = element.y1 + t * dy;
            const distance = Math.sqrt((x - projX) ** 2 + (y - projY) ** 2);
            
            if (distance <= lineWidth) {
              return element;
            }
          }
          break;
        default:
          break;
      }
    }
    
    return null;
  };

  // Handle mouse down
  const handleMouseDown = (e) => {
    if (isLoading) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if clicking on an existing element
    const element = findElementAt(x, y);
    
    if (element) {
      setSelectedElement(element);
    } else {
      setIsDrawing(true);
      setCurrentPosition({ x, y });
      setSelectedElement(null);
    }
  };

  // Handle mouse move
  const handleMouseMove = (e) => {
    if (!isDrawing || isLoading) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Preview temporary shape
    const ctx = canvas.getContext('2d');
    
    // Redraw the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height);
    drawElements(ctx);
    
    // Draw preview shape
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 2;
    ctx.strokeRect(
      currentPosition.x, 
      currentPosition.y, 
      x - currentPosition.x, 
      y - currentPosition.y
    );
  };

  // Handle mouse up
  const handleMouseUp = (e) => {
    if (!isDrawing || isLoading) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create new element
    const newElement = {
      id: Date.now().toString(),
      type: 'rectangle',
      x: Math.min(currentPosition.x, x),
      y: Math.min(currentPosition.y, y),
      width: Math.abs(x - currentPosition.x),
      height: Math.abs(y - currentPosition.y),
      color: design.selectedMaterial ? design.selectedMaterial.color : '#95a5a6'
    };
    
    // Only add if it has meaningful dimensions
    if (newElement.width > 5 && newElement.height > 5) {
      addElement(newElement);
    }
    
    setIsDrawing(false);
  };

  // Handle key press for delete
  const handleKeyDown = (e) => {
    if (e.key === 'Delete' && selectedElement) {
      removeElement(selectedElement.id);
      setSelectedElement(null);
    }
  };

  useEffect(() => {
    // Add event listener for key presses
    window.addEventListener('keydown', handleKeyDown);
    
    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedElement]);

  return (
    <div className="relative border border-gray-300 rounded-lg overflow-hidden bg-white">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="w-full h-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      <div className="absolute bottom-4 left-4 text-sm text-gray-600">
        {selectedElement ? (
          <span>Selected: {selectedElement.type} (press Delete to remove)</span>
        ) : (
          <span>Click and drag to create a new element</span>
        )}
      </div>
    </div>
  );
};

export default DesignCanvas;