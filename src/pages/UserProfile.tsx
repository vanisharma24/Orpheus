import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit3, Music, Users, Calendar, MapPin, Mail, Globe, Play, MessageCircle } from 'lucide-react';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState<string>('projects');
  const [isOwnProfile, setIsOwnProfile] = useState<boolean>(true);
  const navigate = useNavigate();

  // Mock user data
  const user = {
    id: 1,
    name: 'John Doe',
    username: '@johndoe_music',
    avatar: '🎵',
    bio: 'Passionate composer and producer exploring the intersection of classical and electronic music. Always looking for creative collaborations!',
    location: 'Los Angeles, CA',
    website: 'www.johndobemusic.com',
    email: 'john@example.com',
    joinedDate: 'March 2023',
    stats: {
      projects: 12,
      collaborations: 25,
      followers: 234,
      following: 189
    }
  };

  const projects = [
    {
      id: 1,
      title: 'Midnight Symphony',
      genre: 'Classical Fusion',
      collaborators: ['Sarah M.', 'Alex K.'],
      status: 'In Progress',
      lastUpdated: '2 days ago',
      isPublic: true
    },
    {
      id: 2,
      title: 'Electric Dreams',
      genre: 'Electronic',
      collaborators: ['Luna S.'],
      status: 'Completed',
      lastUpdated: '1 week ago',
      isPublic: true
    },
    {
      id: 3,
      title: 'Urban Landscapes',
      genre: 'Hip Hop',
      collaborators: ['Rico P.', 'Maya L.', 'Sam T.'],
      status: 'Released',
      lastUpdated: '2 weeks ago',
      isPublic: true
    }
  ];

  const posts = [
    {
      id: 1,
      type: 'collaboration',
      content: 'Looking for a skilled drummer to join my indie rock project! I have guitar and vocals covered.',
      timestamp: '3 days ago',
      likes: 15,
      comments: 7
    },
    {
      id: 2,
      type: 'release',
      content: 'Just finished mixing the latest track with @alexk_producer. The sound is absolutely incredible!',
      timestamp: '1 week ago',
      likes: 28,
      comments: 12
    },
    {
      id: 3,
      type: 'update',
      content: 'Had an amazing jam session today. Sometimes the best music happens when you least expect it! 🎶',
      timestamp: '2 weeks ago',
      likes: 22,
      comments: 9
    }
  ];

  const navigateTo = (page: string) => {
    console.log(`Navigate to ${page}`);
  };

  const ProjectCard = ({ project }: { project: any }) => (
    <div className="bg-[#000] border-2 border-[#730202] rounded-xl p-6 hover:border-[#f5f5f5] transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-poppins font-semibold text-[#f5f5f5] mb-2">{project.title}</h3>
          <p className="text-[#730202] font-poppins mb-2">{project.genre}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-poppins ${
          project.status === 'Released' ? 'bg-green-600 text-[#f5f5f5]' :
          project.status === 'Completed' ? 'bg-blue-600 text-[#f5f5f5]' :
          'bg-orange-600 text-[#f5f5f5]'
        }`}>
          {project.status}
        </span>
      </div>
      <div className="mb-4">
        <p className="text-[#f5f5f5] opacity-70 text-sm mb-2">Collaborators:</p>
        <div className="flex flex-wrap gap-2">
          {project.collaborators.map((collab: string, index: number) => (
            <span key={index} className="px-2 py-1 bg-[#730202] bg-opacity-30 text-[#730202] rounded-full text-xs font-poppins">
              {collab}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-xs text-[#f5f5f5] opacity-60">Last updated: {project.lastUpdated}</span>
        {project.isPublic && <Globe className="w-4 h-4 text-green-400" />}
      </div>
    </div>
  );

  const PostCard = ({ post }: { post: any }) => (
    <div className="bg-[#000] border-2 border-[#730202] rounded-xl p-6 mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className={`px-3 py-1 rounded-full text-xs font-poppins ${
          post.type === 'collaboration' ? 'bg-[#730202] text-[#f5f5f5]' :
          post.type === 'release' ? 'bg-green-600 text-[#f5f5f5]' :
          'bg-blue-600 text-[#f5f5f5]'
        }`}>
          {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
        </span>
        <span className="text-xs text-[#f5f5f5] opacity-60">{post.timestamp}</span>
      </div>
      <p className="text-[#f5f5f5] font-poppins mb-2">{post.content}</p>
      <div className="flex space-x-6">
        <span className="flex items-center space-x-1 text-[#f5f5f5]"><Music className="w-4 h-4" />{post.likes}</span>
        <span className="flex items-center space-x-1 text-[#f5f5f5]"><MessageCircle className="w-4 h-4" />{post.comments}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Profile Header */}
      <div className="bg-[#730202] text-[#f5f5f5] px-8 py-8 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button onClick={() => navigate('/Community')} className="hover:text-[#000] transition">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-16 h-16 bg-[#000] rounded-full flex items-center justify-center text-3xl">{user.avatar}</div>
          <div>
            <h2 className="text-3xl font-forum font-bold">{user.name}</h2>
            <p className="text-[#f5f5f5] opacity-70">{user.username}</p>
          </div>
        </div>
        {isOwnProfile && (
          <button
            className="flex items-center space-x-2 bg-[#000] text-[#f5f5f5] px-4 py-2 rounded-lg font-poppins hover:bg-[#f5f5f5] hover:text-[#730202] transition"
            onClick={() => navigate('/settings')}
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {/* Bio & Info */}
      <div className="px-8 py-6">
        <p className="text-lg text-[#f5f5f5] font-poppins mb-4">{user.bio}</p>
        <div className="flex space-x-8 text-[#f5f5f5] opacity-80 font-poppins mb-4">
          <span className="flex items-center space-x-2"><MapPin className="w-4 h-4" />{user.location}</span>
          <span className="flex items-center space-x-2"><Globe className="w-4 h-4" />{user.website}</span>
          <span className="flex items-center space-x-2"><Mail className="w-4 h-4" />{user.email}</span>
          <span className="flex items-center space-x-2"><Calendar className="w-4 h-4" />Joined {user.joinedDate}</span>
        </div>
        <div className="flex space-x-8 font-poppins">
          <span>Projects: <span className="font-bold text-[#730202]">{user.stats.projects}</span></span>
          <span>Collaborations: <span className="font-bold text-[#730202]">{user.stats.collaborations}</span></span>
          <span>Followers: <span className="font-bold text-[#730202]">{user.stats.followers}</span></span>
          <span>Following: <span className="font-bold text-[#730202]">{user.stats.following}</span></span>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-8 py-4 flex space-x-6 border-b border-[#730202]">
        <button
          className={`font-poppins px-4 py-2 rounded-lg transition ${activeTab === 'projects' ? 'bg-[#730202] text-[#f5f5f5]' : 'bg-[#000] text-[#f5f5f5] border border-[#730202]'}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button
          className={`font-poppins px-4 py-2 rounded-lg transition ${activeTab === 'posts' ? 'bg-[#730202] text-[#f5f5f5]' : 'bg-[#000] text-[#f5f5f5] border border-[#730202]'}`}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </button>
      </div>

      {/* Tab Content */}
      <div className="px-8 py-8">
        {activeTab === 'projects' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;