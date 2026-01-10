import { io } from 'socket.io-client';
import { API_CONFIG } from '../config/api';
import { USE_MOCK_API } from '../mocks/mockApi';

class SocketService {
  constructor() {
    this.socket = null;
    this.connected = false;
    this.mockMode = USE_MOCK_API;
  }

  /**
   * Connect to Socket.io server
   */
  connect(token) {
    // Skip socket connection in mock mode
    if (this.mockMode) {
      console.log('📦 Socket.io: Running in mock mode, skipping connection');
      this.connected = false;
      return null;
    }
    
    if (this.socket?.connected) {
      return this.socket;
    }

    this.socket = io(API_CONFIG.BASE_URL, {
      auth: {
        token: token,
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    // Connection events
    this.socket.on('connect', () => {
      console.log('✅ Socket.io connected');
      this.connected = true;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Socket.io disconnected:', reason);
      this.connected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket.io connection error:', error);
    });

    return this.socket;
  }

  /**
   * Disconnect from Socket.io server
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
    }
  }

  /**
   * Check if connected
   */
  isConnected() {
    return this.connected && this.socket?.connected;
  }

  /**
   * Join a conversation room
   */
  joinConversation(conversationId) {
    if (this.socket) {
      this.socket.emit('join-conversation', conversationId);
    }
  }

  /**
   * Leave a conversation room
   */
  leaveConversation(conversationId) {
    if (this.socket) {
      this.socket.emit('leave-conversation', conversationId);
    }
  }

  /**
   * Send typing indicator
   */
  sendTyping(conversationId, isTyping) {
    if (this.socket) {
      this.socket.emit('typing', { conversationId, isTyping });
    }
  }

  /**
   * Listen for new messages
   */
  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on('new-message', callback);
    }
  }

  /**
   * Listen for typing indicators
   */
  onTyping(callback) {
    if (this.socket) {
      this.socket.on('typing', callback);
    }
  }

  /**
   * Listen for user online status
   */
  onUserOnline(callback) {
    if (this.socket) {
      this.socket.on('user-online', callback);
    }
  }

  /**
   * Listen for user offline status
   */
  onUserOffline(callback) {
    if (this.socket) {
      this.socket.on('user-offline', callback);
    }
  }

  /**
   * Remove all event listeners
   */
  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
    }
  }
}

// Export singleton instance
export const socketService = new SocketService();
