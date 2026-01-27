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
   * Get conversations (updated to match backend response format)
   */
  async getConversations(limit = 20, skip = 0) {
    try {
      // Backend expects skip, not page
      const response = await api.get(API_ENDPOINTS.MESSAGES.LIST_CONVERSATIONS, { limit, skip });
      // Backend returns: { success: true, data: { conversations: [] } }
      // Each conversation has: _id, participants, isGroup, name, avatar, creatorId, admins, 
      // lastMessageText, lastMessageAt, unreadCounts, otherUser (populated), unreadCount
      return response.success ? response.data.conversations : [];
    } catch (error) {
      console.error('Get conversations error:', error);
      throw error;
    }
  },

  /**
   * Send message (updated to match backend)
   * Backend expects: conversationId, recipientId, text, mediaUrl
   * For WebSocket: use socketService.sendMessage() instead
   */
  async sendMessage(conversationId, recipientId, text, mediaUrl = null, type = 'text') {
    try {
      // Backend expects: conversationId, recipientId, text, mediaUrl
      const response = await api.post(API_ENDPOINTS.MESSAGES.SEND, {
        conversationId,
        recipientId,
        text: type === 'text' ? text : '', // Text content for text messages
        mediaUrl: type !== 'text' ? text : mediaUrl, // Use text as URL for media messages
        type, // Message type: text, image, video, voice
      });
      // Backend returns: { success: true, data: { message: {...} }, message: 'Message sent' }
      // Message fields: _id, conversationId, senderId, recipientId, text, mediaUrl, type, 
      // createdAt, updatedAt, sender: { uid, username, displayName, avatar }
      return response.success ? response.data.message : null;
    } catch (error) {
      console.error('Send message error:', error);
      throw error;
    }
  },

  /**
   * Get messages by conversation (updated to match backend response)
   */
  async getMessagesByConversation(conversationId, limit = 50, skip = 0) {
    try {
      // Backend expects skip, not page
      const response = await api.get(API_ENDPOINTS.MESSAGES.BY_CONVERSATION(conversationId), { limit, skip });
      // Backend returns: { success: true, data: { messages: [] } }
      // Each message has: _id, conversationId, senderId, recipientId, text, mediaUrl, type,
      // duration, fileSize, readAt, deliveredAt, reactions, replyTo, isDeleted,
      // createdAt, updatedAt, sender: { uid, username, displayName, avatar }
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
