/**
 * Simple utility to manage user posts in localStorage
 * Each user has their own posts array
 */

const STORAGE_KEY_PREFIX = 'userPosts_';

// Get posts for a user
export const getUserPosts = (username) => {
  try {
    const key = `${STORAGE_KEY_PREFIX}${username}`;
    const posts = localStorage.getItem(key);
    return posts ? JSON.parse(posts) : [];
  } catch (error) {
    console.error('Error reading user posts:', error);
    return [];
  }
};

// Save posts for a user
export const saveUserPosts = (username, posts) => {
  try {
    const key = `${STORAGE_KEY_PREFIX}${username}`;
    localStorage.setItem(key, JSON.stringify(posts));
    // Dispatch event to notify components of changes
    window.dispatchEvent(new CustomEvent('userPostsUpdated', { detail: { username } }));
  } catch (error) {
    console.error('Error saving user posts:', error);
  }
};

// Add a post for a user
export const addUserPost = (username, post) => {
  const posts = getUserPosts(username);
  const newPost = {
    ...post,
    id: Date.now(), // Simple ID generation
    username,
    createdAt: new Date().toISOString(),
  };
  const updatedPosts = [newPost, ...posts]; // Add to beginning (newest first)
  saveUserPosts(username, updatedPosts);
  return newPost;
};

// Delete a post for a user
export const deleteUserPost = (username, postId) => {
  const posts = getUserPosts(username);
  const updatedPosts = posts.filter(p => p.id !== postId);
  saveUserPosts(username, updatedPosts);
};

