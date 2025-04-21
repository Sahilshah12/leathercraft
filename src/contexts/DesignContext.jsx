import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { fetchDesign, saveDesign, fetchUserDesigns } from '../services/api';
import '../styles/DesignContext.css';
export const DesignContext = createContext();

export const DesignProvider = ({ children }) => {
  const [design, setDesign] = useState({
    name: 'Untitled Design',
    type: 'wallet',
    materials: [],
    components: [],
    dimensions: { width: 200, height: 150, depth: 20 },
    cost: { materials: 0, labor: 0, overhead: 0, total: 0, suggestedPrice: 0 }
  });

  const [userDesigns, setUserDesigns] = useState([]);
  const [isModified, setIsModified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load user's saved designs
  const loadUserDesigns = useCallback(async () => {
    setIsLoading(true);
    try {
      const designs = await fetchUserDesigns();
      setUserDesigns(designs);
    } catch (error) {
      console.error('Error loading user designs:', error);
      setError('Failed to load your designs. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load user designs on initial mount
  useEffect(() => {
    loadUserDesigns();
  }, [loadUserDesigns]);

  // Update design state
  const updateDesign = useCallback((updates) => {
    setDesign(prev => {
      // Handle special cases for nested objects
      if (updates.dimensions) {
        updates.dimensions = { ...prev.dimensions, ...updates.dimensions };
      }
      if (updates.cost) {
        updates.cost = { ...prev.cost, ...updates.cost };
      }

      return { ...prev, ...updates };
    });
    setIsModified(true);
  }, []);

  // Create a new empty design
  const createNewDesign = useCallback(() => {
    setDesign({
      name: 'Untitled Design',
      type: 'wallet',
      materials: [],
      components: [],
      dimensions: { width: 200, height: 150, depth: 20 },
      cost: { materials: 0, labor: 0, overhead: 0, total: 0, suggestedPrice: 0 }
    });
    setIsModified(true);
  }, []);

  // Save current design
  const saveCurrentDesign = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const savedDesign = await saveDesign(design);
      setDesign(savedDesign);
      setIsModified(false);

      // Refresh user designs list
      loadUserDesigns();

      return savedDesign;
    } catch (error) {
      console.error('Error saving design:', error);
      setError('Failed to save your design. Please try again later.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [design, loadUserDesigns]);

  // Load a specific design
  const loadDesign = useCallback(async (designId) => {
    setIsLoading(true);
    setError(null);

    try {
      const loadedDesign = await fetchDesign(designId);
      setDesign(loadedDesign);
      setIsModified(false);
      return loadedDesign;
    } catch (error) {
      console.error('Error loading design:', error);
      setError('Failed to load the design. It may have been deleted or you may not have permission to access it.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete a design
  const deleteDesign = useCallback(async (designId) => {
    setIsLoading(true);
    setError(null);

    try {
      await deleteDesign(designId);

      if (design._id === designId) {
        createNewDesign();
      }

      loadUserDesigns();
      return true;
    } catch (error) {
      console.error('Error deleting design:', error);
      setError('Failed to delete the design. Please try again later.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [design, createNewDesign, loadUserDesigns]);

  // Duplicate a design
  const duplicateDesign = useCallback(async (designToDuplicate) => {
    setIsLoading(true);
    setError(null);

    try {
      const { _id, createdAt, updatedAt, ...designData } = designToDuplicate;

      const newDesign = {
        ...designData,
        name: `${designData.name} (Copy)`
      };

      setDesign(newDesign);
      setIsModified(true);

      return newDesign;
    } catch (error) {
      console.error('Error duplicating design:', error);
      setError('Failed to duplicate the design. Please try again later.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Export design as different formats
  const exportDesign = useCallback((format) => {
    switch (format) {
      case 'json':
        const dataStr = JSON.stringify(design, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${design.name || 'design'}.json`;
        link.href = url;
        link.click();
        break;

      case 'pdf':
        alert('PDF export would generate cutting templates here');
        break;

      case 'svg':
        alert('SVG export would create pattern outlines here');
        break;

      default:
        setError(`Unsupported export format: ${format}`);
    }
  }, [design]);

  return (
    <DesignContext.Provider value={{
      design,
      userDesigns,
      isModified,
      isLoading,
      error,
      updateDesign,
      createNewDesign,
      saveCurrentDesign,
      loadDesign,
      deleteDesign,
      duplicateDesign,
      exportDesign
    }}>
      {children}
    </DesignContext.Provider>
  );
};

// ✅ Custom hook to access the context
export const useDesignContext = () => {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error('useDesignContext must be used within a DesignProvider');
  }
  return context;
};

// ✅ Custom hooks for specific actions
export const useLoadDesign = () => {
  const { loadDesign } = useDesignContext();
  return loadDesign;
};

export const useSaveCurrentDesign = () => {
  const { saveCurrentDesign } = useDesignContext();
  return saveCurrentDesign;
};

export const useUpdateDesign = () => {
  const { updateDesign } = useDesignContext();
  return updateDesign;
};

export const useCreateNewDesign = () => {
  const { createNewDesign } = useDesignContext();
  return createNewDesign;
};

export const useDeleteDesign = () => {
  const { deleteDesign } = useDesignContext();
  return deleteDesign;
};

export const useDuplicateDesign = () => {
  const { duplicateDesign } = useDesignContext();
  return duplicateDesign;
};

export const useExportDesign = () => {
  const { exportDesign } = useDesignContext();
  return exportDesign;
};

// ✅ Optional alias export for components expecting `useDesign`
export { useDesignContext as useDesign };
