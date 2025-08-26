import React, { useState } from 'react';

interface Project {
  id: string;
  name: string;
  owner_principal: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState<string>('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    const mockPrincipal = "rdmx6-jaaaa-aaaah-qcaiq-cai";
    setPrincipal(mockPrincipal);
    setIsAuthenticated(true);
    loadProjects();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setPrincipal('');
    setProjects([]);
  };

  const loadProjects = async () => {
    if (!principal) return;
    setIsLoading(true);
    try {
      const mockProjects: Project[] = [
        { id: 'project_1', name: 'My First Song', owner_principal: principal },
        { id: 'project_2', name: 'Collaboration Track', owner_principal: principal },
      ];
      setProjects(mockProjects);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim() || !principal) return;

    setIsLoading(true);
    try {
      const newProject: Project = {
        id: `project_${Date.now()}`,
        name: newProjectName,
        owner_principal: principal,
      };
      setProjects([...projects, newProject]);
      setNewProjectName('');
    } catch (error) {
      console.error('Failed to create project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- Landing Page ----------------
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Moving Blocks */}
        <div className="blocks">
          <div className="block animate-block bg-black"></div>
          <div className="block animate-block bg-black"></div>
          <div className="block animate-block bg-black"></div>
        </div>

        {/* Video Background */}
        <div className="hero-video">
          <video autoPlay loop muted>
            <source src="studio1.mp4.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

        {/* Landing Page Content */}
        <div className="relative z-20 text-center px-4">
          <h1 className="text-6xl font-augustus text-primary mb-8">Orpheus</h1>
          <p className="text-xl font-french text-gray-300 mb-8">
            Where Musicians Unite and Keep Control.
          </p>
          <button
            onClick={login}
            className="bg-primary text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Login with Internet Identity
          </button>
        </div>
      </div>
    );
  }

  // ---------------- Authenticated App ----------------
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header / Navigation */}
      <header className="bg-black font-augustus shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-3xl font-bold text-textSecondary">Orpheus</h1>
            <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
              <a href="#dashboard" className="hover:text-white transition-colors">Dashboard</a>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              <a href="#studio" className="hover:text-white transition-colors">Studio</a>
            </nav>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white">
                Principal: {principal.slice(0, 10)}...{principal.slice(-10)}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Project Form */}
          <div className="bg-white rounded-lg shadow p-6" id="projects">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Project</h2>
            <form onSubmit={createProject} className="space-y-4">
              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2">
                 
                </label>
                <input
                  type="text"
                  id="projectName"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project name..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !newProjectName.trim()}
                className="w-full bg-primary  disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                {isLoading ? 'Creating...' : 'Create Project'}
              </button>
            </form>
          </div>

          {/* Projects List */}
          <div className="bg-white rounded-lg shadow p-6" id="dashboard">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Projects</h2>
            {isLoading ? (
              <div className="text-center py-8">
                <div className=" rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-2 text-gray-600">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No projects yet. Create your first one!
              </div>
            ) : (
              <div className="space-y-3">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-500">ID: {project.id}</p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {project.owner_principal.slice(0, 8)}...{project.owner_principal.slice(-8)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Orpheus. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
