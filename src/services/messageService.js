import { api } from '../utils/httpClient';
import { API_ENDPOINTS } from '../config/api';

/**
 * Message Service
 */
export const messageService = {
  /**
   * Create conversation
   */
  async createConversation(participantIds) {
    try {
      const response = await api.post(API_ENDPOINTS.MESSAGES.CREATE_CONVERSATION, { participantIds });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Create conversation error:', error);
      throw error;
    }
  },

  /**
   * Get conversations
   */
  async getConversations(page = 1, limit = 20) {
    try {
      const response = await api.get(API_ENDPOINTS.MESSAGES.LIST_CONVERSATIONS, { page, limit });
      return response.success ? response.data : { conversations: [], pagination: {} };
    } catch (error) {
      console.error('Get conversations error:', error);
      throw error;
    }
  },

  /**
   * Send message
   */
  async sendMessage(conversationId, text, attachments = []) {
    try {
      const response = await api.post(API_ENDPOINTS.MESSAGES.SEND, {
        conversationId,
        text,
        attachments,
      });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Send message error:', error);
      throw error;
    }
  },

  /**
   * Get messages by conversation
   */
  async getMessagesByConversation(conversationId, page = 1, limit = 50) {
    try {
      const response = await api.get(API_ENDPOINTS.MESSAGES.BY_CONVERSATION(conversationId), { page, limit });
      return response.success ? response.data : { messages: [], pagination: {} };
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
};
