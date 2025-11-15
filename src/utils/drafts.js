// Draft management utilities
// Stores drafts in localStorage

const DRAFTS_KEY = 'projectx_drafts';
const COMMUNITY_DRAFTS_KEY = 'projectx_community_drafts';

// Get all regular post drafts
export const getDrafts = () => {
  try {
    const drafts = localStorage.getItem(DRAFTS_KEY);
    return drafts ? JSON.parse(drafts) : [];
  } catch (error) {
    console.error('Error loading drafts:', error);
    return [];
  }
};

// Save a regular post draft (max 5 drafts)
export const saveDraft = (draftData) => {
  try {
    const drafts = getDrafts();
    const newDraft = {
      id: draftData.id || Date.now().toString(),
      ...draftData,
      updatedAt: new Date().toISOString(),
    };
    
    // If draft with same ID exists, update it; otherwise add new
    const existingIndex = drafts.findIndex(d => d.id === newDraft.id);
    if (existingIndex >= 0) {
      drafts[existingIndex] = newDraft;
    } else {
      // Limit to 5 drafts - remove oldest if we have 5 already
      if (drafts.length >= 5) {
        drafts.pop(); // Remove the oldest draft (last in array)
      }
      drafts.unshift(newDraft); // Add to beginning
    }
    
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
    return newDraft;
  } catch (error) {
    console.error('Error saving draft:', error);
    return null;
  }
};

// Delete a regular post draft
export const deleteDraft = (draftId) => {
  try {
    const drafts = getDrafts();
    const filtered = drafts.filter(d => d.id !== draftId);
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting draft:', error);
    return false;
  }
};

// Get all community post drafts
export const getCommunityDrafts = (communityId) => {
  try {
    const allDrafts = localStorage.getItem(COMMUNITY_DRAFTS_KEY);
    const drafts = allDrafts ? JSON.parse(allDrafts) : {};
    return drafts[communityId] || [];
  } catch (error) {
    console.error('Error loading community drafts:', error);
    return [];
  }
};

// Save a community post draft (max 5 drafts per community)
export const saveCommunityDraft = (communityId, draftData) => {
  try {
    const allDrafts = localStorage.getItem(COMMUNITY_DRAFTS_KEY);
    const drafts = allDrafts ? JSON.parse(allDrafts) : {};
    
    if (!drafts[communityId]) {
      drafts[communityId] = [];
    }
    
    const newDraft = {
      id: draftData.id || Date.now().toString(),
      ...draftData,
      updatedAt: new Date().toISOString(),
    };
    
    // If draft with same ID exists, update it; otherwise add new
    const existingIndex = drafts[communityId].findIndex(d => d.id === newDraft.id);
    if (existingIndex >= 0) {
      drafts[communityId][existingIndex] = newDraft;
    } else {
      // Limit to 5 drafts per community - remove oldest if we have 5 already
      if (drafts[communityId].length >= 5) {
        drafts[communityId].pop(); // Remove the oldest draft (last in array)
      }
      drafts[communityId].unshift(newDraft);
    }
    
    localStorage.setItem(COMMUNITY_DRAFTS_KEY, JSON.stringify(drafts));
    return newDraft;
  } catch (error) {
    console.error('Error saving community draft:', error);
    return null;
  }
};

// Delete a community post draft
export const deleteCommunityDraft = (communityId, draftId) => {
  try {
    const allDrafts = localStorage.getItem(COMMUNITY_DRAFTS_KEY);
    const drafts = allDrafts ? JSON.parse(allDrafts) : {};
    
    if (drafts[communityId]) {
      drafts[communityId] = drafts[communityId].filter(d => d.id !== draftId);
      localStorage.setItem(COMMUNITY_DRAFTS_KEY, JSON.stringify(drafts));
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting community draft:', error);
    return false;
  }
};

// Load a draft by ID (for editing)
export const loadDraft = (draftId) => {
  try {
    const drafts = getDrafts();
    return drafts.find(d => d.id === draftId) || null;
  } catch (error) {
    console.error('Error loading draft:', error);
    return null;
  }
};

// Load a community draft by ID (for editing)
export const loadCommunityDraft = (communityId, draftId) => {
  try {
    const drafts = getCommunityDrafts(communityId);
    return drafts.find(d => d.id === draftId) || null;
  } catch (error) {
    console.error('Error loading community draft:', error);
    return null;
  }
};

