import { api } from '../utils/httpClient';
import { API_ENDPOINTS } from '../config/api';

/**
 * Message Service
 */
export const messageService = {
  /**
   * Create conversation
   */
  async createConversation(userId) {
    try {
      // Backend expects userId, not participantIds
      const response = await api.post(API_ENDPOINTS.MESSAGES.CREATE_CONVERSATION, { userId });
      return response.success ? response.data.conversation : null;
    } catch (error) {
      console.error('Create conversation error:', error);
      throw error;
    }
  },

  /**
   * Get conversations
   */
  async getConversations(limit = 20, skip = 0) {
    try {
      // Backend expects skip, not page
      const response = await api.get(API_ENDPOINTS.MESSAGES.LIST_CONVERSATIONS, { limit, skip });
      return response.success ? response.data.conversations : [];
    } catch (error) {
      console.error('Get conversations error:', error);
      throw error;
    }
  },

  /**
   * Send message
   */
  async sendMessage(conversationId, recipientId, text, mediaUrl = null) {
    try {
      // Backend expects: conversationId, recipientId, text, mediaUrl
      const response = await api.post(API_ENDPOINTS.MESSAGES.SEND, {
        conversationId,
        recipientId,
        text,
        mediaUrl,
      });
      return response.success ? response.data.message : null;
    } catch (error) {
      console.error('Send message error:', error);
      throw error;
    }
  },

  /**
   * Get messages by conversation
   */
  async getMessagesByConversation(conversationId, limit = 50, skip = 0) {
    try {
      // Backend expects skip, not page
      const response = await api.get(API_ENDPOINTS.MESSAGES.BY_CONVERSATION(conversationId), { limit, skip });
      return response.success ? response.data.messages : [];
    } catch (error) {
      console.error('Get messages error:', error);
      throw error;
    }
  },

  /**
   * Mark conversation as read
   */
  async markConversationAsRead(conversationId, lastReadMessageId = null) {
    try {
      const data = lastReadMessageId ? { lastReadMessageId } : {};
      const response = await api.post(API_ENDPOINTS.MESSAGES.MARK_READ(conversationId), data);
      return response;
    } catch (error) {
      console.error('Mark conversation as read error:', error);
      throw error;
    }
  },

  /**
   * Upload message media (image, voice note, etc.)
   */
  async uploadMessageMedia(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post(API_ENDPOINTS.MESSAGES.UPLOAD_MEDIA, formData, true, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Upload message media error:', error);
      throw error;
    }
  },
};
