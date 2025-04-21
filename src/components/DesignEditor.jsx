// components/DesignEditor.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDesignContext } from '../contexts/DesignContext';

// Editor sidebar tabs
const TABS = {
  ELEMENTS: 'materials',
  UPLOADS: 'uploads',
  TEXT: 'text',
  BACKGROUND: 'background',
};

// Sample elements for the editor
const LEATHER_MATERIALS = {
  fullGrain: [
    {
      id: 'full-grain-1',
      type: 'full-grain',
      name: 'Vegetable Tanned Full Grain',
      image: 'https://buyleatheronline.com/img/cms/cuoio-vegetale-vs-pelle-al-cromo.jpg'
    },
    {
      id: 'full-grain-2',
      type: 'full-grain',
      name: 'Chrome Tanned Full Grain',
      image: 'https://buyleatheronline.com/img/cms/crosta-vs-fiore.jpg',
    },
  
  ],

 

  suede: [
    {
      id: 'suede-1',
      type: 'suede',
      name: 'Split Suede',
      image: 'https://buyleatheronline.com/548-home_default/suede-chamois-leather.jpg',
    },
    {
      id: 'suede-2',
      type: 'suede',
      name: 'Nubuck Suede',
      image: 'https://www.birkenstock.com/us/kyoto-nubuck%2Fsuede-leather/kyoto-suede-nubucksuedeleather-0-eva-u.html?dwvar_kyoto-suede-nubucksuedeleather-0-eva-u_color=27',
    },
    {
      id: 'suede-3',
      type: 'suede',
      name: 'Velour Suede',
      image: 'https://buyleatheronline.com/1719-home_default/suede-velour-full-grain-leather.jpg',
    },
    {
      id: 'suede-4',
      type: 'suede',
      name: 'Embossed Suede',
      image: 'https://buyleatheronline.com/9787-home_default/semi-glossy-lizard-printed-calfskin-leather.jpg',
    },
  ],

  exoticLeathers: [
    {
      id: 'exotic-1',
      type: 'exotic',
      name: 'Alligator',
      image: 'https://buyleatheronline.com/9858-lightbox_default/genuine-alligator-leather.jpg',
    },
    {
      id: 'exotic-2',
      type: 'exotic',
      name: 'Ostrich',
      image: 'https://buyleatheronline.com/10613-home_default/genuine-ostrich-leather-hides.jpg',
    },
    {
      id: 'exotic-3',
      type: 'exotic',
      name: 'Stingray',
      image: 'https://buyleatheronline.com/6661-home_default/genuine-stingray-leather-skin.jpg',
    },
    {
      id: 'exotic-4',
      type: 'exotic',
      name: 'Python',
      image: 'https://buyleatheronline.com/8402-home_default/genuine-elaphe-snake-skin-exotic-leather.jpg',
    },
    
  ],

  specialtyFinishes: [
    {
      id: 'specialty-1',
      type: 'specialty',
      name: 'Pull-Up Leather',
      image: 'https://buyleatheronline.com/9440-home_default/oiled-vintage-goatskin-pull-up-latigo-leather.jpg',
    },
    {
      id: 'specialty-2',
      type: 'specialty',
      name: 'Patent Leather',
      image: 'https://buyleatheronline.com/6613-home_default/patent-lambskin.jpg',
    },
    {
      id: 'specialty-3',
      type: 'specialty',
      name: 'Metallic Leather',
      image: 'https://buyleatheronline.com/3700-home_default/laminated-lambskin.jpg',
    },
    {
      id: 'specialty-4',
      type: 'specialty',
      name: 'Embossed Leather',
      image: 'https://buyleatheronline.com/3560-home_default/python-embossed-patent-calf.jpg',
    },
    {
      id: 'specialty-5',
      type: 'specialty',
      name: 'Distressed Leather',
      image: 'https://buyleatheronline.com/6518-home_default/badalassi-wax-pull-up-veg-tan-shoulder.jpg',
    },
  ],

 

  tanningMethods: [
    {
      id: 'tanning-1',
      type: 'tanning',
      name: 'Vegetable Tanned',
      image: 'https://buyleatheronline.com/10625-home_default/vachetta-remnants-natural-vegetable-tanned-leather.jpg',
    },
   
  ],

  colorOptions: [
    {
      id: 'color-1',
      type: 'color',
      name: 'Natural',
      image: 'https://buyleatheronline.com/2186-home_default/natural-vegetable-tanned-leather-remnants.jpg',
    },
    {
      id: 'color-2',
      type: 'color',
      name: 'Black',
      image: 'https://buyleatheronline.com/10399-home_default/old-style-aniline-goat-skin.jpg',
    },
    {
      id: 'color-3',
      type: 'color',
      name: 'Brown',
      image: 'https://buyleatheronline.com/5972-home_default/nappa-lambskin-for-garment.jpg',
    },
    {
      id: 'color-4',
      type: 'color',
      name: 'Green',
      image: 'https://buyleatheronline.com/10035-home_default/goatskin-crackle-effect-stock-clearance.jpg',
    },
    {
      id: 'color-5',
      type: 'color',
      name: 'Blue',
      image: 'https://buyleatheronline.com/3433-home_default/fashion-arena-wrinkled-lambskin.jpg',
    },
    {
      id: 'color-6',
      type: 'color',
      name: 'Red',
      image: 'https://buyleatheronline.com/3344-home_default/fashion-arena-wrinkled-lambskin.jpg',
    },
  ],
};
  


const SAMPLE_BACKGROUNDS = [
  { id: 'bg-1', color: '#ffffff', name: 'Bright White' },
  { id: 'bg-2', color: '#f0f0f0', name: 'Soft Gray' },
  { id: 'bg-3', color: '#0066cc', name: 'Deep Blue' },
  { id: 'bg-4', color: '#ff6600', name: 'Vibrant Orange' },
  { id: 'bg-5', color: '#ffcc00', name: 'Sunny Yellow' },
  { id: 'bg-6', color: '#00cc66', name: 'Fresh Green' },

];

const DesignEditor = () => {
  const { designId } = useParams();
  const navigate = useNavigate();
  const { designs, getDesignById, updateDesign } = useDesignContext();
  
  const [activeTab, setActiveTab] = useState(TABS.ELEMENTS);
  const [currentDesign, setCurrentDesign] = useState(null);
  const [canvasElements, setCanvasElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load design data when component mounts
  useEffect(() => {
    const loadDesign = () => {
      if (designId) {
        const design = getDesignById(designId);
        if (design) {
          setCurrentDesign(design);
          setCanvasElements(design.elements || []);
        } else {
          // Design not found, redirect to dashboard
          navigate('/');
        }
      } else {
        // No design ID, create a temporary design
        setCurrentDesign({
          name: 'Untitled Design',
          createdAt: new Date().toISOString(),
          background: '#ffffff',
          elements: [],
        });
      }
      setIsLoading(false);
    };

    // Simulate API call
    setTimeout(loadDesign, 500);
  }, [designId, getDesignById, navigate]);

  // Save design changes
  const handleSaveDesign = () => {
    if (!currentDesign) return;
    
    setIsSaving(true);
    
    // Update the design with current canvas elements
    const updatedDesign = {
      ...currentDesign,
      elements: canvasElements,
      lastUpdated: new Date().toISOString(),
    };
    
    // Simulate saving delay
    setTimeout(() => {
      updateDesign(designId, updatedDesign);
      setCurrentDesign(updatedDesign);
      setIsSaving(false);
    }, 700);
  };

  // Add element to canvas
  const addElementToCanvas = (element) => {
    const newElement = {
      ...element,
      id: `canvas-${element.type}-${Date.now()}`,
      x: 100, // Default position
      y: 100,
      width: 100,
      height: 100,
      rotation: 0,
    };
    
    setCanvasElements([...canvasElements, newElement]);
    setSelectedElement(newElement.id);
  };

  // Remove selected element from canvas
  const removeSelectedElement = () => {
    if (!selectedElement) return;
    
    setCanvasElements(canvasElements.filter(el => el.id !== selectedElement));
    setSelectedElement(null);
  };

  // Change background color
  const changeBackground = (color) => {
    setCurrentDesign({
      ...currentDesign,
      background: color,
    });
  };

  // Render editor sidebar based on active tab
  const renderSidebar = () => {
    switch (activeTab) {
      case TABS.ELEMENTS:
        return (
          <div>
            <h3 style={{ fontWeight: '500', marginBottom: '12px' }}>Leather Materials</h3>
            {Object.entries(LEATHER_MATERIALS).map(([category, materials]) => (
              <div key={category} style={{ marginBottom: '24px' }}>
          <h4 style={{ fontWeight: '500', marginBottom: '8px', textTransform: 'capitalize' }}>{category.replace(/([A-Z])/g, ' $1')}</h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: '12px',
            }}
          >
            {materials.map((material) => (
              <button
                key={material.id}
                style={{
            padding: '12px',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
                }}
                onClick={() => addElementToCanvas(material)}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'white')}
              >
                <div
            style={{
              width: '100%',
              height: '48px',
              borderRadius: '8px',
              backgroundImage: `url(${material.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
                ></div>
                <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>{material.name}</div>
              </button>
            ))}
          </div>
              </div>
            ))}
          </div>
        );
      
      case TABS.TEXT:
        return (
          <div>
            <h3 className="font-medium mb-3">Add Text</h3>
            <div className="space-y-3">
              <button 
                className="w-full p-3 bg-white border border-gray-200 text-left rounded-md hover:bg-gray-50"
                onClick={() => addElementToCanvas({ type: 'text', name: 'Heading', content: 'Heading Text', fontSize: 32 })}
              >
                Heading Text
              </button>
              <button 
                className="w-full p-3 bg-white border border-gray-200 text-left rounded-md hover:bg-gray-50"
                onClick={() => addElementToCanvas({ type: 'text', name: 'Subheading', content: 'Subheading Text', fontSize: 24 })}
              >
                Subheading Text
              </button>
              <button 
                className="w-full p-3 bg-white border border-gray-200 text-left rounded-md hover:bg-gray-50"
                onClick={() => addElementToCanvas({ type: 'text', name: 'Body Text', content: 'Body Text', fontSize: 16 })}
              >
                Body Text
              </button>
            </div>
          </div>
        );
      
      case TABS.BACKGROUND:
        return (
          <div>
            <h3 style={{ fontWeight: '500', marginBottom: '12px' }}>Materials</h3>
            <div
              style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: '12px',
              }}
            >
              {SAMPLE_BACKGROUNDS.map((bg) => (
          <button
            key={bg.id}
            style={{
              padding: '12px',
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onClick={() => changeBackground(bg.color)}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'white')}
          >
            <div
              style={{
                width: '100%',
                height: '48px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                backgroundColor: bg.color,
              }}
            ></div>
            <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>{bg.name}</div>
          </button>
              ))}
            </div>
          </div>
        );

            case TABS.UPLOADS:
        return (
          <div>
            <h3 style={{ fontWeight: '500', marginBottom: '12px' }}>Your Uploads</h3>
            <div
              style={{
          border: '2px dashed #d1d5db',
          borderRadius: '8px',
          padding: '24px',
          textAlign: 'center',
              }}
            >
              <p style={{ color: '#6b7280', marginBottom: '12px' }}>Upload images to use in your design</p>
              <button
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
              >
          Upload Image
              </button>
            </div>
          </div>
        );

            default:
        return null;
          }
        };

        if (isLoading) {
          return (
            <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '16rem',
        }}
            >
        <div
          style={{
            animation: 'spin 1s linear infinite',
            borderRadius: '50%',
            height: '3rem',
            width: '3rem',
            borderBottom: '2px solid #3b82f6',
          }}
        ></div>
            </div>
          );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', marginTop: '-4rem', paddingTop: '4rem' }}>
      {/* Editor Toolbar */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '0.5rem 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <input
              type="text"
              value={currentDesign?.name || 'Untitled Design'}
              onChange={(e) => setCurrentDesign({ ...currentDesign, name: e.target.value })}
              style={{
                border: 'none',
                padding: '0.25rem 0.5rem',
                outline: 'none',
                borderRadius: '0.375rem',
                boxShadow: '0 0 0 1px #3b82f6',
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handleSaveDesign}
              disabled={isSaving}
              style={{
                padding: '0.25rem 1rem',
                borderRadius: '0.375rem',
                backgroundColor: isSaving ? '#d1d5db' : '#3b82f6',
                color: isSaving ? '#6b7280' : 'white',
                cursor: isSaving ? 'not-allowed' : 'pointer',
              }}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '0.25rem 1rem',
                backgroundColor: '#f3f4f6',
                borderRadius: '0.375rem',
                cursor: 'pointer',
              }}
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Sidebar */}
        <div style={{ width: '16rem', backgroundColor: 'white', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
          {/* Tab Navigation */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1px solid #e5e7eb' }}>
            {Object.values(TABS).map((tab) => (
              <button
                key={tab}
                style={{
                  padding: '0.75rem 0',
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  color: activeTab === tab ? '#3b82f6' : '#4b5563',
                  borderBottom: activeTab === tab ? '2px solid #3b82f6' : 'none',
                  cursor: 'pointer',
                }}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
            {renderSidebar()}
          </div>
        </div>

        {/* Main Canvas Area */}
        <div style={{ flex: 1, backgroundColor: '#f3f4f6', overflow: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div
            style={{
              width: '100%',
              maxWidth: '40rem',
              aspectRatio: '16 / 9',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              backgroundColor: currentDesign?.background || '#ffffff',
            }}
          >
            {/* Canvas Elements */}
            {canvasElements.map((element) => (
              <div
                key={element.id}
                style={{
                  position: 'absolute',
                  cursor: 'move',
                  left: `${element.x}px`,
                  top: `${element.y}px`,
                  width: `${element.width}px`,
                  height: `${element.height}px`,
                  transform: `rotate(${element.rotation}deg)`,
                  outline: selectedElement === element.id ? '2px solid #3b82f6' : 'none',
                }}
                onClick={() => setSelectedElement(element.id)}
              >
                {element.type === 'rectangle' && <div style={{ width: '100%', height: '100%', backgroundColor: '#3b82f6' }}></div>}
                {element.type === 'circle' && <div style={{ width: '100%', height: '100%', backgroundColor: '#10b981', borderRadius: '50%' }}></div>}
                {element.type === 'triangle' && (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: `${element.width / 2}px solid transparent`,
                        borderRight: `${element.width / 2}px solid transparent`,
                        borderBottom: `${element.height}px solid #eab308`,
                      }}
                    ></div>
                  </div>
                )}
                {element.type === 'star' && <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: '#fbbf24' }}>★</div>}
                {element.type === 'heart' && <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: '#ef4444' }}>❤</div>}
                {element.type === 'arrow' && <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: '#374151' }}>➜</div>}
                {element.type === 'text' && (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: `${element.fontSize}px` }}>
                    {element.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Properties Panel - Only visible when element is selected */}
        {selectedElement && (
          <div style={{ width: '16rem', backgroundColor: 'white', borderLeft: '1px solid #e5e7eb', overflowY: 'auto' }}>
            <div style={{ padding: '1rem' }}>
              <h3 style={{ fontWeight: '500', marginBottom: '1rem' }}>Element Properties</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Position X</label>
                  <input
                    type="number"
                    style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.5rem' }}
                    value={canvasElements.find((el) => el.id === selectedElement)?.x || 0}
                    onChange={(e) => {
                      const updatedElements = canvasElements.map((el) =>
                        el.id === selectedElement ? { ...el, x: Number(e.target.value) } : el
                      );
                      setCanvasElements(updatedElements);
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Position Y</label>
                  <input
                    type="number"
                    style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.5rem' }}
                    value={canvasElements.find((el) => el.id === selectedElement)?.y || 0}
                    onChange={(e) => {
                      const updatedElements = canvasElements.map((el) =>
                        el.id === selectedElement ? { ...el, y: Number(e.target.value) } : el
                      );
                      setCanvasElements(updatedElements);
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Width</label>
                  <input
                    type="number"
                    style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.5rem' }}
                    value={canvasElements.find((el) => el.id === selectedElement)?.width || 0}
                    onChange={(e) => {
                      const updatedElements = canvasElements.map((el) =>
                        el.id === selectedElement ? { ...el, width: Number(e.target.value) } : el
                      );
                      setCanvasElements(updatedElements);
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Height</label>
                  <input
                    type="number"
                    style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.5rem' }}
                    value={canvasElements.find((el) => el.id === selectedElement)?.height || 0}
                    onChange={(e) => {
                      const updatedElements = canvasElements.map((el) =>
                        el.id === selectedElement ? { ...el, height: Number(e.target.value) } : el
                      );
                      setCanvasElements(updatedElements);
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Rotation</label>
                  <input
                    type="number"
                    style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.5rem' }}
                    value={canvasElements.find((el) => el.id === selectedElement)?.rotation || 0}
                    onChange={(e) => {
                      const updatedElements = canvasElements.map((el) =>
                        el.id === selectedElement ? { ...el, rotation: Number(e.target.value) } : el
                      );
                      setCanvasElements(updatedElements);
                    }}
                  />
                </div>

                {/* Text specific controls */}
                {canvasElements.find((el) => el.id === selectedElement)?.type === 'text' && (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Text Content</label>
                      <input
                        type="text"
                        style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.5rem' }}
                        value={canvasElements.find((el) => el.id === selectedElement)?.content || ''}
                        onChange={(e) => {
                          const updatedElements = canvasElements.map((el) =>
                            el.id === selectedElement ? { ...el, content: e.target.value } : el
                          );
                          setCanvasElements(updatedElements);
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Font Size</label>
                      <input
                        type="number"
                        style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.5rem' }}
                        value={canvasElements.find((el) => el.id === selectedElement)?.fontSize || 16}
                        onChange={(e) => {
                          const updatedElements = canvasElements.map((el) =>
                            el.id === selectedElement ? { ...el, fontSize: Number(e.target.value) } : el
                          );
                          setCanvasElements(updatedElements);
                        }}
                      />
                    </div>
                  </>
                )}

                <button
                  onClick={removeSelectedElement}
                  style={{
                    width: '100%',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    marginTop: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  Delete Element
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignEditor;