// pages/UserDashboard.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Types
interface Project {
  id: string;
  title: string;
  description: string;
  genre: string;
  collaborators: number;
  lastUpdated: string;
  isPublic: boolean;
}

interface Collaboration {
  id: string;
  title: string;
  owner: string;
  role: string;
  lastUpdated: string;
}

interface RecentActivity {
  id: string;
  type: 'upload' | 'collaboration' | 'comment' | 'like';
  project: string;
  timestamp: string;
  user?: string;
}

interface Stats {
  projects: number;
  collaborations: number;
  tracks: number;
  connections: number;
}

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "collaborations">("overview");
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    collaborations: 0,
    tracks: 0,
    connections: 0
  });

  // Sample data
  const myProjects: Project[] = [
    { 
      id: "1", 
      title: "Summer Vibes", 
      description: "A chill summer track with acoustic guitar",
      genre: "Pop",
      collaborators: 3, 
      lastUpdated: "2 days ago",
      isPublic: true
    },
    { 
      id: "2", 
      title: "Night Drive", 
      description: "Synthwave inspired nighttime driving music",
      genre: "Electronic",
      collaborators: 1, 
      lastUpdated: "1 week ago",
      isPublic: false
    },
    { 
      id: "3", 
      title: "Urban Dreams", 
      description: "Hip hop collaboration with city vibes",
      genre: "Hip Hop",
      collaborators: 2, 
      lastUpdated: "3 days ago",
      isPublic: true
    },
  ];

  const collaborations: Collaboration[] = [
    { 
      id: "4", 
      title: "Ocean Waves", 
      owner: "Maria Garcia", 
      role: "Sound Designer", 
      lastUpdated: "Yesterday" 
    },
    { 
      id: "5", 
      title: "Mountain Echoes", 
      owner: "Alex Johnson", 
      role: "Guitarist", 
      lastUpdated: "5 days ago" 
    },
  ];

  const recentActivities: RecentActivity[] = [
    { 
      id: "1", 
      type: 'upload', 
      project: "Summer Vibes", 
      timestamp: "2 hours ago" 
    },
    { 
      id: "2", 
      type: 'collaboration', 
      project: "Urban Dreams", 
      timestamp: "1 day ago",
      user: "Alex Johnson"
    },
    { 
      id: "3", 
      type: 'like', 
      project: "Ocean Waves", 
      timestamp: "2 days ago",
      user: "Maria Garcia"
    },
    { 
      id: "4", 
      type: 'comment', 
      project: "Night Drive", 
      timestamp: "3 days ago",
      user: "DJ Beats"
    },
  ];

  useEffect(() => {
    // Simulate loading stats
    setStats({
      projects: myProjects.length,
      collaborations: collaborations.length,
      tracks: 14, // Example value
      connections: 8 // Example value
    });
  }, []);

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'upload': return '📤';
      case 'collaboration': return '👥';
      case 'comment': return '💬';
      case 'like': return '❤️';
      default: return '🔔';
    }
  };

  const getActivityText = (activity: RecentActivity) => {
    switch (activity.type) {
      case 'upload':
        return `Uploaded a new track to ${activity.project}`;
      case 'collaboration':
        return `Joined ${activity.user}'s project ${activity.project}`;
      case 'comment':
        return `${activity.user} commented on ${activity.project}`;
      case 'like':
        return `${activity.user} liked ${activity.project}`;
      default:
        return `New activity on ${activity.project}`;
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#f5f5f5] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-poppins font-bold">Dashboard</h1>
            <p className="text-gray-400 mt-2">Welcome back! Here's what's happening with your projects.</p>
          </div>
          <Link 
            to="/project/new" 
            className="bg-[#730202] hover:bg-[#8a0303] text-[#f5f5f5] font-poppins font-medium py-3 px-6 rounded-lg inline-flex items-center transition-colors mt-4 md:mt-0"
          >
            <span className="mr-2">➕</span> Create New Project
          </Link>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#000000] border border-[#730202] rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[#730202]">{stats.projects}</div>
            <div className="text-gray-400 mt-2">Projects</div>
          </div>
          <div className="bg-[#000000] border border-[#730202] rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[#730202]">{stats.collaborations}</div>
            <div className="text-gray-400 mt-2">Collaborations</div>
          </div>
          <div className="bg-[#000000] border border-[#730202] rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[#730202]">{stats.tracks}</div>
            <div className="text-gray-400 mt-2">Tracks</div>
          </div>
          <div className="bg-[#000000] border border-[#730202] rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[#730202]">{stats.connections}</div>
            <div className="text-gray-400 mt-2">Connections</div>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <div className="flex border-b border-[#730202] mb-8">
          <button
            className={`py-2 px-4 font-poppins ${activeTab === "overview" ? "border-b-2 border-[#730202] text-[#f5f5f5]" : "text-gray-400"}`}
            onClick={() => setActiveTab("overview")}
          >
            📊 Overview
          </button>
          <button
            className={`py-2 px-4 font-poppins ${activeTab === "projects" ? "border-b-2 border-[#730202] text-[#f5f5f5]" : "text-gray-400"}`}
            onClick={() => setActiveTab("projects")}
          >
            📁 My Projects
          </button>
          <button
            className={`py-2 px-4 font-poppins ${activeTab === "collaborations" ? "border-b-2 border-[#730202] text-[#f5f5f5]" : "text-gray-400"}`}
            onClick={() => setActiveTab("collaborations")}
          >
            👥 Collaborations
          </button>
        </div>
        
        {/* Content based on active tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Projects */}
            <div>
              <h2 className="text-2xl font-poppins font-semibold mb-4">Recent Projects</h2>
              <div className="bg-[#000000] border border-[#730202] rounded-xl p-6">
                {myProjects.slice(0, 3).map(project => (
                  <div key={project.id} className="mb-4 last:mb-0 pb-4 last:pb-0 border-b border-gray-800 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-poppins font-medium">{project.title}</h3>
                        <p className="text-gray-400 text-sm">{project.genre} • {project.collaborators} collaborator(s)</p>
                        <p className="text-gray-400 text-sm mt-1">{project.description}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${project.isPublic ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'}`}>
                        {project.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">Last updated: {project.lastUpdated}</p>
                    <div className="mt-2">
                      <Link 
                        to={`/project/${project.id}`} 
                        className="text-[#730202] hover:text-[#8a0303] font-poppins text-sm font-medium transition-colors"
                      >
                        Open Project →
                      </Link>
                    </div>
                  </div>
                ))}
                <div className="mt-4 text-center">
                  <Link 
                    to="#" 
                    className="text-[#730202] hover:text-[#8a0303] font-poppins text-sm font-medium transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("projects");
                    }}
                  >
                    View All Projects →
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div>
              <h2 className="text-2xl font-poppins font-semibold mb-4">Recent Activity</h2>
              <div className="bg-[#000000] border border-[#730202] rounded-xl p-6">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-start mb-4 last:mb-0">
                    <span className="text-xl mr-3 mt-1">{getActivityIcon(activity.type)}</span>
                    <div className="flex-1">
                      <p className="font-poppins">{getActivityText(activity)}</p>
                      <p className="text-gray-400 text-xs mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-4 text-center">
                  <Link 
                    to="/community" 
                    className="text-[#730202] hover:text-[#8a0303] font-poppins text-sm font-medium transition-colors"
                  >
                    View Community →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "projects" && (
          <div>
            <h2 className="text-2xl font-poppins font-semibold mb-4">My Projects</h2>
            {myProjects.length === 0 ? (
              <div className="bg-[#000000] border border-[#730202] rounded-xl p-8 text-center">
                <p className="text-gray-400 mb-4">You haven't created any projects yet.</p>
                <Link 
                  to="/project/new" 
                  className="bg-[#730202] hover:bg-[#8a0303] text-[#f5f5f5] font-poppins font-medium py-2 px-6 rounded-lg inline-flex items-center transition-colors"
                >
                  Create Your First Project
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myProjects.map(project => (
                  <div key={project.id} className="bg-[#000000] border border-[#730202] rounded-xl p-6 hover:shadow-lg hover:shadow-[#730202]/20 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-poppins font-semibold">{project.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${project.isPublic ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'}`}>
                        {project.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-2">{project.genre}</p>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-400 text-sm">{project.collaborators} collaborator(s)</p>
                        <p className="text-gray-400 text-sm">Last updated: {project.lastUpdated}</p>
                      </div>
                      <div className="mt-4">
                        <Link 
                          to={`/project/${project.id}`} 
                          className="text-[#730202] hover:text-[#8a0303] font-poppins font-medium transition-colors"
                        >
                          Open →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === "collaborations" && (
          <div>
            <h2 className="text-2xl font-poppins font-semibold mb-4">Collaborations</h2>
            {collaborations.length === 0 ? (
              <div className="bg-[#000000] border border-[#730202] rounded-xl p-8 text-center">
                <p className="text-gray-400 mb-4">You haven't joined any projects yet.</p>
                <Link 
                  to="/community" 
                  className="bg-[#730202] hover:bg-[#8a0303] text-[#f5f5f5] font-poppins font-medium py-2 px-6 rounded-lg inline-flex items-center transition-colors"
                >
                  Explore Community
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {collaborations.map(project => (
                  <div key={project.id} className="bg-[#000000] border border-[#730202] rounded-xl p-6 hover:shadow-lg hover:shadow-[#730202]/20 transition-all">
                    <h3 className="text-xl font-poppins font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-2">Owner: {project.owner}</p>
                    <p className="text-gray-400 mb-2">Your role: {project.role}</p>
                    <p className="text-gray-400 text-sm mb-4">Last updated: {project.lastUpdated}</p>
                    <div className="mt-4">
                      <Link 
                        to={`/project/${project.id}`} 
                        className="text-[#730202] hover:text-[#8a0303] font-poppins font-medium transition-colors"
                      >
                        Open Project →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-poppins font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              to="/project/new" 
              className="bg-[#000000] border border-[#730202] rounded-xl p-6 text-center hover:shadow-lg hover:shadow-[#730202]/20 transition-all"
            >
              <div className="text-3xl mb-3">🎵</div>
              <h3 className="font-poppins font-medium mb-2">Start New Project</h3>
              <p className="text-gray-400 text-sm">Create a blank project or use a template</p>
            </Link>
            <Link 
              to="/community" 
              className="bg-[#000000] border border-[#730202] rounded-xl p-6 text-center hover:shadow-lg hover:shadow-[#730202]/20 transition-all"
            >
              <div className="text-3xl mb-3">👥</div>
              <h3 className="font-poppins font-medium mb-2">Find Collaborators</h3>
              <p className="text-gray-400 text-sm">Browse musicians looking to collaborate</p>
            </Link>
            <Link 
              to="/userprofile" 
              className="bg-[#000000] border border-[#730202] rounded-xl p-6 text-center hover:shadow-lg hover:shadow-[#730202]/20 transition-all"
            >
              <div className="text-3xl mb-3">👤</div>
              <h3 className="font-poppins font-medium mb-2">Edit Profile</h3>
              <p className="text-gray-400 text-sm">Update your bio, skills, and preferences</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;