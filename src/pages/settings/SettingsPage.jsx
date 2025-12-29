import React from 'react';
import { FiSettings, FiUser, FiBell, FiLock, FiEye, FiGlobe } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="page-container">
      <div className="content-wrapper max-w-4xl">
        {/* Header */}
        <div className="card p-6 mb-6">
          <div className="flex items-center space-x-3">
            <FiSettings className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
        </div>

        {/* Account Settings */}
        <div className="card p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <FiUser className="text-primary" />
            <h2 className="text-xl font-bold">Account Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input type="text" className="input" placeholder="Your username" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" className="input" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea className="input" rows={3} placeholder="Tell us about yourself"></textarea>
            </div>
            <button className="btn-primary px-6 py-2">Save Changes</button>
          </div>
        </div>

        {/* Appearance */}
        <div className="card p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <FiEye className="text-primary" />
            <h2 className="text-xl font-bold">Appearance</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose your preferred theme
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className="btn-primary px-6 py-2"
              >
                {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <FiBell className="text-primary" />
            <h2 className="text-xl font-bold">Notifications</h2>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Email notifications', desc: 'Receive email updates' },
              { label: 'Push notifications', desc: 'Receive push notifications' },
              { label: 'SMS notifications', desc: 'Receive SMS alerts' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked={i === 0} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="card p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <FiLock className="text-primary" />
            <h2 className="text-xl font-bold">Privacy & Security</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Private Account</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Only followers can see your posts
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            <div>
              <button className="btn-secondary px-6 py-2 w-full">Change Password</button>
            </div>
            <div>
              <button className="btn-secondary px-6 py-2 w-full">Two-Factor Authentication</button>
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-4">
            <FiGlobe className="text-primary" />
            <h2 className="text-xl font-bold">Language & Region</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select className="input">
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Timezone</label>
              <select className="input">
                <option>Asia/Kolkata (IST)</option>
                <option>America/New_York (EST)</option>
                <option>Europe/London (GMT)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
