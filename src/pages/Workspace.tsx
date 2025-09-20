import React, { useState } from 'react';
import { Play, Pause, Square, Volume2, Mic, Headphones, Users, MessageSquare, Settings, Save, Download } from 'lucide-react';

const MusicWorkspace = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [volume, setVolume] = useState(75);

  // Mock track data
  const tracks = [
    { id: 1, name: 'Main Melody', user: 'John Doe', muted: false, solo: false, volume: 80, color: '#730202' },
    { id: 2, name: 'Bass Line', user: 'Sarah M.', muted: false, solo: false, volume: 70, color: '#00A86B' },
    { id: 3, name: 'Drums', user: 'Alex K.', muted: true, solo: false, volume: 90, color: '#FF6B35' },
    { id: 4, name: 'Vocals', user: 'Luna S.', muted: false, solo: false, volume: 85, color: '#6A4C93' }
  ];

  const [trackStates, setTrackStates] = useState(tracks);

  // Mock collaborators
  const collaborators = [
    { id: 1, name: 'John Doe', avatar: '🎵', isOnline: true, isRecording: false },
    { id: 2, name: 'Sarah M.', avatar: '👩‍🎤', isOnline: true, isRecording: false },
    { id: 3, name: 'Alex K.', avatar: '🎧', isOnline: false, isRecording: false },
    { id: 4, name: 'Luna S.', avatar: '🌙', isOnline: true, isRecording: true }
  ];

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleRecording = () => setIsRecording(!isRecording);

  const updateTrack = (trackId: number, property: string, value: any) => {
    setTrackStates(prev => 
      prev.map(track => 
        track.id === trackId ? { ...track, [property]: value } : track
      )
    );
  };

  return (
    <div className="h-screen bg-black text-[#f5f5f5] flex flex-col overflow-hidden">
      {/* Top Navigation */}
      <nav className="bg-[#730202] px-8 py-4 flex-shrink-0">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-forum">Midnight Symphony - Live Session</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-poppins text-sm">Live Session</span>
            </div>
            <button className="p-2 hover:bg-[#8B0000] rounded transition">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar - Collaborators & Chat */}
        <div className="w-80 bg-black border-r-2 border-[#730202] flex flex-col flex-shrink-0">
          {/* Collaborators */}
          <div className="p-6 border-b border-[#730202] flex-shrink-0">
            <h2 className="text-lg font-forum mb-4">Live Collaborators</h2>
            <div className="space-y-3">
              {collaborators.map(collab => (
                <div key={collab.id} className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-[#730202] rounded-full flex items-center justify-center text-lg">
                      {collab.avatar}
                    </div>
                    {collab.isOnline && (
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black ${
                        collab.isOnline ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-poppins font-semibold">{collab.name}</p>
                    <p className="text-sm opacity-60">
                      {collab.isRecording ? '🔴 Recording...' : collab.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                  <button className="p-1 hover:bg-[#730202] rounded transition">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="p-4 border-b border-[#730202] flex-shrink-0">
              <h3 className="font-forum">Session Chat</h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              <div className="bg-[#730202] bg-opacity-20 rounded-lg p-3">
                <p className="text-sm font-semibold">Sarah M.</p>
                <p className="text-sm">Love the new bass line! 🎸</p>
              </div>
              <div className="bg-[#730202] bg-opacity-20 rounded-lg p-3">
                <p className="text-sm font-semibold">Luna S.</p>
                <p className="text-sm">Should we try a higher key?</p>
              </div>
              <div className="bg-[#730202] bg-opacity-20 rounded-lg p-3">
                <p className="text-sm font-semibold">Alex K.</p>
                <p className="text-sm">The drums are sounding tight! 🥁</p>
              </div>
              <div className="bg-[#730202] bg-opacity-20 rounded-lg p-3">
                <p className="text-sm font-semibold">John Doe</p>
                <p className="text-sm">Let's try adding some reverb to the vocals</p>
              </div>
            </div>
            <div className="p-4 border-t border-[#730202] flex-shrink-0">
              <input 
                type="text" 
                placeholder="Type a message..."
                className="w-full p-2 bg-black border border-[#730202] rounded text-[#f5f5f5] outline-none focus:border-[#f5f5f5]"
              />
            </div>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col min-h-0 bg-black">
          {/* Transport Controls */}
          <div className="p-6 border-b border-[#730202] bg-black flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={togglePlay}
                  className="w-12 h-12 bg-[#730202] hover:bg-[#8B0000] rounded-full flex items-center justify-center transition"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </button>
                
                <button className="w-10 h-10 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition">
                  <Square className="w-5 h-5" />
                </button>

                <button 
                  onClick={toggleRecording}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                    isRecording ? 'bg-red-600 animate-pulse' : 'bg-red-800 hover:bg-red-700'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </button>

                <div className="text-2xl font-mono">00:02:34</div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-5 h-5" />
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-sm w-8">{volume}</span>
                </div>
                
                <button className="p-2 bg-[#730202] hover:bg-[#8B0000] rounded transition">
                  <Mic className="w-5 h-5" />
                </button>
                
                <button className="p-2 bg-[#730202] hover:bg-[#8B0000] rounded transition">
                  <Headphones className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Track Mixer - Scrollable Content */}
          <div className="flex-1 p-6 overflow-y-auto bg-black">
            <h2 className="text-xl font-forum mb-6">Live Mix</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {trackStates.map((track, index) => (
                <div key={track.id} className={`bg-black border-2 rounded-xl p-6 transition-all ${
                  selectedTrack === index ? 'border-[#f5f5f5]' : 'border-[#730202]'
                }`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-poppins font-semibold text-[#f5f5f5]">{track.name}</h3>
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: track.color }}></div>
                  </div>
                  
                  <p className="text-sm opacity-70 mb-4">{track.user}</p>

                  {/* Waveform Placeholder */}
                  <div className="h-20 bg-[#730202] bg-opacity-20 rounded mb-4 flex items-center justify-center">
                    <div className="flex space-x-1">
                      {[...Array(20)].map((_, i) => (
                        <div key={i} className="w-1 bg-[#730202] rounded" style={{ 
                          height: `${Math.random() * 60 + 10}px` 
                        }}></div>
                      ))}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => updateTrack(track.id, 'muted', !track.muted)}
                        className={`flex-1 py-2 rounded text-sm transition ${
                          track.muted ? 'bg-red-600 text-white' : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                      >
                        {track.muted ? 'Muted' : 'Mute'}
                      </button>
                      <button 
                        onClick={() => updateTrack(track.id, 'solo', !track.solo)}
                        className={`flex-1 py-2 rounded text-sm transition ${
                          track.solo ? 'bg-yellow-600 text-white' : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                      >
                        {track.solo ? 'Solo' : 'Solo'}
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs opacity-70 mb-1">Volume</label>
                      <input 
                        type="range"
                        min="0"
                        max="100"
                        value={track.volume}
                        onChange={(e) => updateTrack(track.id, 'volume', e.target.value)}
                        className="w-full"
                      />
                      <div className="text-xs text-center mt-1">{track.volume}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Track Button */}
            <button className="w-full p-8 bg-black transition">
              <div className="text-center">
                <div className="text-4xl mb-2">+</div>
                <p className="font-poppins">Add New Track</p>
              </div>
            </button>
          </div>

          {/* Bottom Toolbar */}
          <div className="p-4 border-t border-[#730202] bg-black flex justify-between items-center flex-shrink-0">
            <div className="flex items-center space-x-4">
              <span className="text-sm opacity-70">Auto-save enabled</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs">Synced</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-[#730202] hover:bg-[#8B0000] rounded transition">
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicWorkspace;