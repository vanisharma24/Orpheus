import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Search, MoreVertical, Music, Paperclip, Smile } from 'lucide-react';

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState<number>(1);
  const [messageText, setMessageText] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      name: 'Sarah Martinez',
      username: '@sarahm_music',
      avatar: '👩‍🎤',
      lastMessage: 'That guitar riff you sent is amazing! Can we jam on it tomorrow?',
      timestamp: '2 min ago',
      unread: 2,
      isOnline: true,
      type: 'direct'
    },
    {
      id: 2,
      name: 'Midnight Symphony Team',
      avatar: '🎵',
      lastMessage: 'Alex: Just uploaded the new violin tracks',
      timestamp: '1 hour ago',
      unread: 0,
      isOnline: false,
      type: 'group',
      members: ['John Doe', 'Sarah M.', 'Alex K.']
    },
    {
      id: 3,
      name: 'Marcus Williams',
      username: '@marcus_jazz',
      avatar: '🎹',
      lastMessage: 'The jazz fusion project is coming along great!',
      timestamp: '3 hours ago',
      unread: 1,
      isOnline: false,
      type: 'direct'
    },
    {
      id: 4,
      name: 'Luna Sterling',
      username: '@luna_ambient',
      avatar: '🌙',
      lastMessage: 'Thanks for the collaboration invite. I\'d love to join!',
      timestamp: '1 day ago',
      unread: 0,
      isOnline: true,
      type: 'direct'
    }
  ];

  // Mock messages for selected chat
  const messages = [
    {
      id: 1,
      senderId: 2,
      senderName: 'Sarah Martinez',
      senderAvatar: '👩‍🎤',
      content: 'Hey John! I listened to your latest track and it\'s incredible!',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: 2,
      senderId: 1,
      senderName: 'You',
      content: 'Thank you so much! I was experimenting with some new synthesizer sounds.',
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: 3,
      senderId: 2,
      senderName: 'Sarah Martinez',
      senderAvatar: '👩‍🎤',
      content: 'I have this guitar riff that I think would complement it perfectly. Want to hear it?',
      timestamp: '10:35 AM',
      type: 'text'
    },
    {
      id: 4,
      senderId: 2,
      senderName: 'Sarah Martinez',
      senderAvatar: '👩‍🎤',
      content: 'guitar_riff_v2.wav',
      timestamp: '10:36 AM',
      type: 'audio',
      duration: '2:14'
    },
    {
      id: 5,
      senderId: 1,
      senderName: 'You',
      content: 'Wow, that\'s exactly what this track needs! The timing is perfect.',
      timestamp: '10:45 AM',
      type: 'text'
    },
    {
      id: 6,
      senderId: 2,
      senderName: 'Sarah Martinez',
      senderAvatar: '👩‍🎤',
      content: 'That guitar riff you sent is amazing! Can we jam on it tomorrow?',
      timestamp: '2 min ago',
      type: 'text'
    }
  ];


  const sendMessage = (): void => {
    if (messageText.trim()) {
      // Implement actual send logic here
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getFilteredConversations = (): typeof conversations => {
    if (!searchQuery) return conversations;
    return conversations.filter(conv => 
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);

  interface ConversationItemProps {
    conversation: typeof conversations[number];
    isSelected: boolean;
  }
  const ConversationItem = ({ conversation, isSelected }: ConversationItemProps) => (
    <button
      onClick={() => setSelectedChat(conversation.id)}
      className={`w-full p-4 text-left transition-all duration-200 ${
        isSelected ? 'bg-[#730202] bg-opacity-20 border-r-4 border-[#730202]' : 'hover:bg-[#730202] hover:bg-opacity-10'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-12 h-12 bg-[#730202] rounded-full flex items-center justify-center text-xl">
            {conversation.avatar}
          </div>
          {conversation.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-poppins font-semibold text-[#f5f5f5] truncate">{conversation.name}</h3>
            <span className="text-[#f5f5f5] opacity-60 text-xs">{conversation.timestamp}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-[#f5f5f5] opacity-70 text-sm truncate">{conversation.lastMessage}</p>
            {conversation.unread > 0 && (
              <span className="bg-[#730202] text-[#f5f5f5] text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                {conversation.unread}
              </span>
            )}
          </div>
          
          {conversation.type === 'group' && conversation.members && (
            <p className="text-[#730202] text-xs mt-1">{conversation.members.length} members</p>
          )}
        </div>
      </div>
    </button>
  );

  interface MessageBubbleProps {
    message: typeof messages[number];
    isOwn: boolean;
  }
  const MessageBubble = ({ message, isOwn }: MessageBubbleProps) => (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex ${isOwn ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2 max-w-[70%]`}>
        {!isOwn && (
          <div className="w-8 h-8 bg-[#730202] rounded-full flex items-center justify-center text-sm flex-shrink-0">
            {message.senderAvatar}
          </div>
        )}
        
        <div className={`${isOwn ? 'ml-2' : 'mr-2'}`}>
          <div className={`rounded-2xl px-4 py-3 ${
            isOwn 
              ? 'bg-[#730202] text-[#f5f5f5]' 
              : 'bg-[#000] border border-[#730202] text-[#f5f5f5]'
          }`}>
            {message.type === 'text' && (
              <p className="font-poppins">{message.content}</p>
            )}
            
            {message.type === 'audio' && (
              <div className="flex items-center space-x-3 py-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isOwn ? 'bg-[#f5f5f5] text-[#730202]' : 'bg-[#730202] text-[#f5f5f5]'
                }`}>
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-poppins font-semibold">{message.content}</p>
                  <p className="opacity-70 text-sm">{message.duration}</p>
                </div>
              </div>
            )}
          </div>
          
          <p className={`text-xs text-[#f5f5f5] opacity-60 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
            {message.timestamp}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar - Conversations List */}
      <div className="w-80 bg-[#000] border-r-2 border-[#730202] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#730202]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/dashboard')} className="text-[#730202] hover:text-[#f5f5f5] transition">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-forum text-[#f5f5f5]">Messages</h1>
            </div>
            <button className="text-[#730202] hover:text-[#f5f5f5] transition">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#f5f5f5] opacity-60 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black border border-[#730202] text-[#f5f5f5] rounded-lg focus:border-[#f5f5f5] outline-none font-poppins"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {getFilteredConversations().map((conversation) => (
            <ConversationItem 
              key={conversation.id} 
              conversation={conversation} 
              isSelected={selectedChat === conversation.id}
            />
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-6 border-b border-[#730202] bg-[#000]">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-[#730202] rounded-full flex items-center justify-center text-xl">
                      {selectedConversation.avatar}
                    </div>
                    {selectedConversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-poppins font-semibold text-[#f5f5f5]">{selectedConversation.name}</h2>
                    {selectedConversation.type === 'direct' ? (
                      <p className="text-[#f5f5f5] opacity-70 text-sm">
                        {selectedConversation.isOnline ? 'Online' : 'Last seen 2 hours ago'}
                      </p>
                    ) : (
                      <p className="text-[#f5f5f5] opacity-70 text-sm">{selectedConversation.members ? selectedConversation.members.join(', ') : ''}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 text-[#730202] hover:text-[#f5f5f5] transition">
                    <Music className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-[#730202] hover:text-[#f5f5f5] transition">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <MessageBubble 
                  key={message.id} 
                  message={message} 
                  isOwn={message.senderId === 1}
                />
              ))}
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-[#730202] bg-[#000]">
              <div className="flex items-end space-x-4">
                <div className="flex-1 relative">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full p-4 pr-24 bg-black border-2 border-[#730202] text-[#f5f5f5] rounded-lg focus:border-[#f5f5f5] outline-none font-poppins resize-none"
                    style={{ minHeight: '52px', maxHeight: '120px' }}
                  />
                  
                  {/* Input Tools */}
                  <div className="absolute right-3 bottom-3 flex space-x-2">
                    <button className="p-1 text-[#f5f5f5] opacity-60 hover:opacity-100 transition">
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-[#f5f5f5] opacity-60 hover:opacity-100 transition">
                      <Smile className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={sendMessage}
                  disabled={!messageText.trim()}
                  className={`p-3 rounded-lg transition ${
                    messageText.trim()
                      ? 'bg-[#730202] hover:bg-[#8B0000] text-[#f5f5f5]'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* No Chat Selected */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-[#730202] rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                💬
              </div>
              <h3 className="text-2xl font-forum text-[#f5f5f5] mb-2">Select a conversation</h3>
              <p className="text-[#f5f5f5] opacity-70 font-poppins">Choose a conversation from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;