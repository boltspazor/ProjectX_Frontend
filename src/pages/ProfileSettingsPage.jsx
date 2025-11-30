import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, Camera, Video, Upload, X } from "lucide-react";
import profilePhotoDefault from "../assets/profile-photo.jpg";
import LiveProfilePhoto from "../components/LiveProfilePhoto";
import { getUserProfile, saveUserProfile } from "../utils/userProfile";

export default function ProfileSettingsPage({ onBack }) {
  // Load saved profile or use defaults
  const savedProfile = getUserProfile();
  
  const [formData, setFormData] = useState({
    username: savedProfile?.username || "idkwhoisrahul_04",
    bio: savedProfile?.bio || "Wish I was half as interesting as my bio",
    email: "rahul@example.com",
    phone: "",
    gender: ""
  });
  const [accountType, setAccountType] = useState("private");
  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    messages: true,
    followRequests: true
  });
  
  // Preview states (not saved until "Save Changes" is clicked)
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(
    savedProfile?.profilePhoto || profilePhotoDefault
  );
  const [profileVideoPreview, setProfileVideoPreview] = useState(
    savedProfile?.profileVideo || null
  );
  
  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationToggle = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        // Only update preview, don't save yet
        setProfilePhotoPreview(dataUrl);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("Video file size should be less than 10MB.");
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        // Only update preview, don't save yet
        setProfileVideoPreview(dataUrl);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid video file.");
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const handleRemoveVideo = () => {
    // Only update preview, don't save yet
    setProfileVideoPreview(null);
  };

  const handleSaveChanges = () => {
    // Save all changes at once when "Save Changes" is clicked
    const profileData = {
      profilePhoto: profilePhotoPreview,
      profileVideo: profileVideoPreview,
      username: formData.username,
      bio: formData.bio,
      fullName: "Rahul Chauhan"
    };
    
    saveUserProfile(profileData);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pb-0">
      {/* Header */}
      <div className="border-b border-gray-800 px-4 md:px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </button>
          <h1 className="text-lg md:text-2xl font-semibold">Profile Settings</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Profile Picture */}
            <div>
              <label className="block text-sm font-medium text-orange-500 mb-3">
                Profile Picture
              </label>
              <div className="relative w-32 h-32 mx-auto md:mx-0">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-800">
                  <LiveProfilePhoto
                    imageSrc={profilePhotoPreview}
                    videoSrc={profileVideoPreview}
                    alt="Profile"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <button 
                  onClick={() => photoInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors border-2 border-black cursor-pointer"
                  title="Upload profile photo"
                >
                  <Camera className="h-5 w-5 text-white" />
                </button>
              </div>
              <p className="text-center md:text-left text-sm text-gray-400 mt-2">
                {formData.username}
              </p>
              <p className="text-center md:text-left text-xs text-gray-500">
                Rahul Chauhan
              </p>
              <div className="flex justify-center md:justify-start gap-6 mt-3 text-sm">
                <div className="text-center">
                  <p className="font-bold">21</p>
                  <p className="text-gray-400 text-xs">Posts</p>
                </div>
                <div className="text-center">
                  <p className="font-bold">738</p>
                  <p className="text-gray-400 text-xs">Followers</p>
                </div>
                <div className="text-center">
                  <p className="font-bold">512</p>
                  <p className="text-gray-400 text-xs">Following</p>
                </div>
              </div>
            </div>

            {/* Live Profile Video */}
            <div>
              <label className="block text-sm font-medium text-orange-500 mb-3">
                Live Profile Video
              </label>
              <div className="space-y-3">
                {profileVideoPreview ? (
                  <div className="relative">
                    <div className="w-full max-w-xs mx-auto md:mx-0 rounded-lg overflow-hidden border-2 border-gray-800">
                      <video
                        src={profileVideoPreview}
                        className="w-full h-auto max-h-48 object-cover"
                        controls
                        muted
                      />
                    </div>
                    <button
                      onClick={handleRemoveVideo}
                      className="mt-2 w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Remove Video
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                    <Video className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-sm text-gray-400 mb-3">No live profile video uploaded</p>
                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => videoInputRef.current?.click()}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2 mx-auto"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Video (Max 10MB)
                    </button>
                    <p className="text-xs text-gray-500 mt-2">Video will play on hover</p>
                  </div>
                )}
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-orange-500 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-orange-500 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows="3"
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-orange-500 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-orange-500 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-orange-500 mb-2">
                Gender
              </label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                placeholder="Enter gender"
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Save Changes Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSaveChanges}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
              >
                Save Changes
              </button>
            </div>

            {/* Account Type */}
            <div>
              <label className="block text-sm font-medium text-orange-500 mb-3">
                Account Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="accountType"
                    value="public"
                    checked={accountType === "public"}
                    onChange={(e) => setAccountType(e.target.value)}
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-white">Public</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="accountType"
                    value="private"
                    checked={accountType === "private"}
                    onChange={(e) => setAccountType(e.target.value)}
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-white">Private</span>
                </label>
              </div>
            </div>

            {/* Notifications */}
            <div>
              <label className="block text-sm font-medium text-orange-500 mb-3">
                Notifications
              </label>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3">
                  <span className="text-white">Likes</span>
                  <button
                    onClick={() => handleNotificationToggle("likes")}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications.likes ? "bg-orange-500" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.likes ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3">
                  <span className="text-white">Comments</span>
                  <button
                    onClick={() => handleNotificationToggle("comments")}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications.comments ? "bg-orange-500" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.comments ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3">
                  <span className="text-white">Messages</span>
                  <button
                    onClick={() => handleNotificationToggle("messages")}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications.messages ? "bg-orange-500" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.messages ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3">
                  <span className="text-white">Follow Requests</span>
                  <button
                    onClick={() => handleNotificationToggle("followRequests")}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications.followRequests ? "bg-orange-500" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.followRequests ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}