import React, { useContext, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DesignContext } from '../contexts/DesignContext';
import '../styles/ThreeDViewer.css';
const ThreeDViewer = () => {
  const mountRef = useRef(null);
  const { design } = useContext(DesignContext);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  
  useEffect(() => {
    // Initialize scene on component mount
    if (!sceneRef.current) {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      // Scene
      sceneRef.current = new THREE.Scene();
      sceneRef.current.background = new THREE.Color(0xf0f0f0);
      
      // Camera
      cameraRef.current = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      cameraRef.current.position.z = 300;
      
      // Renderer
      rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
      rendererRef.current.setSize(width, height);
      mountRef.current.appendChild(rendererRef.current.domElement);
      
      // Controls
      controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
      controlsRef.current.enableDamping = true;
      
      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      sceneRef.current.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(0, 1, 1);
      sceneRef.current.add(directionalLight);
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        controlsRef.current.update();
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      };
      
      animate();
      
      // Handle resize
      const handleResize = () => {
        const newWidth = mountRef.current.clientWidth;
        const newHeight = mountRef.current.clientHeight;
        
        cameraRef.current.aspect = newWidth / newHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(newWidth, newHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        mountRef.current.removeChild(rendererRef.current.domElement);
      };
    }
  }, []);
  
  // Update 3D model when design changes
  useEffect(() => {
    if (sceneRef.current) {
      // Clear previous objects except lights
      const lights = [];
      while(sceneRef.current.children.length > 0) { 
        const obj = sceneRef.current.children[0];
        if (obj.type === 'AmbientLight' || obj.type === 'DirectionalLight') {
          lights.push(obj);
          sceneRef.current.remove(obj);
        } else {
          sceneRef.current.remove(obj);
        }
      }
      
      // Add lights back
      lights.forEach(light => sceneRef.current.add(light));
      
      if (lights.length === 0) {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        sceneRef.current.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(0, 1, 1);
        sceneRef.current.add(directionalLight);
      }
      
      // Create base material
      const materialColor = design.materials[0]?.color || '#b08968';
      const material = new THREE.MeshStandardMaterial({ 
        color: new THREE.Color(materialColor),
        roughness: 0.7,
        metalness: 0.1
      });
      
      // Create base shape based on design type
      const { width, height, depth } = design.dimensions;
      const scaleFactor = 0.5; // Scale down for better viewing
      
      let baseGeometry;
      
      switch(design.type) {
        case 'wallet':
          baseGeometry = new THREE.BoxGeometry(
            width * scaleFactor, 
            height * scaleFactor, 
            (depth || 10) * scaleFactor
          );
          break;
        case 'bag':
          // Create a bag-like shape
          baseGeometry = new THREE.BoxGeometry(
            width * scaleFactor, 
            height * scaleFactor, 
            (depth || 80) * scaleFactor
          );
          break;
        case 'belt':
          // Create a long, thin box for belt
          baseGeometry = new THREE.BoxGeometry(
            width * scaleFactor, 
            height * scaleFactor, 
            (depth || 5) * scaleFactor
          );
          break;
        default:
          baseGeometry = new THREE.BoxGeometry(
            width * scaleFactor, 
            height * scaleFactor, 
            (depth || 20) * scaleFactor
          );
      }
      
      const baseMesh = new THREE.Mesh(baseGeometry, material);
      sceneRef.current.add(baseMesh);
      
      // Add components
      design.components.forEach(comp => {
        let componentGeometry;
        const componentMaterial = new THREE.MeshStandardMaterial({ 
          color: new THREE.Color(comp.color || '#e9c46a'),
          roughness: 0.5,
          metalness: 0.2
        });
        
        if (comp.type === 'button') {
          componentGeometry = new THREE.SphereGeometry(comp.radius * scaleFactor, 32, 32);
        } else if (comp.type === 'zipper') {
          // Create a thin box for zipper
          componentGeometry = new THREE.BoxGeometry(
            comp.width * scaleFactor, 
            comp.height * scaleFactor, 
            3 * scaleFactor
          );
        } else if (comp.type === 'strap') {
          // Create a longer, rectangular shape for strap
          componentGeometry = new THREE.BoxGeometry(
            comp.width * scaleFactor, 
            comp.height * scaleFactor, 
            5 * scaleFactor
          );
        } else {
          // Default pocket or other component
          componentGeometry = new THREE.BoxGeometry(
            comp.width * scaleFactor, 
            comp.height * scaleFactor, 
            10 * scaleFactor
          );
        }
        
        const componentMesh = new THREE.Mesh(componentGeometry, componentMaterial);
        
        // Position the component relative to the center of the base shape
        const baseWidth = width * scaleFactor;
        const baseHeight = height * scaleFactor;
        const baseDepth = (depth || 20) * scaleFactor;
        
        componentMesh.position.x = (comp.x - width/2) * scaleFactor + baseWidth/2;
        componentMesh.position.y = (height/2 - comp.y) * scaleFactor - baseHeight/2;
        componentMesh.position.z = baseDepth/2 + 1;
        
        sceneRef.current.add(componentMesh);
      });
      
      // Add texture mapping (simulated leather texture)
      if (design.materials.length > 0) {
        const textureLoader = new THREE.TextureLoader();
        // This would be replaced with actual textures from your assets
        const leatherTexture = new THREE.TextureLoader().load(
          'https://threejs.org/examples/textures/leather.jpg',
          undefined,
          function(err) {
            console.error('Error loading texture', err);
          }
        );
        
        if (leatherTexture) {
          material.map = leatherTexture;
          material.needsUpdate = true;
        }
      }
      
      // Center camera
      const box = new THREE.Box3().setFromObject(baseMesh);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      // Position camera to see the entire object
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = cameraRef.current.fov * (Math.PI / 180);
      let cameraDistance = maxDim / (2 * Math.tan(fov / 2));
      
      // Add some margin
      cameraDistance *= 1.5;
      
      const direction = new THREE.Vector3();
      cameraRef.current.getWorldDirection(direction);
      direction.multiplyScalar(-cameraDistance);
      cameraRef.current.position.copy(center).add(direction);
      controlsRef.current.target.copy(center);
      controlsRef.current.update();
    }
  }, [design]);
  
  const takeScreenshot = () => {
    if (rendererRef.current) {
      const dataURL = rendererRef.current.domElement.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `${design.name || 'leather-design'}_3d_view.png`;
      link.click();
    }
  };
  
  return (
    <div style={{ position: 'relative' }}>
      <div 
        ref={mountRef} 
        style={{
          width: '100%',
          height: '24rem', // Equivalent to h-96
          backgroundColor: '#2d3748', // Equivalent to bg-gray-800
          borderRadius: '0.5rem' // Equivalent to rounded-lg
        }}
      ></div>
      <div 
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          display: 'flex',
          gap: '0.5rem' // Equivalent to space-x-2
        }}
      >
        <button 
          style={{
            padding: '0.25rem 0.75rem', // Equivalent to px-3 py-1
            backgroundColor: '#3182ce', // Equivalent to bg-blue-600
            color: '#fff', // Equivalent to text-white
            borderRadius: '0.375rem', // Equivalent to rounded
            fontSize: '0.875rem', // Equivalent to text-sm
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2b6cb0'} // Equivalent to hover:bg-blue-700
          onMouseOut={(e) => e.target.style.backgroundColor = '#3182ce'}
          onClick={takeScreenshot}
        >
          Take Screenshot
        </button>
      </div>
      <div 
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          backgroundColor: '#fff', // Equivalent to bg-white
          padding: '0.5rem', // Equivalent to p-2
          borderRadius: '0.375rem', // Equivalent to rounded
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Equivalent to shadow
          fontSize: '0.875rem' // Equivalent to text-sm
        }}
      >
        <p><strong>Tip:</strong> Click and drag to rotate. Scroll to zoom.</p>
      </div>
    </div>
  );
};

export default ThreeDViewer;