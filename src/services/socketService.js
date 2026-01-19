import { io } from 'socket.io-client';
import { API_CONFIG } from '../config/api';

class SocketService {
  constructor() {
    this.socket = null;
    this.connected = false;
  }

  /**
   * Connect to Socket.io server
   */
  connect(token) {
    // Return existing connection if already connected
    if (this.socket?.connected) {
      console.log('✅ Socket already connected');
      return this.socket;
    }

    // Disconnect existing socket if not connected
    if (this.socket && !this.socket.connected) {
      this.socket.disconnect();
      this.socket = null;
    }

    const socketUrl = import.meta.env.VITE_SOCKET_URL || API_CONFIG.BASE_URL;
    console.log('🔌 Connecting to socket server:', socketUrl);

    this.socket = io(socketUrl, {
      auth: {
        token: token,
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      timeout: 10000,
      autoConnect: true,
    });

    // Connection events
    this.socket.on('connect', () => {
      this.connected = true;
      console.log('✅ Socket connected successfully:', this.socket.id);
    });

    this.socket.on('disconnect', (reason) => {
      this.connected = false;
      console.log('❌ Socket disconnected:', reason);
      
      // Attempt to reconnect if disconnected unexpectedly
      if (reason === 'io server disconnect') {
        // Server disconnected, try to reconnect manually
        setTimeout(() => {
          if (token && !this.socket?.connected) {
            console.log('🔄 Attempting manual reconnection...');
            this.socket?.connect();
          }
        }, 1000);
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ Socket.io connection error:', error.message);
      this.connected = false;
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log('✅ Socket reconnected after', attemptNumber, 'attempts');
      this.connected = true;
    });

    this.socket.on('reconnect_attempt', (attemptNumber) => {
      console.log('🔄 Socket reconnection attempt', attemptNumber);
    });

    this.socket.on('reconnect_error', (error) => {
      console.error('❌ Socket reconnection error:', error.message);
    });

    this.socket.on('reconnect_failed', () => {
      console.error('❌ Socket reconnection failed after max attempts');
      this.connected = false;
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
