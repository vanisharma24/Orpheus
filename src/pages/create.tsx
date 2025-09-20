import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Music, Users, Globe, Lock } from 'lucide-react';

const CreateProjectPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    tags: [] as string[],
    isPublic: true,
    collaborators: [] as string[]
  });
  
  const [currentTag, setCurrentTag] = useState('');
  const [currentCollaborator, setCurrentCollaborator] = useState('');

  const genres = [
    'Pop', 'Rock', 'Hip Hop', 'Electronic', 'Classical', 'Jazz', 'R&B', 
    'Country', 'Folk', 'Blues', 'Reggae', 'Funk', 'Ambient', 'House',
    'Techno', 'Indie', 'Alternative', 'Metal', 'Punk', 'Soul'
  ];

  const navigateTo = (page: string) => {
  navigate(page);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags as string[]), currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: (prev.tags as string[]).filter(tag => tag !== tagToRemove)
    }));
  };

  const addCollaborator = () => {
    if (currentCollaborator.trim() && !formData.collaborators.includes(currentCollaborator.trim())) {
      setFormData(prev => ({
        ...prev,
        collaborators: [...(prev.collaborators as string[]), currentCollaborator.trim()]
      }));
      setCurrentCollaborator('');
    }
  };

  const removeCollaborator = (collabToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      collaborators: (prev.collaborators as string[]).filter(collab => collab !== collabToRemove)
    }));
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    navigate('/project', { state: { projectTitle: formData.title } });
  };

  const isFormValid = formData.title.trim() && formData.description.trim() && formData.genre;

  return (
    <div className="min-h-screen bg-black">

      <div className="px-8 py-12 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-forum text-[#f5f5f5] mb-4">Create New Project</h1>
          <p className="text-xl text-[#f5f5f5] font-poppins">Start your next musical collaboration</p>
        </div>

        <div className="space-y-8">
          {/* Project Title */}
          <div className="bg-[#000] border-2 border-[#730202] rounded-xl p-8">
            <h2 className="text-2xl font-forum text-[#f5f5f5] mb-6">Project Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[#f5f5f5] font-poppins text-lg mb-3">Project Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter your project title..."
                  className="w-full p-4 bg-black border-2 border-[#730202] text-[#f5f5f5] rounded-lg focus:border-[#f5f5f5] outline-none font-poppins text-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-[#f5f5f5] font-poppins text-lg mb-3">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your project, what you're looking for, and your vision..."
                  rows={5}
                  className="w-full p-4 bg-black border-2 border-[#730202] text-[#f5f5f5] rounded-lg focus:border-[#f5f5f5] outline-none font-poppins resize-vertical"
                  required
                />
              </div>

              <div>
                <label className="block text-[#f5f5f5] font-poppins text-lg mb-3">Genre *</label>
                <select
                  value={formData.genre}
                  onChange={(e) => handleInputChange('genre', e.target.value)}
                  className="w-full p-4 bg-black border-2 border-[#730202] text-[#f5f5f5] rounded-lg focus:border-[#f5f5f5] outline-none font-poppins"
                  required
                >
                  <option value="">Select a genre...</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-[#000] border-2 border-[#730202] rounded-xl p-8">
            <h2 className="text-2xl font-forum text-[#f5f5f5] mb-6">Tags</h2>
            <p className="text-[#f5f5f5] opacity-70 font-poppins mb-4">Add tags to help others discover your project</p>
            
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                placeholder="Add a tag..."
                className="flex-1 p-3 bg-black border-2 border-[#730202] text-[#f5f5f5] rounded-lg focus:border-[#f5f5f5] outline-none font-poppins"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-6 py-3 bg-[#730202] hover:bg-[#8B0000] text-[#f5f5f5] rounded-lg transition font-poppins"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span key={index} className="flex items-center space-x-2 px-3 py-2 bg-[#730202] text-[#f5f5f5] rounded-full font-poppins">
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-[#000] transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Initial Collaborators */}
          <div className="bg-[#000] border-2 border-[#730202] rounded-xl p-8">
            <h2 className="text-2xl font-forum text-[#f5f5f5] mb-6">Initial Collaborators</h2>
            <p className="text-[#f5f5f5] opacity-70 font-poppins mb-4">Invite collaborators to join your project (optional)</p>
            
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={currentCollaborator}
                onChange={(e) => setCurrentCollaborator(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCollaborator()}
                placeholder="Enter username or email..."
                className="flex-1 p-3 bg-black border-2 border-[#730202] text-[#f5f5f5] rounded-lg focus:border-[#f5f5f5] outline-none font-poppins"
              />
              <button
                type="button"
                onClick={addCollaborator}
                className="px-6 py-3 bg-[#730202] hover:bg-[#8B0000] text-[#f5f5f5] rounded-lg transition font-poppins"
              >
                Invite
              </button>
            </div>

            <div className="space-y-2">
              {formData.collaborators.map((collaborator, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#730202] bg-opacity-20 rounded-lg">
                  <span className="text-[#f5f5f5] font-poppins">{collaborator}</span>
                  <button
                    type="button"
                    onClick={() => removeCollaborator(collaborator)}
                    className="text-[#730202] hover:text-[#f5f5f5] transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-[#000] border-2 border-[#730202] rounded-xl p-8">
            <h2 className="text-2xl font-forum text-[#f5f5f5] mb-6">Privacy Settings</h2>
            
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => handleInputChange('isPublic', true)}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  formData.isPublic 
                    ? 'border-[#730202] bg-[#730202] bg-opacity-20' 
                    : 'border-[#730202] bg-transparent hover:bg-[#730202] hover:bg-opacity-10'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <Globe className="w-6 h-6 text-[#730202]" />
                  <div className="text-left">
                    <h3 className="text-[#f5f5f5] font-poppins font-semibold">Public Project</h3>
                    <p className="text-[#f5f5f5] opacity-70 text-sm">Anyone can discover and request to join</p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleInputChange('isPublic', false)}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  !formData.isPublic 
                    ? 'border-[#730202] bg-[#730202] bg-opacity-20' 
                    : 'border-[#730202] bg-transparent hover:bg-[#730202] hover:bg-opacity-10'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <Lock className="w-6 h-6 text-[#730202]" />
                  <div className="text-left">
                    <h3 className="text-[#f5f5f5] font-poppins font-semibold">Private Project</h3>
                    <p className="text-[#f5f5f5] opacity-70 text-sm">Only invited collaborators can join</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigateTo('/dashboard')}
              className="px-8 py-4 bg-gray-600 hover:bg-gray-700 text-[#f5f5f5] rounded-lg transition font-poppins"
            >
              Cancel
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`px-8 py-4 rounded-lg font-poppins transition ${
                isFormValid
                  ? 'bg-[#730202] hover:bg-[#8B0000] text-[#f5f5f5]'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              Create Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPage;