import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Music, Users, Play, Heart, MessageCircle } from 'lucide-react';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock search results
  const searchResults = {
    projects: [
      {
        id: 1,
        title: 'Midnight Symphony',
        description: 'A collaborative classical piece blending modern electronic elements',
        genre: 'Classical Fusion',
        owner: 'John Doe',
        collaborators: 3,
        isPublic: true,
        tags: ['Classical', 'Electronic', 'Orchestral'],
        lastUpdated: '2 days ago'
      },
      {
        id: 2,
        title: 'Urban Beats Collective',
        description: 'Hip-hop project looking for producers and vocalists',
        genre: 'Hip Hop',
        owner: 'Maya Rodriguez',
        collaborators: 5,
        isPublic: true,
        tags: ['Hip Hop', 'Rap', 'Urban'],
        lastUpdated: '1 week ago'
      },
      {
        id: 3,
        title: 'Ambient Dreamscape',
        description: 'Creating ethereal soundscapes for meditation and relaxation',
        genre: 'Ambient',
        owner: 'Luna Sterling',
        collaborators: 2,
        isPublic: true,
        tags: ['Ambient', 'Meditation', 'Relaxation'],
        lastUpdated: '3 days ago'
      }
    ],
    users: [
      {
        id: 1,
        name: 'Sarah Martinez',
        username: '@sarahm_music',
        avatar: '👩‍🎤',
        bio: 'Indie rock guitarist and songwriter looking for collaborations',
        genres: ['Indie Rock', 'Alternative', 'Folk'],
        projects: 8,
        collaborations: 12
      },
      {
        id: 2,
        name: 'Alex Chen',
        username: '@alexc_producer',
        avatar: '🎧',
        bio: 'Electronic music producer specializing in ambient and house',
        genres: ['Electronic', 'Ambient', 'House'],
        projects: 15,
        collaborations: 23
      },
      {
        id: 3,
        name: 'Marcus Williams',
        username: '@marcus_jazz',
        avatar: '🎹',
        bio: 'Jazz pianist and composer exploring fusion and contemporary styles',
        genres: ['Jazz', 'Fusion', 'Contemporary'],
        projects: 12,
        collaborations: 18
      }
    ],
    tracks: [
      {
        id: 1,
        title: 'Electric Nights',
        artist: 'The Synth Collective',
        genre: 'Electronic',
        duration: '4:23',
        likes: 45,
        plays: 1200,
        isPublic: true
      },
      {
        id: 2,
        title: 'Autumn Leaves Jazz',
        artist: 'Marcus & Friends',
        genre: 'Jazz',
        duration: '6:15',
        likes: 32,
        plays: 890,
        isPublic: true
      },
      {
        id: 3,
        title: 'Mountain Echo',
        artist: 'Luna Sterling',
        genre: 'Ambient',
        duration: '8:42',
        likes: 28,
        plays: 650,
        isPublic: true
      }
    ]
  };

  const genres = [
    'Pop', 'Rock', 'Hip Hop', 'Electronic', 'Classical', 'Jazz', 'R&B', 
    'Country', 'Folk', 'Blues', 'Reggae', 'Funk', 'Ambient', 'House',
    'Techno', 'Indie', 'Alternative', 'Metal'
  ];

  const navigateTo = (page: string) => {
  navigate(page);
  };

  const getFilteredResults = () => {
    // This would normally filter based on searchQuery, activeFilter, and genreFilter
    // For demo purposes, we'll just return the mock data
    return searchResults;
  };

  const ProjectCard = ({ project }: { project: any }) => (
    <div className="bg-[#000] border-2 border-[#730202] rounded-xl p-6 hover:border-[#f5f5f5] transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-poppins font-semibold text-[#f5f5f5] mb-2">{project.title}</h3>
          <p className="text-[#f5f5f5] text-sm mb-1">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {project.tags.map((tag: string) => (
              <span key={tag} className="bg-[#730202] text-[#f5f5f5] px-2 py-1 rounded-full text-xs">{tag}</span>
            ))}
          </div>
          <span className="text-xs text-[#f5f5f5]">Last updated: {project.lastUpdated}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-[#f5f5f5]">Owner: {project.owner}</span>
          <span className="text-xs text-[#f5f5f5]">Collaborators: {project.collaborators}</span>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <Music size={18} className="text-[#f5f5f5]" />
        <span className="text-xs text-[#f5f5f5]">{project.genre}</span>
      </div>
    </div>
  );

  const UserCard = ({ user }: { user: any }) => (
    <div className="bg-[#000] border-2 border-[#730202] rounded-xl p-6 hover:border-[#f5f5f5] transition-all duration-300 flex items-center gap-4">
      <span className="text-3xl">{user.avatar}</span>
      <div>
        <h3 className="text-lg font-poppins font-semibold text-[#f5f5f5] mb-1">{user.name} <span className="text-xs text-[#730202]">{user.username}</span></h3>
        <p className="text-[#f5f5f5] text-sm mb-1">{user.bio}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {user.genres.map((genre: string) => (
            <span key={genre} className="bg-[#730202] text-[#f5f5f5] px-2 py-1 rounded-full text-xs">{genre}</span>
          ))}
        </div>
        <span className="text-xs text-[#f5f5f5]">Projects: {user.projects} | Collaborations: {user.collaborations}</span>
      </div>
    </div>
  );

  const TrackCard = ({ track }: { track: any }) => (
    <div className="bg-[#000] border-2 border-[#730202] rounded-xl p-6 hover:border-[#f5f5f5] transition-all duration-300">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-poppins font-semibold text-[#f5f5f5]">{track.title}</h3>
        <span className="text-xs text-[#f5f5f5]">{track.genre}</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-[#f5f5f5]">Artist: {track.artist}</span>
        <span className="text-xs text-[#f5f5f5]">Duration: {track.duration}</span>
      </div>
      <div className="flex gap-4 mt-2">
        <Play size={18} className="text-[#f5f5f5]" />
        <span className="text-xs text-[#f5f5f5]">Plays: {track.plays}</span>
        <Heart size={18} className="text-[#f5f5f5]" />
        <span className="text-xs text-[#f5f5f5]">Likes: {track.likes}</span>
      </div>
    </div>
  );

  const filteredResults = getFilteredResults();

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-8 px-4 md:px-16">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex flex-1 items-center gap-2 bg-[#000] border-2 border-[#730202] rounded-xl px-4 py-2">
          <Search size={20} className="text-[#f5f5f5]" />
          <input
            type="text"
            className="bg-transparent outline-none text-[#f5f5f5] flex-1"
            placeholder="Search projects, users, tracks..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-[#730202] text-[#f5f5f5] rounded-xl hover:bg-[#f5f5f5] hover:text-[#730202] transition-all"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          Filters
        </button>
      </div>
      {showFilters && (
        <div className="bg-[#000] border-2 border-[#730202] rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-xl ${activeFilter === 'all' ? 'bg-[#730202] text-[#f5f5f5]' : 'bg-[#222] text-[#f5f5f5]'}`}
              onClick={() => setActiveFilter('all')}
            >All</button>
            <button
              className={`px-4 py-2 rounded-xl ${activeFilter === 'projects' ? 'bg-[#730202] text-[#f5f5f5]' : 'bg-[#222] text-[#f5f5f5]'}`}
              onClick={() => setActiveFilter('projects')}
            >Projects</button>
            <button
              className={`px-4 py-2 rounded-xl ${activeFilter === 'users' ? 'bg-[#730202] text-[#f5f5f5]' : 'bg-[#222] text-[#f5f5f5]'}`}
              onClick={() => setActiveFilter('users')}
            >Users</button>
            <button
              className={`px-4 py-2 rounded-xl ${activeFilter === 'tracks' ? 'bg-[#730202] text-[#f5f5f5]' : 'bg-[#222] text-[#f5f5f5]'}`}
              onClick={() => setActiveFilter('tracks')}
            >Tracks</button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              className="bg-[#222] text-[#f5f5f5] px-4 py-2 rounded-xl"
              value={genreFilter}
              onChange={e => setGenreFilter(e.target.value)}
            >
              <option value="">All Genres</option>
              {genres.map((genre: string) => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(activeFilter === 'all' || activeFilter === 'projects') && filteredResults.projects.map((project: any) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {(activeFilter === 'all' || activeFilter === 'users') && filteredResults.users.map((user: any) => (
          <UserCard key={user.id} user={user} />
        ))}
        {(activeFilter === 'all' || activeFilter === 'tracks') && filteredResults.tracks.map((track: any) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;