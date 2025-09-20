import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Eye, EyeOff, Bell, Shield, User, Music, Globe } from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  // Profile settings state
  const [profileData, setProfileData] = useState<{
    name: string;
    username: string;
    email: string;
    bio: string;
    location: string;
    website: string;
    avatar: string;
  }>({
    name: 'John Doe',
    username: 'johndoe_music',
    email: 'john@example.com',
    bio: 'Passionate composer and producer exploring the intersection of classical and electronic music.',
    location: 'Los Angeles, CA',
    website: 'www.johndobemusic.com',
    avatar: '🎵'
  });

  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState<{
    profileVisibility: string;
    showEmail: boolean;
    showLocation: boolean;
    allowMessages: boolean;
    showOnlineStatus: boolean;
  }>({
    profileVisibility: 'public',
    showEmail: false,
    showLocation: true,
    allowMessages: true,
    showOnlineStatus: true
  });

  // Notification settings state
  const [notifications, setNotifications] = useState<{
    collaborationRequests: boolean;
    projectUpdates: boolean;
    comments: boolean;
    likes: boolean;
    emailNotifications: boolean;
    pushNotifications: boolean;
  }>({
    collaborationRequests: true,
    projectUpdates: true,
    comments: true,
    likes: false,
    emailNotifications: true,
    pushNotifications: true
  });

  // Account settings state
  const [accountData, setAccountData] = useState<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });


  const handleProfileUpdate = (field: string, value: string): void => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePrivacyUpdate = (field: string, value: boolean | string): void => {
    setPrivacySettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationUpdate = (field: string, value: boolean): void => {
    setNotifications(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAccountUpdate = (field: string, value: string): void => {
    setAccountData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveSettings = (): void => {
    // Here you would save to your backend
    navigate('/profile');
  };

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full transition-colors ${
        checked ? 'bg-[#730202]' : 'bg-gray-600'
      }`}
    >
      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-0.5'
      }`} />
    </button>
  );

  const ProfileSettings = () => (
    <div className="space-y-8">
      <div className="bg-[#000] border-2 border-[#730202] rounded-xl p-8">
        <h2 className="text-2xl font-forum text-[#f5f5f5] mb-6">Profile Information</h2>
        
        <div className="space-y-6">
          {/* Avatar Selection */}
          <div>
            <label className="block text-[#f5f5f5] font-poppins text-lg mb-3">Profile Avatar</label>
            <div className="flex space-x-4">
              {['🎵', '🎸', '🎹', '🥁', '🎤', '🎺', '🎻', '🎷'].map(emoji => (
                <button
                  key={emoji}
                  onClick={() => handleProfileUpdate('avatar', emoji)}
                  className={`w-16 h-16 rounded-full text-2xl transition-all ${
                    profileData.avatar === emoji
                      ? 'bg-[#730202] ring-2 ring-[#f5f5f5]'
                      : 'bg-gray-600 hover:bg-[#730202]'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#f5f5f5] font-poppins text-lg mb-3">Full Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => handleProfileUpdate('name', e.target.value)}
                className="w-full p-4 bg-black border-2 border-[#730202] text-[#f5f5f5] rounded-lg focus:border-[#f5f5f5] outline-none font-poppins"
              />
            </div>

            <div>
              <label className="block text-[#f5f5f5] font-poppins text-lg mb-3">Username</label>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) => handleProfileUpdate('username', e.target.value)}
                className="w-full p-4 bg-black border-2 border-[#730202] text-[#f5f5f5] rounded-lg focus:border-[#f5f5f5] outline-none font-poppins"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#f5f5f5] font-poppins text-lg mb-3">Bio</label>
            <textarea
              value={profileData.bio}
              onChange={(e) => handleProfileUpdate('bio', e.target.value)}
              rows={4}
              className="w-full p-4 bg-black border-2 border-[#730202] text-[#f5f5f5] rounded-lg focus:border-[#f5f5f5] outline-none font-poppins resize-vertical"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#f5f5f5] font-poppins text-lg mb-3">Location</label>
              <input
                type="text"
                value={profileData.location}
                onChange={(e) => handleProfileUpdate('location', e.target.value)}
                className="w-full p-4 bg-black border-2 border-[#730202] text-[#f5f5f5] rounded-lg focus:border-[#f5f5f5] outline-none font-poppins"
              />
            </div>

            <div>
              <label className="block text-[#f5f5f5] font-poppins text-lg mb-3">Website</label>
              <input
                type="url"
                value={profileData.website}
                onChange={(e) => handleProfileUpdate('website', e.target.value)}
                className="w-full p-4 bg-black border-2 border-[#730202] text-[#f5f5f5] rounded-lg focus:border-[#f5f5f5] outline-none font-poppins"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PrivacySettings = () => (
    <div className="space-y-8">
      <div className="bg-[#000] border-2 border-[#730202] rounded-xl p-8">
        <h2 className="text-2xl font-forum text-[#f5f5f5] mb-6">Privacy Settings</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-[#f5f5f5] font-poppins text-lg mb-3">Profile Visibility</label>
            <select
              value={privacySettings.profileVisibility}
              onChange={(e) => handlePrivacyUpdate('profileVisibility', e.target.value)}
              className="w-full p-4 bg-black border-2 border-[#730202] text-[#f5f5f5] rounded-lg focus:border-[#f5f5f5] outline-none font-poppins"
            >
              <option value="public">Public - Anyone can view</option>
              <option value="community">Community - Only ORPHEUS users</option>
              <option value="private">Private - Only collaborators</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#730202] bg-opacity-20 rounded-lg">
              <div>
                <h3 className="text-[#f5f5f5] font-poppins font-semibold">Show Email</h3>
                <p className="text-[#f5f5f5] opacity-70 text-sm">Display your email on your profile</p>
              </div>
              <Toggle 
                checked={privacySettings.showEmail}
                onChange={(value) => handlePrivacyUpdate('showEmail', value)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-[#730202] bg-opacity-20 rounded-lg">
              <div>
                <h3 className="text-[#f5f5f5] font-poppins font-semibold">Show Location</h3>
                <p className="text-[#f5f5f5] opacity-70 text-sm">Display your location on your profile</p>
              </div>
              <Toggle 
                checked={privacySettings.showLocation}
                onChange={(value) => handlePrivacyUpdate('showLocation', value)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-[#730202] bg-opacity-20 rounded-lg">
              <div>
                <h3 className="text-[#f5f5f5] font-poppins font-semibold">Allow Messages</h3>
                <p className="text-[#f5f5f5] opacity-70 text-sm">Let other users send you direct messages</p>
              </div>
              <Toggle 
                checked={privacySettings.allowMessages}
                onChange={(value) => handlePrivacyUpdate('allowMessages', value)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-[#730202] bg-opacity-20 rounded-lg">
              <div>
                <h3 className="text-[#f5f5f5] font-poppins font-semibold">Show Online Status</h3>
                <p className="text-[#f5f5f5] opacity-70 text-sm">Show when you're online to other users</p>
              </div>
              <Toggle 
                checked={privacySettings.showOnlineStatus}
                onChange={(value) => handlePrivacyUpdate('showOnlineStatus', value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-8">
      <div className="bg-[#000] border-2 border-[#730202] rounded-xl p-8">
        <h2 className="text-2xl font-forum text-[#f5f5f5] mb-6">Notification Preferences</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#730202] bg-opacity-20 rounded-lg">
            <div>
              <h3 className="text-[#f5f5f5] font-poppins font-semibold">Collaboration Requests</h3>
              <p className="text-[#f5f5f5] opacity-70 text-sm">When someone wants to collaborate with you</p>
            </div>
            <Toggle 
              checked={notifications.collaborationRequests}
              onChange={(value) => handleNotificationUpdate('collaborationRequests', value)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-[#730202] bg-opacity-20 rounded-lg">
            <div>
              <h3 className="text-[#f5f5f5] font-poppins font-semibold">Project Updates</h3>
              <p className="text-[#f5f5f5] opacity-70 text-sm">Updates on projects you're collaborating on</p>
            </div>
            <Toggle 
              checked={notifications.projectUpdates}
              onChange={(value) => handleNotificationUpdate('projectUpdates', value)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-[#730202] bg-opacity-20 rounded-lg">
            <div>
              <h3 className="text-[#f5f5f5] font-poppins font-semibold">Comments</h3>
              <p className="text-[#f5f5f5] opacity-70 text-sm">When someone comments on your posts or projects</p>
            </div>
            <Toggle 
              checked={notifications.comments}
              onChange={(value) => handleNotificationUpdate('comments', value)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-[#730202] bg-opacity-20 rounded-lg">
            <div>
              <h3 className="text-[#f5f5f5] font-poppins font-semibold">Likes</h3>
              <p className="text-[#f5f5f5] opacity-70 text-sm">When someone likes your posts</p>
            </div>
            <Toggle 
              checked={notifications.likes}
              onChange={(value) => handleNotificationUpdate('likes', value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-[#000] border-2 border-[#730202] rounded-xl p-8">
        <h2 className="text-2xl font-forum text-[#f5f5f5] mb-6">Delivery Methods</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#730202] bg-opacity-20 rounded-lg">
            <div>
              <h3 className="text-[#f5f5f5] font-poppins font-semibold">Email Notifications</h3>
              <p className="text-[#f5f5f5] opacity-70 text-sm">Receive notifications via email</p>
            </div>
            <Toggle 
              checked={notifications.emailNotifications}
              onChange={(value) => handleNotificationUpdate('emailNotifications', value)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-[#730202] bg-opacity-20 rounded-lg">
            <div>
              <h3 className="text-[#f5f5f5] font-poppins font-semibold">Push Notifications</h3>
              <p className="text-[#f5f5f5] opacity-70 text-sm">Receive push notifications in your browser</p>
            </div>
            <Toggle 
              checked={notifications.pushNotifications}
              onChange={(value) => handleNotificationUpdate('pushNotifications', value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const AccountSettings = () => (
    <div className="space-y-8">
      <div className="bg-[#000] border-2 border-[#730202] rounded-xl p-8">
        <h2 className="text-2xl font-forum text-[#f5f5f5] mb-6">Account Information</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-[#f5f5f5] font-poppins text-lg mb-3">Email Address</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => handleProfileUpdate('email', e.target.value)}
              className="w-full p-4 bg-black border-2 border-[#730202] text-[#f5f5f5] rounded-lg focus:border-[#f5f5f5] outline-none font-poppins"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#000] border-2 border-[#730202] rounded-xl p-8">
        <h2 className="text-2xl font-forum text-[#f5f5f5] mb-6">Change Password</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-[#f5f5f5] font-poppins text-lg mb-3">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={accountData.currentPassword}
                onChange={(e) => handleAccountUpdate('currentPassword', e.target.value)}
                className="w-full p-4 bg-black border-2 border-[#730202] text-[#f5f5f5] rounded-lg focus:border-[#f5f5f5] outline-none font-poppins pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#f5f5f5] opacity-70 hover:opacity-100"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[#f5f5f5] font-poppins text-lg mb-3">New Password</label>
            <input
              type="password"
              value={accountData.newPassword}
              onChange={(e) => handleAccountUpdate('newPassword', e.target.value)}
              className="w-full p-4 bg-black border-2 border-[#730202] text-[#f5f5f5] rounded-lg focus:border-[#f5f5f5] outline-none font-poppins"
            />
          </div>

          <div>
            <label className="block text-[#f5f5f5] font-poppins text-lg mb-3">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={accountData.confirmPassword}
                onChange={(e) => handleAccountUpdate('confirmPassword', e.target.value)}
                className="w-full p-4 bg-black border-2 border-[#730202] text-[#f5f5f5] rounded-lg focus:border-[#f5f5f5] outline-none font-poppins pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#f5f5f5] opacity-70 hover:opacity-100"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#000] border-2 border-red-600 rounded-xl p-8">
        <h2 className="text-2xl font-forum text-red-400 mb-6">Danger Zone</h2>
        
        <div className="space-y-4">
          <button className="w-full p-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-poppins">
            Delete Account
          </button>
          <p className="text-[#f5f5f5] opacity-70 text-sm text-center">
            This action cannot be undone. All your projects and data will be permanently deleted.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Single Navbar with Arrow */}
      <nav className="bg-[#730202] text-[#f5f5f5] flex justify-between px-8 py-4">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="hover:text-[#000] transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-xl font-forum">ORPHEUS</span>
        </div>
        <div className="flex items-center space-x-6 font-poppins">
          <button onClick={() => navigate('/dashboard')} className="hover:text-[#000] transition">Dashboard</button>
          <button onClick={() => navigate('/community')} className="hover:text-[#000] transition">Community</button>
        </div>
      </nav>

      <div className="px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-forum text-[#f5f5f5] mb-4">Settings</h1>
          <p className="text-xl text-[#f5f5f5] font-poppins">Manage your account and preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-[#000] border-2 border-[#730202] rounded-xl p-6">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
                    activeTab === 'profile'
                      ? 'bg-[#730202] text-[#f5f5f5]'
                      : 'text-[#f5f5f5] hover:bg-[#730202] hover:bg-opacity-20'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-poppins">Profile</span>
                </button>

                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
                    activeTab === 'privacy'
                      ? 'bg-[#730202] text-[#f5f5f5]'
                      : 'text-[#f5f5f5] hover:bg-[#730202] hover:bg-opacity-20'
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  <span className="font-poppins">Privacy</span>
                </button>

                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
                    activeTab === 'notifications'
                      ? 'bg-[#730202] text-[#f5f5f5]'
                      : 'text-[#f5f5f5] hover:bg-[#730202] hover:bg-opacity-20'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  <span className="font-poppins">Notifications</span>
                </button>

                <button
                  onClick={() => setActiveTab('account')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
                    activeTab === 'account'
                      ? 'bg-[#730202] text-[#f5f5f5]'
                      : 'text-[#f5f5f5] hover:bg-[#730202] hover:bg-opacity-20'
                  }`}
                >
                  <Globe className="w-5 h-5" />
                  <span className="font-poppins">Account</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'profile' && <ProfileSettings />}
            {activeTab === 'privacy' && <PrivacySettings />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'account' && <AccountSettings />}

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={saveSettings}
                className="flex items-center space-x-2 px-8 py-4 bg-[#730202] hover:bg-[#8B0000] text-[#f5f5f5] rounded-lg transition font-poppins"
              >
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;