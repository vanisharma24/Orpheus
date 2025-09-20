import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Music, Users, Search, Filter } from 'lucide-react';

const CommunityPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Mock community posts data
  const posts = [
    {
      id: 1,
      type: 'collaboration',
      author: {
        name: 'Sarah Martinez',
        avatar: '👩‍🎤',
        username: '@sarahm_music'
      },
      timestamp: '2 hours ago',
      content: 'Looking for a skilled drummer to join my indie rock project! I have guitar and vocals covered. Must love energetic, raw sounds. 🥁',
      genre: 'Indie Rock',
      lookingFor: ['Drummer'],
      likes: 12,
      comments: 5,
      isLiked: false
    },
    {
      id: 2,
      type: 'release',
      author: {
        name: 'The Midnight Collective',
        avatar: '🌙',
        username: '@midnight_collective'
      },
      timestamp: '5 hours ago',
      content: 'Just dropped our latest collaborative EP "Nocturnal Dreams"! Huge thanks to all the amazing artists who made this possible. 🎵',
      trackTitle: 'Nocturnal Dreams EP',
      genre: 'Ambient Electronic',
      collaborators: ['Alex K.', 'Luna S.', 'Rico P.'],
      likes: 28,
      comments: 12,
      isLiked: true
    },
    {
      id: 3,
      type: 'update',
      author: {
        name: 'Marcus Johnson',
        avatar: '🎹',
        username: '@marcus_keys'
      },
      timestamp: '8 hours ago',
      content: 'Making great progress on the jazz fusion track with @elena_bass and @tommy_drums. The chemistry is incredible! Can\'t wait to share this with you all.',
      genre: 'Jazz Fusion',
      collaborators: ['Elena B.', 'Tommy R.'],
      likes: 15,
      comments: 8,
      isLiked: false
    },
    {
      id: 4,
      type: 'collaboration',
      author: {
        name: 'Elena Rodriguez',
        avatar: '🎸',
        username: '@elena_bass'
      },
      timestamp: '1 day ago',
      content: 'Seeking a vocalist for a chill lo-fi hip-hop track. I have the instrumental ready - just need that perfect voice to complete it! 🎤',
      genre: 'Lo-fi Hip Hop',
      lookingFor: ['Vocalist'],
      likes: 22,
      comments: 15,
      isLiked: true
    }
  ];

  const [postsState, setPostsState] = useState(posts);

  const navigateTo = (page: string) => {
  navigate(page);
  };

  const toggleLike = (postId: number) => {
    setPostsState(postsState.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const getFilteredPosts = () => {
    let filtered = postsState;
    
    if (activeFilter !== 'all') {
      filtered = filtered.filter(post => post.type === activeFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const PostCard = ({ post }: { post: any }) => (
    <div className="bg-[#000] border-2 border-[#730202] rounded-xl p-6 hover:border-[#f5f5f5] transition-all duration-300">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#730202] rounded-full flex items-center justify-center text-2xl">
            {post.author.avatar}
          </div>
          <div>
            <h3 className="text-[#f5f5f5] font-poppins font-semibold">{post.author.name}</h3>
            <p className="text-[#f5f5f5] opacity-60 text-sm">{post.author.username} • {post.timestamp}</p>
          </div>
        </div>
        
        {/* Post Type Badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-poppins ${
          post.type === 'collaboration' ? 'bg-[#730202] text-[#f5f5f5]' :
          post.type === 'release' ? 'bg-green-600 text-[#f5f5f5]' :
          'bg-blue-600 text-[#f5f5f5]'
        }`}>
          {post.type === 'collaboration' ? '🤝 Collaboration' :
           post.type === 'release' ? '🎵 Release' :
           '📝 Update'}
        </span>
      </div>

      {/* Post Content */}
      <p className="text-[#f5f5f5] font-poppins mb-4 leading-relaxed">{post.content}</p>

      {/* Post Details */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-3 py-1 bg-[#730202] bg-opacity-30 text-[#730202] rounded-full text-sm font-poppins">
            {post.genre}
          </span>
          
          {post.lookingFor && post.lookingFor.map((role: string, index: number) => (
            <span key={index} className="px-3 py-1 bg-orange-600 bg-opacity-30 text-orange-400 rounded-full text-sm font-poppins">
              Looking for: {role}
            </span>
          ))}
          
          {post.trackTitle && (
            <span className="px-3 py-1 bg-green-600 bg-opacity-30 text-green-400 rounded-full text-sm font-poppins">
              🎵 {post.trackTitle}
            </span>
          )}
        </div>

        {post.collaborators && (
          <div className="flex items-center space-x-2 text-[#f5f5f5] opacity-70 text-sm">
            <Users className="w-4 h-4" />
            <span>Collaborating with: {post.collaborators.join(', ')}</span>
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[#730202] border-opacity-30">
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => toggleLike(post.id)}
            className={`flex items-center space-x-2 transition-colors ${
              post.isLiked ? 'text-red-500' : 'text-[#f5f5f5] hover:text-red-500'
            }`}
          >
            <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
            <span className="font-poppins">{post.likes}</span>
          </button>
          
          <button className="flex items-center space-x-2 text-[#f5f5f5] hover:text-[#730202] transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="font-poppins">{post.comments}</span>
          </button>
        </div>

        <button 
          onClick={() => navigateTo(`/profile/${post.author.username}`)}
          className="text-[#730202] hover:text-[#f5f5f5] transition-colors font-poppins text-sm"
        >
          View Profile
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <div className="px-8 py-12 flex flex-col lg:flex-row gap-8">
        {/* Main Feed and Sidebar Layout */}
        <div className="flex-1">
          {/* Navigation Buttons - centered above feed */}
          <div className="mb-8 flex flex-wrap gap-4 justify-center items-center">
            <button
              className="px-6 py-2 bg-[#730202] text-[#f5f5f5] rounded-lg font-poppins hover:bg-[#8B0000] transition"
              onClick={() => navigateTo('/userprofile')}
            >
              User Profile
            </button>
            <button
              className="px-6 py-2 bg-[#730202] text-[#f5f5f5] rounded-lg font-poppins hover:bg-[#8B0000] transition"
              onClick={() => navigateTo('/search')}
            >
              Search
            </button>
            <button
              className="px-6 py-2 bg-[#730202] text-[#f5f5f5] rounded-lg font-poppins hover:bg-[#8B0000] transition"
              onClick={() => navigateTo('/create')}
            >
              Create
            </button>
            <button
              className="px-6 py-2 bg-[#730202] text-[#f5f5f5] rounded-lg font-poppins hover:bg-[#8B0000] transition"
              onClick={() => navigateTo('/userprofile?tab=settings')}
            >
              Settings
            </button>
          </div>

          {/* Posts Feed */}
          <div className="flex-1 max-w-4xl">
            <div className="space-y-6">
              {getFilteredPosts().map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {getFilteredPosts().length === 0 && (
              <div className="text-center py-12">
                <Music className="w-16 h-16 text-[#730202] mx-auto mb-4 opacity-50" />
                <h3 className="text-2xl font-forum text-[#f5f5f5] mb-2">No posts found</h3>
                <p className="text-[#f5f5f5] opacity-70 font-poppins">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Quick Stats */}
        <div className="w-full lg:w-64 lg:sticky lg:top-32 hidden lg:block self-start">
          <div className="bg-[#000] border-2 border-[#730202] rounded-xl p-6">
            <h3 className="text-xl font-forum text-[#f5f5f5] mb-4">Community Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#f5f5f5] font-poppins">Active Musicians</span>
                <span className="text-[#730202] font-bold">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#f5f5f5] font-poppins">Projects This Week</span>
                <span className="text-[#730202] font-bold">89</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#f5f5f5] font-poppins">Collaborations</span>
                <span className="text-[#730202] font-bold">156</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;