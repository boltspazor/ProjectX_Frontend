import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, Bookmark } from "lucide-react";
import { saveDraft, getDrafts, loadDraft, deleteDraft } from "../utils/drafts";

export default function CreatePost({ setActiveView, isOpen, onClose }) {
  const [step, setStep] = useState("upload"); // "upload", "caption", "preview"
  const [prompt, setPrompt] = useState("");
  const [caption, setCaption] = useState("");
  const [previewCaption, setPreviewCaption] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentDraftId, setCurrentDraftId] = useState(null); // Track if editing a draft
  const [showDrafts, setShowDrafts] = useState(false);
  const fileInputRef = useRef(null);

  // Mock recent images - replace with actual data
  const recentImages = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    url: `https://i.pravatar.cc/150?img=${i + 1}`,
  }));

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setUploadedImage(file);
        setStep("caption");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    if (step === "upload" && prompt && !imagePreview) {
      // If prompt entered but no image, this would generate an image
      // For now, we'll just show a message or skip to caption
      // In real implementation, this would call an API to generate image
      console.log("Generating image from prompt:", prompt);
      // Simulate: after generation, image would be set and we go to caption
    } else if (step === "caption") {
      // Generate caption from image
      if (caption) {
        // If user already entered caption, use it
        setPreviewCaption(caption);
      } else {
        // Generate caption automatically
        setPreviewCaption("An evening walk with nowhere to go ...");
        setCaption("An evening walk with nowhere to go ...");
      }
      setStep("preview");
    }
  };

  const handlePost = () => {
    // Handle post submission
    console.log("Posting:", { image: uploadedImage, caption: previewCaption });
    
    // Delete draft if it was a saved draft
    if (currentDraftId) {
      deleteDraft(currentDraftId);
    }
    
    // Reset and close
    handleClose();
  };

  const handleSaveDraft = () => {
    const existingDrafts = getDrafts();
    
    // Check if we're at the limit and this is a new draft (not updating existing)
    if (!currentDraftId && existingDrafts.length >= 5) {
      // This will be handled by saveDraft (removes oldest), but show a message
      const confirmSave = window.confirm(
        "You've reached the limit of 5 drafts. The oldest draft will be removed to save this new one. Continue?"
      );
      if (!confirmSave) return;
    }
    
    const draftData = {
      id: currentDraftId || undefined, // Use existing ID if editing
      prompt,
      caption: caption || previewCaption,
      imagePreview, // Store as base64
      step, // Save current step
      createdAt: currentDraftId ? undefined : new Date().toISOString(), // Only set on first save
    };
    
    const savedDraft = saveDraft(draftData);
    if (savedDraft) {
      setCurrentDraftId(savedDraft.id);
      // Show success message or indicator
      const message = currentDraftId ? "Draft updated!" : "Draft saved!";
      alert(message);
      // Refresh drafts if shown
      if (showDrafts) {
        setShowDrafts(true);
      }
    }
  };

  const handleLoadDraft = (draft) => {
    setCurrentDraftId(draft.id);
    setPrompt(draft.prompt || "");
    setCaption(draft.caption || "");
    setPreviewCaption(draft.caption || "");
    setImagePreview(draft.imagePreview || null);
    setStep(draft.step || "upload");
    setShowDrafts(false);
  };

  const handleRegenerate = () => {
    setCaption("");
    setPreviewCaption("");
    setStep("caption");
  };

  const handleClose = () => {
    setStep("upload");
    setPrompt("");
    setCaption("");
    setPreviewCaption("");
    setUploadedImage(null);
    setImagePreview(null);
    setCurrentDraftId(null);
    setShowDrafts(false);
    if (onClose) {
      onClose();
    } else {
      setActiveView("home");
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen !== undefined && isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  // If used as modal (isOpen prop), render as overlay
  if (isOpen !== undefined) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] md:z-[90]"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 md:inset-4 z-[101] md:z-[91] flex items-center justify-center md:p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-full md:w-full md:max-w-2xl md:h-auto md:max-h-[90vh] bg-[#0f0f0f] md:rounded-xl overflow-hidden flex flex-col shadow-2xl">
                <CreatePostContent
                  step={step}
                  prompt={prompt}
                  setPrompt={setPrompt}
                  caption={caption}
                  setCaption={setCaption}
                  previewCaption={previewCaption}
                  imagePreview={imagePreview}
                  uploadedImage={uploadedImage}
                  recentImages={recentImages}
                  fileInputRef={fileInputRef}
                  handleImageUpload={handleImageUpload}
                  handleGenerate={handleGenerate}
                  handlePost={handlePost}
                  handleRegenerate={handleRegenerate}
                  handleClose={handleClose}
                  handleSaveDraft={handleSaveDraft}
                  handleLoadDraft={handleLoadDraft}
                  showDrafts={showDrafts}
                  setShowDrafts={setShowDrafts}
                  currentDraftId={currentDraftId}
                  setStep={setStep}
                  setImagePreview={setImagePreview}
                  setUploadedImage={setUploadedImage}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // If used as full page (legacy behavior)
  return (
    <div className="w-full min-h-screen bg-[#0f0f0f] text-white">
      <div className="max-w-2xl mx-auto h-full min-h-screen flex flex-col">
        <CreatePostContent
          step={step}
          prompt={prompt}
          setPrompt={setPrompt}
          caption={caption}
          setCaption={setCaption}
          previewCaption={previewCaption}
          imagePreview={imagePreview}
          uploadedImage={uploadedImage}
          recentImages={recentImages}
          fileInputRef={fileInputRef}
          handleImageUpload={handleImageUpload}
          handleGenerate={handleGenerate}
          handlePost={handlePost}
          handleRegenerate={handleRegenerate}
          handleClose={handleClose}
          handleSaveDraft={handleSaveDraft}
          handleLoadDraft={handleLoadDraft}
          showDrafts={showDrafts}
          setShowDrafts={setShowDrafts}
          currentDraftId={currentDraftId}
          setStep={setStep}
          setImagePreview={setImagePreview}
          setUploadedImage={setUploadedImage}
          isFullPage={true}
        />
      </div>
    </div>
  );
}

function CreatePostContent({
  step,
  prompt,
  setPrompt,
  caption,
  setCaption,
  previewCaption,
  imagePreview,
  uploadedImage,
  recentImages,
  fileInputRef,
  handleImageUpload,
  handleGenerate,
  handlePost,
  handleRegenerate,
  handleClose,
  handleSaveDraft,
  handleLoadDraft,
  showDrafts,
  setShowDrafts,
  currentDraftId,
  setStep,
  setImagePreview,
  setUploadedImage,
  isFullPage = false,
}) {
  const [drafts, setDrafts] = useState(getDrafts());
  
  // Refresh drafts list when needed
  useEffect(() => {
    setDrafts(getDrafts());
  }, [showDrafts, currentDraftId]);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-800 rounded-full transition"
          >
            {isFullPage ? (
              <ArrowLeft className="w-5 h-5 text-white" />
            ) : (
              <X className="w-5 h-5 text-white" />
            )}
          </button>
          <h2 className="text-lg md:text-xl font-semibold text-white">
            Create a Post
          </h2>
        </div>
        
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
                          <p className="text-sm text-white truncate">{draft.caption || "No caption"}</p>
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
                          deleteDraft(draft.id);
                          if (currentDraftId === draft.id) {
                            setCurrentDraftId(null);
                          }
                          const remainingDrafts = getDrafts();
                          setDrafts(remainingDrafts);
                          if (remainingDrafts.length === 0) {
                            setShowDrafts(false);
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
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Upload */}
          {step === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Prompt Input */}
              <div>
                <input
                  type="text"
                  placeholder="Enter your prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-sm md:text-base focus:outline-none focus:border-orange-500 placeholder-gray-400 text-white"
                />
              </div>

              {/* Generate Button - Only show if prompt is entered */}
              {prompt && (
                <button
                  onClick={handleGenerate}
                  className="w-full relative rounded-lg p-[1.5px] bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:opacity-90 transition"
                >
                  <span className="block w-full bg-[#0f0f0f] rounded-lg py-3 text-sm md:text-base font-medium text-white">
                    Generate for 100 Credits
                  </span>
                </button>
              )}

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-800"></div>
                <span className="text-gray-400 text-xs uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-gray-800"></div>
              </div>

              {/* Upload Image */}
              <div>
                <label
                  onClick={() => fileInputRef.current?.click()}
                  className="block w-full border-2 border-dashed border-orange-500 rounded-lg p-8 md:p-12 text-center cursor-pointer hover:border-orange-400 transition group"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition">
                      <svg
                        className="w-6 h-6 md:w-8 md:h-8 text-orange-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm md:text-base font-medium">
                      Upload Image
                    </span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Recents Section */}
              {recentImages.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-gray-300 mb-4">Recents</h3>
                  <div className="grid grid-cols-4 gap-2 md:gap-3">
                    {recentImages.map((img) => (
                      <motion.div
                        key={img.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setImagePreview(img.url);
                          setUploadedImage({ name: `recent-${img.id}.jpg` });
                          setStep("caption");
                        }}
                        className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition border-2 border-transparent hover:border-orange-500"
                      >
                        <img
                          src={img.url}
                          alt={`Recent ${img.id}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 2: Caption */}
          {step === "caption" && imagePreview && (
            <motion.div
              key="caption"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Image Preview */}
              <div className="w-full rounded-lg overflow-hidden border border-gray-800">
                <img
                  src={imagePreview}
                  alt="Upload preview"
                  className="w-full h-auto max-h-[400px] md:max-h-[500px] object-contain bg-black"
                />
              </div>

              {/* Caption Input */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3">
                  Add a Caption
                </h3>
                <textarea
                  placeholder="Start writing something..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={4}
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-sm md:text-base focus:outline-none focus:border-orange-500 placeholder-gray-400 text-white resize-none"
                />
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-800"></div>
                <span className="text-gray-400 text-xs uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-gray-800"></div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {caption && (
                  <button
                    onClick={() => {
                      setPreviewCaption(caption);
                      setStep("preview");
                    }}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition"
                  >
                    Continue
                  </button>
                )}
                <button
                  onClick={handleGenerate}
                  className="flex-1 relative rounded-lg p-[1.5px] bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:opacity-90 transition"
                >
                  <span className="block w-full bg-[#0f0f0f] rounded-lg py-3 text-sm md:text-base font-medium text-white">
                    Generate Caption for 100 Credits
                  </span>
                </button>
              </div>

              {/* Save Draft Button */}
              {(caption || imagePreview) && (
                <button
                  onClick={handleSaveDraft}
                  className="w-full flex items-center justify-center gap-2 border-2 border-gray-700 hover:border-orange-500 text-gray-300 hover:text-orange-500 font-medium py-3 px-6 rounded-lg transition"
                >
                  <Bookmark className="w-4 h-4" />
                  {currentDraftId ? "Update Draft" : "Save as Draft"}
                </button>
              )}
            </motion.div>
          )}

          {/* Step 3: Preview */}
          {step === "preview" && imagePreview && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Image Preview */}
              <div className="w-full rounded-lg overflow-hidden border border-gray-800">
                <img
                  src={imagePreview}
                  alt="Post preview"
                  className="w-full h-auto max-h-[400px] md:max-h-[500px] object-contain bg-black"
                />
              </div>

              {/* Caption Preview */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Preview</h3>
                <div className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-sm md:text-base text-white min-h-[100px]">
                  {previewCaption || "An evening walk with nowhere to go ..."}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handlePost}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition"
                >
                  Post
                </button>
                <button
                  onClick={handleRegenerate}
                  className="flex-1 border-2 border-green-500 text-green-500 hover:bg-green-500/10 font-medium py-3 px-6 rounded-lg transition"
                >
                  Regenerate
                </button>
              </div>

              {/* Save Draft Button */}
              <button
                onClick={handleSaveDraft}
                className="w-full flex items-center justify-center gap-2 border-2 border-gray-700 hover:border-orange-500 text-gray-300 hover:text-orange-500 font-medium py-3 px-6 rounded-lg transition"
              >
                <Bookmark className="w-4 h-4" />
                {currentDraftId ? "Update Draft" : "Save as Draft"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}