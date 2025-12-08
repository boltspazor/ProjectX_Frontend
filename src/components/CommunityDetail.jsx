import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, Globe, Pencil, Heart, Bookmark, X, Settings, Share2, Copy, Check } from "lucide-react";
import ShareModal from "../components/ShareModal";
import Comments from "../components/Comments";
import commentIcon from "../assets/comment.svg";
import messageIcon from "../assets/message.svg";
import { AnimatePresence } from "framer-motion";
import { saveCommunityDraft, getCommunityDrafts, deleteCommunityDraft } from "../utils/drafts";
import LiveProfilePhoto from "../components/LiveProfilePhoto";
import LiveBanner from "../components/LiveBanner";
import { getProfileVideoUrl } from "../utils/profileVideos";
import { getCommunityBannerVideoUrl, getCommunityProfileVideoUrl } from "../utils/communityVideos";
import { useUserProfile } from "../hooks/useUserProfile";
import { communityService } from "../services/communityService";

export default function CommunityDetail({ setActiveView, communityId, onViewUserProfile }) {
  const { username } = useUserProfile();
  const [isJoined, setIsJoined] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [openCommentsPostId, setOpenCommentsPostId] = useState(null);
  const [postsLikes, setPostsLikes] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [error, setError] = useState("");
  
  // Community data state
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch community data
  useEffect(() => {
    const fetchCommunityData = async () => {
      setLoading(true);
      try {
        // Fetch community details
        const communityData = await communityService.getCommunityBySlug(communityId);
        setCommunity(communityData);
        setIsJoined(communityData?.isJoined || false);

        // Fetch community posts
        const postsData = await communityService.getCommunityPosts(communityId);
        setPosts(postsData?.posts || []);

        // Initialize likes state
        if (postsData?.posts) {
          const likes = {};
          postsData.posts.forEach(post => {
            likes[post.id] = {
              liked: post.liked || post.isLiked || false,
              count: post.likesCount || post.likes || 0
            };
          });
          setPostsLikes(likes);
        }
      } catch (err) {
        console.error('Error fetching community data:', err);
        setError('Failed to load community');
      } finally {
        setLoading(false);
      }
    };

    if (communityId) {
      fetchCommunityData();
    }
  }, [communityId, refreshKey]);

  // Check if user is admin/moderator
  const isAdmin = community?.creator === username || community?.creatorId === username;
  const isModerator = community?.moderators?.some(mod => mod.username === username || mod.id === username);
  const canManageSettings = isAdmin || isModerator;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#0b0b0b] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // If community not found, show error or redirect
  if (!community) {
    return (
      <div className="min-h-screen w-full bg-[#0b0b0b] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Community not found</h1>
          <button
            onClick={() => setActiveView("communities", null)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Back to Communities
          </button>
        </div>
      </div>
    );
  }

  const handleJoin = () => {
    // If already joined, leave
    if (isJoined) {
      setIsJoined(false);
      return;
    }

    // Restricted communities cannot be joined from outside
    if (community.type === "Restricted") {
      setError("This community is restricted. Only moderators can add members.");
      setTimeout(() => setError(""), 5000);
      return;
    }

    // Show community code modal first for all communities
    setShowCodeModal(true);
  };

  const handleCodeSubmit = () => {
    const communityCode = community.code || community.id?.toString() || "";
    
    if (codeInput.trim() !== communityCode) {
      setCodeError("Invalid community code. Please try again.");
      return;
    }

    setCodeError("");
    setShowCodeModal(false);
    setCodeInput("");

    // If private community, show password modal after code is correct
    if (community.type === "Private") {
      setShowPasswordModal(true);
    } else {
      // For public communities, join after code verification
      setIsJoined(true);
      // Call API if needed
      try {
        communityService.joinCommunity(community.id);
      } catch (err) {
        console.error("Error joining community:", err);
      }
    }
  };

  const handlePasswordSubmit = () => {
    // In a real app, verify password from API
    // For now, check if password matches (this should come from community data or API)
    const correctPassword = community.password || "";

    if (!passwordInput.trim()) {
      setPasswordError("Please enter a password.");
      return;
    }

    if (passwordInput.trim() !== correctPassword && correctPassword) {
      setPasswordError("Incorrect password. Please try again.");
      return;
    }

    setPasswordError("");
    setShowPasswordModal(false);
    setPasswordInput("");
    setIsJoined(true);

    // Call API if needed
    try {
      communityService.joinCommunity(community.id, { password: passwordInput });
    } catch (err) {
      console.error("Error joining community:", err);
    }
  };

  const handleTopicClick = (topic) => {
    // Handle topic filtering
  };

  const handleLike = (postId) => {
    setPostsLikes(prev => {
      const current = prev[postId] || { liked: false, count: 0 };
      return {
        ...prev,
        [postId]: {
          liked: !current.liked,
          count: current.liked ? current.count - 1 : current.count + 1
        }
      };
    });
  };

  const handleCommentClick = (postId) => {
    setOpenCommentsPostId(postId);
  };

  const handleCloseComments = () => {
    setOpenCommentsPostId(null);
  };

  const handleAddPost = () => {
    setIsCreatePostOpen(true);
  };

  const handlePostCreated = async (postData) => {
    try {
      // For now, just add post optimistically (API endpoint may not exist yet)
      const newPost = {
        id: 'post-' + Date.now(),
        username: username,
        avatar: "https://i.pravatar.cc/100?img=30",
        title: postData.title || "New Post",
        content: postData.content || "",
        category: postData.category || null,
        image: postData.image || null,
        imageUrl: postData.image || null,
        likes: 0,
        likesCount: 0,
        comments: 0,
        commentsCount: 0,
        commentsList: [],
        isLiked: false,
        liked: false,
        createdAt: new Date().toISOString(),
      };

      // Update local state
      setPosts(prev => [newPost, ...prev]);
      setPostsLikes(prev => ({
        ...prev,
        [newPost.id]: {
          liked: false,
          count: 0
        }
      }));

      setIsCreatePostOpen(false);
      // Force re-render by updating refresh key
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fffcfa] dark:bg-[#0b0b0b]">
      {/* Header with Banner */}
      <div className="relative w-full">
        {/* Banner Image */}
        <div className="w-full h-48 sm:h-64 md:h-80 overflow-hidden relative">
          <LiveBanner
            imageSrc={community.banner}
            videoSrc={getCommunityBannerVideoUrl(community.id, community.banner, community)}
            alt={`${community.name} banner`}
            className="w-full h-full"
            maxDuration={10}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 pointer-events-none" />
        </div>

        {/* Header Content */}
        <div className="absolute bottom-0 left-0 right-0 px-3 sm:px-4 md:px-6 lg:px-8 pb-4 sm:pb-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
              {/* Community Icon - Circular */}
              <div className="relative -mb-3 sm:-mb-4 md:-mb-6 flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full border-2 border-white overflow-hidden shadow-xl bg-white">
                  <LiveProfilePhoto
                    imageSrc={community.icon}
                    videoSrc={getCommunityProfileVideoUrl(community.id, community.icon, community)}
                    alt={`${community.name} icon`}
                    className="w-full h-full rounded-full"
                    maxDuration={10}
                  />
                </div>
              </div>

              {/* Community Info */}
              <div className="flex-1 pt-1 sm:pt-2 min-w-0">
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 break-words">
                      {community.name}
                    </h1>
                    <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm md:text-base text-white/90 flex-wrap">
                      <span>{community.followers} Followers</span>
                      <span className="w-1 h-1 rounded-full bg-white/50" />
                      <span>{community.contributors} Contributors</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <button
                      onClick={handleJoin}
                      className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition flex-shrink-0 ${isJoined
                        ? "bg-gray-700 text-white border border-gray-600"
                        : "bg-orange-500 text-white hover:bg-orange-600"
                        }`}
                    >
                      {isJoined ? "Joined" : "Join"}
                    </button>
                    <button
                      onClick={handleAddPost}
                      className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-lg bg-transparent text-white border border-orange-500 text-xs sm:text-sm font-medium hover:bg-orange-500/10 transition flex-shrink-0"
                    >
                      Add Post
                    </button>
                    {canManageSettings && (
                      <button
                        onClick={() => setActiveView("communitySettings", communityId)}
                        className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-lg bg-transparent text-white border border-orange-500 text-xs sm:text-sm font-medium hover:bg-orange-500/10 transition flex items-center gap-1 sm:gap-2 flex-shrink-0"
                      >
                        <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Settings</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => setActiveView("communities", null)}
          className="absolute top-2 sm:top-4 left-2 sm:left-4 p-1.5 sm:p-2 bg-black/50 hover:bg-black/70 dark:bg-black/50 dark:hover:bg-black/70 rounded-full transition backdrop-blur-sm z-10"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Left Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Community Information */}
            <div className="bg-gray-100 dark:bg-[#121212] border border-black dark:border-gray-800 rounded-xl p-3 sm:p-4 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Pencil className="w-4 h-4 text-orange-500" />
                <span>Created {community.createdDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Globe className="w-4 h-4 text-orange-500" />
                <span>{community.type}</span>
              </div>

              {/* Community Description */}
              <div>
                <h3 className="text-black dark:text-white font-semibold mb-2">{community.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {community.description}
                </p>
              </div>

              {/* Rules */}
              <div>
                <h3 className="text-black dark:text-white font-semibold mb-2">Rules</h3>
                <ul className="space-y-1">
                  {community.rules.map((rule, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                      {index + 1}. {rule}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Community Code */}
              <div>
                <h3 className="text-black dark:text-white font-semibold mb-2">Community Code</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  Share this code with others to invite them to join this community
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-3">
                  <div className="flex-1 px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-900 border border-black dark:border-gray-700 rounded-lg min-w-0">
                    <p className="text-xs sm:text-sm font-mono text-black dark:text-white break-all">
                      {community.code || community.id?.toString() || "N/A"}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const code = community.code || community.id?.toString() || "";
                      navigator.clipboard.writeText(code);
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 2000);
                    }}
                    className="px-3 sm:px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center justify-center gap-2 text-xs sm:text-sm whitespace-nowrap"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <button
                  onClick={() => {
                    const communityLink = `${window.location.origin}/community/${community.id}`;
                    navigator.clipboard.writeText(communityLink);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                  }}
                  className="w-full px-3 sm:px-4 py-2 bg-transparent border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500/10 transition flex items-center justify-center gap-2 text-xs sm:text-sm"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                      Link Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Share Community Link</span>
                      <span className="sm:hidden">Share Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Search By Topic */}
            <div className="bg-gray-100 dark:bg-[#121212] border border-black dark:border-gray-800 rounded-xl p-3 sm:p-4">
              <h3 className="text-black dark:text-white font-semibold mb-3">Search By Topic</h3>
              <div className="flex flex-wrap gap-2">
                {community.topics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => handleTopicClick(topic)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${index < 3
                      ? "bg-orange-500 text-white"
                      : "bg-orange-500 text-white"
                      }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Moderators */}
            <div className="bg-gray-100 dark:bg-[#121212] border border-black dark:border-gray-800 rounded-xl p-3 sm:p-4">
              <h3 className="text-black dark:text-white font-semibold mb-3">Moderators</h3>
              <div className="space-y-3">
                {community.moderators.map((mod) => (
                  <div key={mod.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <LiveProfilePhoto
                        imageSrc={mod.avatar}
                        videoSrc={getProfileVideoUrl(mod.avatar, mod.username)}
                        alt={mod.username}
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                    <button
                      onClick={() => onViewUserProfile && onViewUserProfile(mod.username)}
                      className="text-sm text-gray-700 dark:text-gray-300 hover:opacity-70 transition-opacity cursor-pointer"
                    >
                      {mod.username}...
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content - Posts */}
          <main className="lg:col-span-2 space-y-4 sm:space-y-6">
            {posts.map((post) => {
              const postLikeData = postsLikes[post.id] || { liked: false, count: post.likes || 0 };
              return (
                <div
                  key={post.id}
                  className="bg-gray-100 dark:bg-[#121212] border border-black dark:border-gray-800 rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4"
                >
                  {/* Post Header */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0">
                        <LiveProfilePhoto
                          imageSrc={post.avatar}
                          videoSrc={getProfileVideoUrl(post.avatar, post.username)}
                          alt={post.username}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                        />
                      </div>
                      <button
                        onClick={() => onViewUserProfile && onViewUserProfile(post.username)}
                        className="text-sm sm:text-base text-black dark:text-white font-medium hover:opacity-70 transition-opacity cursor-pointer truncate"
                      >
                        {post.username}
                      </button>
                    </div>
                    {/* Category Badge (Reddit-style) */}
                    {post.category && (
                      <span className="px-2 sm:px-3 py-1 text-xs font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full flex-shrink-0">
                        {post.category}
                      </span>
                    )}
                  </div>

                  {/* Post Title */}
                  {post.title && (
                    <h3 className="text-black dark:text-white font-bold text-base sm:text-lg">{post.title}</h3>
                  )}

                  {/* Post Content */}
                  {post.content && (
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">{post.content}</p>
                  )}

                  {/* Post Image (if exists) - 4:3 aspect ratio */}
                  {post.image && (
                    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-black">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Interaction Icons */}
                  <div className="flex items-center gap-3 sm:gap-4 pt-2 border-t border-black dark:border-gray-800">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1.5 sm:gap-2 focus:outline-none group"
                    >
                      <Heart
                        className={`w-4 h-4 sm:w-5 sm:h-5 transition-all ${postLikeData.liked
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-white"
                          }`}
                      />
                      <span
                        className={`text-xs sm:text-sm ${postLikeData.liked
                          ? "text-red-500 font-semibold"
                          : "text-gray-600 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-white"
                          }`}
                      >
                        {postLikeData.count}
                      </span>
                    </button>
                    <button
                      onClick={() => handleCommentClick(post.id)}
                      className="flex items-center gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
                    >
                      <img src={commentIcon} alt="comment" className="w-4 h-4 sm:w-5 sm:h-5 opacity-70 dark:opacity-100 brightness-0 dark:brightness-100" />
                      <span className="text-xs sm:text-sm">{post.comments || 0}</span>
                    </button>
                    <button
                      onClick={() => setIsShareModalOpen(true)}
                      className="flex items-center gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
                    >
                      <img src={messageIcon} alt="share" className="w-4 h-4 sm:w-5 sm:h-5 opacity-70 dark:opacity-100 brightness-0 dark:brightness-100" />
                    </button>
                  </div>
                </div>
              );
            })}
          </main>
        </div>
      </div>

      {/* Comments Section - Overlay for both mobile and desktop */}
      <Comments
        isOpen={openCommentsPostId !== null}
        onClose={handleCloseComments}
        variant="overlay"
        initialComments={
          openCommentsPostId !== null
            ? posts.find(p => p.id === openCommentsPostId)?.commentsList || []
            : []
        }
        onViewUserProfile={onViewUserProfile}
      />

      {/* Share Modal */}
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} onViewUserProfile={onViewUserProfile} />

      {/* Community Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#121212] rounded-xl p-6 max-w-md w-full border border-black dark:border-gray-800">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-2">Enter Community Code</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Please enter the community code to join this community.
            </p>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={codeInput}
                  onChange={(e) => {
                    setCodeInput(e.target.value);
                    setCodeError("");
                  }}
                  placeholder="Enter community code"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-900 border border-black dark:border-gray-700 rounded-lg text-black dark:text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleCodeSubmit();
                    }
                  }}
                />
                {codeError && (
                  <p className="text-sm text-red-500 mt-2">{codeError}</p>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCodeModal(false);
                    setCodeInput("");
                    setCodeError("");
                  }}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCodeSubmit}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#121212] rounded-xl p-6 max-w-md w-full border border-black dark:border-gray-800">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-2">Enter Password</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              This is a private community. Please enter the password to join.
            </p>
            <div className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError("");
                  }}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-900 border border-black dark:border-gray-700 rounded-lg text-black dark:text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handlePasswordSubmit();
                    }
                  }}
                />
                {passwordError && (
                  <p className="text-sm text-red-500 mt-2">{passwordError}</p>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordInput("");
                    setPasswordError("");
                  }}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordSubmit}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      <CreateCommunityPost
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onPostCreated={handlePostCreated}
        community={community}
      />
    </div>
  );
}

// Wrapper component for CreatePost to handle community posts
function CreateCommunityPost({ isOpen, onClose, onPostCreated, community }) {
  const [step, setStep] = useState("upload");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentDraftId, setCurrentDraftId] = useState(null);
  const [showDrafts, setShowDrafts] = useState(false);
  const fileInputRef = useRef(null);

  // Available categories (can use community topics or general categories)
  const categories = community?.topics || [
    "Discussion",
    "Question",
    "Showcase",
    "Tutorial",
    "News",
    "Announcement",
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setStep("caption");
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (onPostCreated && title.trim()) {
      onPostCreated({
        title: title.trim(),
        content: content.trim(),
        category: selectedCategory,
        image: imagePreview,
      });

      // Delete draft if it was a saved draft
      if (currentDraftId && community?.id) {
        deleteCommunityDraft(community.id, currentDraftId);
      }
    }
    handleClose();
  };

  const handleSaveDraft = () => {
    if (!community?.id) return;

    const existingDrafts = getCommunityDrafts(community.id);

    // Check if we're at the limit and this is a new draft (not updating existing)
    if (!currentDraftId && existingDrafts.length >= 5) {
      // This will be handled by saveCommunityDraft (removes oldest), but show a message
      const confirmSave = window.confirm(
        "You've reached the limit of 5 drafts for this community. The oldest draft will be removed to save this new one. Continue?"
      );
      if (!confirmSave) return;
    }

    const draftData = {
      id: currentDraftId || undefined,
      title: title.trim(),
      content: content.trim(),
      category: selectedCategory,
      imagePreview, // Store as base64
      step,
      createdAt: currentDraftId ? undefined : new Date().toISOString(),
    };

    const savedDraft = saveCommunityDraft(community.id, draftData);
    if (savedDraft) {
      setCurrentDraftId(savedDraft.id);
      const message = currentDraftId ? "Draft updated!" : "Draft saved!";
      alert(message);
      // Refresh drafts list
      setDrafts(getCommunityDrafts(community.id));
    }
  };

  const handleLoadDraft = (draft) => {
    setCurrentDraftId(draft.id);
    setTitle(draft.title || "");
    setContent(draft.content || "");
    setSelectedCategory(draft.category || null);
    setImagePreview(draft.imagePreview || null);
    setStep(draft.step || "upload");
    setShowDrafts(false);
  };

  const handleClose = () => {
    setStep("upload");
    setTitle("");
    setContent("");
    setSelectedCategory(null);
    setImagePreview(null);
    setCurrentDraftId(null);
    setShowDrafts(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  // Get drafts for this community - make it reactive
  const [drafts, setDrafts] = useState(community?.id ? getCommunityDrafts(community.id) : []);

  useEffect(() => {
    if (community?.id) {
      setDrafts(getCommunityDrafts(community.id));
    }
  }, [showDrafts, currentDraftId, community?.id]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="relative z-[101] w-full max-w-2xl bg-[#0f0f0f] rounded-xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Create Post</h2>
          <div className="flex items-center gap-2">
            {/* Drafts Button */}
            <button
              onClick={() => setShowDrafts(!showDrafts)}
              className="p-2 hover:bg-gray-800 rounded-full transition relative"
              title="Drafts"
            >
              <Bookmark className="w-5 h-5 text-gray-400 hover:text-orange-500" />
              {drafts.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full"></span>
              )}
            </button>

            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition p-2 hover:bg-gray-800 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Drafts List */}
        <AnimatePresence>
          {showDrafts && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-b border-gray-800 bg-[#1a1a1a]"
            >
              <div className="p-4 space-y-2 max-h-48 overflow-y-auto">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-300">Saved Drafts</h3>
                  <span className="text-xs text-gray-500">{drafts.length}/5</span>
                </div>
                {drafts.length > 0 ? (
                  drafts.map((draft) => (
                    <div key={draft.id} className="flex items-start gap-2">
                      <button
                        onClick={() => handleLoadDraft(draft)}
                        className="flex-1 text-left p-3 rounded-lg bg-[#0f0f0f] hover:bg-[#121212] border border-gray-800 hover:border-orange-500/50 transition"
                      >
                        <div className="flex items-start gap-3">
                          {draft.imagePreview && (
                            <img
                              src={draft.imagePreview}
                              alt="Draft"
                              className="w-12 h-12 rounded object-cover flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{draft.title || "No title"}</p>
                            <p className="text-xs text-gray-400 truncate mt-1">{draft.content || "No content"}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(draft.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm("Delete this draft?")) {
                            if (community?.id) {
                              deleteCommunityDraft(community.id, draft.id);
                              const remainingDrafts = getCommunityDrafts(community.id);
                              setDrafts(remainingDrafts);
                              if (remainingDrafts.length === 0) {
                                setShowDrafts(false);
                              }
                            }
                            if (currentDraftId === draft.id) {
                              setCurrentDraftId(null);
                            }
                          }
                        }}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition text-gray-400 hover:text-red-500"
                        title="Delete draft"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 text-center py-4">No saved drafts</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === "upload" && (
            <div className="space-y-4">
              <label className="block">
                <span className="text-white font-medium mb-2 block">Upload Image (Optional)</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-12 border-2 border-dashed border-gray-700 rounded-lg hover:border-orange-500 transition text-gray-400 hover:text-white"
                >
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Click to upload an image</span>
                  </div>
                </button>
              </label>

              {imagePreview && (
                <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-black">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("caption")}
                  className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition"
                >
                  {imagePreview ? "Continue to Post Details" : "Skip Image & Continue"}
                </button>
              </div>
            </div>
          )}

          {step === "caption" && (
            <div className="space-y-4">
              {imagePreview && (
                <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-black">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div>
                <label className="block text-white font-medium mb-2">Post Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title..."
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Post Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind? (Optional)"
                  className="w-full min-h-[150px] px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-3">Category (Optional)</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(
                        selectedCategory === category ? null : category
                      )}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${selectedCategory === category
                        ? "bg-orange-500 text-white"
                        : "bg-[#1a1a1a] text-gray-300 border border-gray-700 hover:border-orange-500/50"
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("upload")}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePost}
                    disabled={!title.trim()}
                    className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition"
                  >
                    Post
                  </button>
                </div>

                {/* Save Draft Button */}
                {(title.trim() || imagePreview) && (
                  <button
                    onClick={handleSaveDraft}
                    className="w-full flex items-center justify-center gap-2 border-2 border-gray-700 hover:border-orange-500 text-gray-300 hover:text-orange-500 font-medium py-3 px-6 rounded-lg transition"
                  >
                    <Bookmark className="w-4 h-4" />
                    {currentDraftId ? "Update Draft" : "Save as Draft"}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}