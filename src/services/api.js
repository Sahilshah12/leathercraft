// src/services/api.js

/**
 * Service for handling API requests
 */
const API_BASE_URL = 'http://127.0.0.1:8000/'; // ✅ Fix URL: localhost should not have a slash

/**
 * Fetch available materials
 * @returns {Promise<Array>} List of materials
 */
export async function getMaterials() {
  try {
    const response = await fetch(`${API_BASE_URL}/materials`);
    if (!response.ok) throw new Error('Failed to fetch materials');
    return await response.json();
  } catch (error) {
    console.error('Error fetching materials:', error);
    return [];
  }
}

/**
 * Fetch design templates
 * @returns {Promise<Array>} List of design templates
 */
export async function getTemplates() {
  try {
    const response = await fetch(`${API_BASE_URL}/templates`);
    if (!response.ok) throw new Error('Failed to fetch templates');
    return await response.json();
  } catch (error) {
    console.error('Error fetching templates:', error);
    return [];
  }
}

/**
 * Calculate cost estimate based on design specifications
 * @param {Object} designSpec - The design specifications
 * @returns {Promise<Object>} Cost breakdown
 */
export async function calculateCost(designSpec) {
  try {
    const response = await fetch(`${API_BASE_URL}/cost-estimate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(designSpec),
    });
    if (!response.ok) throw new Error('Failed to calculate cost');
    return await response.json();
  } catch (error) {
    console.error('Error calculating cost:', error);
    return { error: 'Failed to calculate cost' };
  }
}

/**
 * Save design to the server
 * @param {Object} design - The complete design object
 * @returns {Promise<Object>} Saved design with ID
 */
export async function saveDesign(design) {
  try {
    const response = await fetch(`${API_BASE_URL}/designs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(design),
    });
    if (!response.ok) throw new Error('Failed to save design');
    return await response.json();
  } catch (error) {
    console.error('Error saving design:', error);
    return { error: 'Failed to save design' };
  }
}

/**
 * Fetch a specific design by ID
 * @param {string} designId - The ID of the design to fetch
 * @returns {Promise<Object>} The fetched design
 */
export async function fetchDesign(designId) {
  try {
    const response = await fetch(`${API_BASE_URL}/designs/${designId}`);
    if (!response.ok) throw new Error('Failed to fetch design');
    return await response.json();
  } catch (error) {
    console.error('Error fetching design:', error);
    return { error: 'Failed to fetch design' };
  }
}

/**
 * Fetch all designs created by the user
 * @returns {Promise<Array>} List of user's saved designs
 */
export async function fetchUserDesigns() {
  try {
    const response = await fetch(`${API_BASE_URL}/designs`);
    if (!response.ok) throw new Error('Failed to fetch user designs');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user designs:', error);
    return [];
  }
}

/**
 * Generate 3D model from design
 * @param {Object} design - The design to render
 * @returns {Promise<Object>} 3D model data
 */
export async function generate3DModel(design) {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-3d`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(design),
    });
    if (!response.ok) throw new Error('Failed to generate 3D model');
    return await response.json();
  } catch (error) {
    console.error('Error generating 3D model:', error);
    return { error: 'Failed to generate 3D model' };
  }
}
