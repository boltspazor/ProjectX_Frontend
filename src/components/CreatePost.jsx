import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp, MapPin, UserPlus, Smile, X } from "lucide-react";
import EmojiPickerReact from 'emoji-picker-react';
import { useUserProfile } from "../hooks/useUserProfile";
import uploadIcon from "../assets/upload.svg";

export default function CreatePost({ setActiveView, isOpen, onClose, onPostCreated }) {
  const [step, setStep] = useState("upload"); // "upload", "crop", "edit", "final"
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [aspectRatio, setAspectRatio] = useState("4:3");
  const [cropData, setCropData] = useState({ x: 0, y: 0, zoom: 1 });
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("filters"); // "filters" or "adjustments"
  const [selectedFilter, setSelectedFilter] = useState("original");
  const [adjustments, setAdjustments] = useState({
    brightness: 0,
    contrast: 0,
    fade: 0,
    saturation: 0,
    temperature: 0,
    vignette: 0
  });
  const [caption, setCaption] = useState("");
  const [taggedPeople, setTaggedPeople] = useState([]);
  const [location, setLocation] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const [hideLikeCounts, setHideLikeCounts] = useState(false);
  const [turnOffCommenting, setTurnOffCommenting] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showTagPeopleModal, setShowTagPeopleModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showCollaboratorsModal, setShowCollaboratorsModal] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [tagSearch, setTagSearch] = useState("");
  const [collabSearch, setCollabSearch] = useState("");
  
  const fileInputRef = useRef(null);
  const cropContainerRef = useRef(null);
  const imageRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const { username, profilePhoto } = useUserProfile();

  const filters = [
    { name: "aden", label: "Aden" },
    { name: "clarendon", label: "Clarendon" },
    { name: "crema", label: "Crema" },
    { name: "gingham", label: "Gingham" },
    { name: "juno", label: "Juno" },
    { name: "lark", label: "Lark" },
    { name: "ludwig", label: "Ludwig" },
    { name: "moon", label: "Moon" },
    { name: "original", label: "Original" },
    { name: "perpetua", label: "Perpetua" },
    { name: "reyes", label: "Reyes" },
    { name: "slumber", label: "Slumber" },
  ];

  const aspectRatios = [
    { label: "Original", value: "original" },
    { label: "1:1", value: "1:1" },
    { label: "4:3", value: "4:3" },
    { label: "16:9", value: "16:9" },
    { label: "9:16", value: "9:16" },
  ];

  // Get filter style for thumbnails
  const getFilterStyle = (filterName) => {
    const filterMap = {
      original: "",
      aden: "contrast(0.9) brightness(1.2) saturate(0.85)",
      clarendon: "contrast(1.2) saturate(1.35)",
      crema: "contrast(0.9) brightness(1.1)",
      gingham: "contrast(1.05) brightness(1.05)",
      juno: "contrast(1.15) saturate(1.2)",
      lark: "contrast(1.1) brightness(1.1) saturate(1.1)",
      ludwig: "contrast(1.05) brightness(1.05)",
      moon: "grayscale(1) contrast(1.1)",
      perpetua: "contrast(0.9) brightness(1.1) saturate(0.9)",
      reyes: "contrast(0.85) brightness(1.15) saturate(0.75)",
      slumber: "contrast(0.9) brightness(0.95) saturate(0.85)",
    };
    return filterMap[filterName] || "";
  };

  const handleFileSelect = (file) => {
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setStep("crop");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle image dragging in crop
  const handleImageMouseDown = (e) => {
    setIsDraggingImage(true);
    setDragStart({
      x: e.clientX - cropData.x,
      y: e.clientY - cropData.y
    });
  };

  const handleImageMouseMove = (e) => {
    if (isDraggingImage) {
      setCropData({
        ...cropData,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleImageMouseUp = () => {
    setIsDraggingImage(false);
  };

  useEffect(() => {
    if (isDraggingImage) {
      document.addEventListener('mousemove', handleImageMouseMove);
      document.addEventListener('mouseup', handleImageMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleImageMouseMove);
        document.removeEventListener('mouseup', handleImageMouseUp);
      };
    }
  }, [isDraggingImage, dragStart]);

  // Calculate crop dimensions based on aspect ratio
  const calculateCropDimensions = (imgWidth, imgHeight, targetAspectRatio) => {
    if (targetAspectRatio === "original") {
      return { width: imgWidth, height: imgHeight, x: 0, y: 0 };
    }

    const [ratioW, ratioH] = targetAspectRatio.split(':').map(Number);
    const targetRatio = ratioW / ratioH;
    const currentRatio = imgWidth / imgHeight;

    let cropWidth, cropHeight;

    if (currentRatio > targetRatio) {
      // Image is wider, crop width
      cropHeight = imgHeight;
      cropWidth = cropHeight * targetRatio;
    } else {
      // Image is taller, crop height
      cropWidth = imgWidth;
      cropHeight = cropWidth / targetRatio;
    }

    const x = (imgWidth - cropWidth) / 2;
    const y = (imgHeight - cropHeight) / 2;

    return {
      width: cropWidth,
      height: cropHeight,
      x: Math.max(0, x),
      y: Math.max(0, y)
    };
  };

  // Crop image properly using canvas with zoom and position
  const cropImage = (imageSrc, callback) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Calculate crop area based on aspect ratio
      const cropDims = calculateCropDimensions(img.width, img.height, aspectRatio);
      
      // The canvas will be the final cropped size
      canvas.width = Math.round(cropDims.width);
      canvas.height = Math.round(cropDims.height);

      // Calculate source rectangle considering zoom and drag position
      const zoom = cropData.zoom;
      const dragX = cropData.x || 0;
      const dragY = cropData.y || 0;

      // When zoomed, we see less of the image (smaller source area)
      const sourceWidth = cropDims.width / zoom;
      const sourceHeight = cropDims.height / zoom;

      // Center point of the crop area
      const cropCenterX = cropDims.x + cropDims.width / 2;
      const cropCenterY = cropDims.y + cropDims.height / 2;

      // Apply drag offset (inverse - dragging right shows more left side)
      const sourceCenterX = cropCenterX - dragX / zoom;
      const sourceCenterY = cropCenterY - dragY / zoom;

      // Calculate source top-left corner
      let sourceX = sourceCenterX - sourceWidth / 2;
      let sourceY = sourceCenterY - sourceHeight / 2;

      // Clamp to image boundaries
      sourceX = Math.max(0, Math.min(sourceX, img.width - sourceWidth));
      sourceY = Math.max(0, Math.min(sourceY, img.height - sourceHeight));

      // Ensure we don't exceed boundaries
      if (sourceX + sourceWidth > img.width) {
        sourceX = img.width - sourceWidth;
      }
      if (sourceY + sourceHeight > img.height) {
        sourceY = img.height - sourceHeight;
      }

      // Draw the cropped and zoomed portion
      ctx.drawImage(
        img,
        Math.max(0, sourceX),
        Math.max(0, sourceY),
        Math.min(sourceWidth, img.width - sourceX),
        Math.min(sourceHeight, img.height - sourceY),
        0,
        0,
        canvas.width,
        canvas.height
      );

      callback(canvas.toDataURL('image/jpeg', 0.95));
    };
    img.src = imageSrc;
  };

  const handleCropNext = () => {
    // Crop the image first
    cropImage(imagePreview, (croppedDataUrl) => {
      setCroppedImage(croppedDataUrl);
      setStep("edit");
    });
  };

  // Apply all filters and adjustments to create final edited image
  const applyAllEdits = (imageSrc, callback) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      // Apply filters first (base filter effects)
      const filterMap = {
        original: { contrast: 1, brightness: 1, saturate: 1, grayscale: 0 },
        aden: { contrast: 0.9, brightness: 1.2, saturate: 0.85, grayscale: 0 },
        clarendon: { contrast: 1.2, brightness: 1, saturate: 1.35, grayscale: 0 },
        crema: { contrast: 0.9, brightness: 1.1, saturate: 1, grayscale: 0 },
        gingham: { contrast: 1.05, brightness: 1.05, saturate: 1, grayscale: 0 },
        juno: { contrast: 1.15, brightness: 1, saturate: 1.2, grayscale: 0 },
        lark: { contrast: 1.1, brightness: 1.1, saturate: 1.1, grayscale: 0 },
        ludwig: { contrast: 1.05, brightness: 1.05, saturate: 1, grayscale: 0 },
        moon: { contrast: 1.1, brightness: 1, saturate: 0, grayscale: 1 },
        perpetua: { contrast: 0.9, brightness: 1.1, saturate: 0.9, grayscale: 0 },
        reyes: { contrast: 0.85, brightness: 1.15, saturate: 0.75, grayscale: 0 },
        slumber: { contrast: 0.9, brightness: 0.95, saturate: 0.85, grayscale: 0 },
      };

      const filter = filterMap[selectedFilter] || filterMap.original;

      // Combine filter and adjustment values
      const finalBrightness = filter.brightness * (1 + adjustments.brightness / 100);
      const finalContrast = filter.contrast * (1 + adjustments.contrast / 100);
      const finalSaturation = filter.saturate * (1 + adjustments.saturation / 100);
      const finalFade = 1 - Math.abs(adjustments.fade) / 100;

      // Apply adjustments using CSS filter (since canvas filters are limited)
      // For production, you'd want to use proper image processing libraries
      // For now, we'll use CSS filters which work well for most cases
      callback(imageSrc);
    };
    img.src = imageSrc;
  };

  const handleEditNext = () => {
    // The edits are applied via CSS filters, so we can proceed
    setStep("final");
  };

  const handleShare = () => {
    // Create post object - use cropped image only
    const newPost = {
      id: Date.now(),
      image: croppedImage || imagePreview, // Always use cropped image
      caption: caption,
      profileImage: profilePhoto,
      username: username,
      taggedPeople: taggedPeople,
      location: location,
      collaborators: collaborators,
      hideLikeCounts: hideLikeCounts,
      turnOffCommenting: turnOffCommenting,
      // Store filter and adjustment data for rendering
      filter: selectedFilter,
      adjustments: adjustments,
      createdAt: new Date().toISOString()
    };

    // Dispatch custom event for ProfilePage to listen
    window.dispatchEvent(
      new CustomEvent("newPostCreated", { detail: newPost })
    );

    // Call callback if provided
    if (onPostCreated) {
      onPostCreated(newPost);
    }

    // Reset and close
    handleClose();
  };

  const handleClose = () => {
    setStep("upload");
    setSelectedFile(null);
    setImagePreview(null);
    setCroppedImage(null);
    setEditedImage(null);
    setAspectRatio("4:3");
    setCropData({ x: 0, y: 0, zoom: 1 });
    setSelectedFilter("original");
    setAdjustments({
      brightness: 0,
      contrast: 0,
      fade: 0,
      saturation: 0,
      temperature: 0,
      vignette: 0
    });
    setCaption("");
    setTaggedPeople([]);
    setLocation("");
    setCollaborators([]);
    setHideLikeCounts(false);
    setTurnOffCommenting(false);
    setShowAdvancedSettings(false);
    if (onClose) {
      onClose();
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showEmojiPicker]);

  // Calculate filter and adjustment styles with accurate adjustments
  const getImageStyle = () => {
    // Base filter styles
    const filterMap = {
      original: { contrast: 1, brightness: 1, saturate: 1, grayscale: 0 },
      aden: { contrast: 0.9, brightness: 1.2, saturate: 0.85, grayscale: 0 },
      clarendon: { contrast: 1.2, brightness: 1, saturate: 1.35, grayscale: 0 },
      crema: { contrast: 0.9, brightness: 1.1, saturate: 1, grayscale: 0 },
      gingham: { contrast: 1.05, brightness: 1.05, saturate: 1, grayscale: 0 },
      juno: { contrast: 1.15, brightness: 1, saturate: 1.2, grayscale: 0 },
      lark: { contrast: 1.1, brightness: 1.1, saturate: 1.1, grayscale: 0 },
      ludwig: { contrast: 1.05, brightness: 1.05, saturate: 1, grayscale: 0 },
      moon: { contrast: 1.1, brightness: 1, saturate: 0, grayscale: 1 },
      perpetua: { contrast: 0.9, brightness: 1.1, saturate: 0.9, grayscale: 0 },
      reyes: { contrast: 0.85, brightness: 1.15, saturate: 0.75, grayscale: 0 },
      slumber: { contrast: 0.9, brightness: 0.95, saturate: 0.85, grayscale: 0 },
    };

    const baseFilter = filterMap[selectedFilter] || filterMap.original;

    // Combine base filter with adjustments
    const brightness = baseFilter.brightness * (1 + adjustments.brightness / 100);
    const contrast = baseFilter.contrast * (1 + adjustments.contrast / 100);
    const saturation = baseFilter.saturate * (1 + adjustments.saturation / 100);
    const grayscale = baseFilter.grayscale;

    // Fade: Reduces opacity (0-100 means 100% to 0% opacity)
    const fade = 1 - (adjustments.fade / 100); // fade: 0 = no change, 100 = fully faded

    // Temperature: Warm (positive) shifts to orange/red, Cool (negative) shifts to blue
    // More accurate temperature simulation using sepia for warm and hue-rotate for cool
    const tempValue = adjustments.temperature;
    let tempFilters = [];
    if (tempValue > 0) {
      // Warm: Add orange/yellow tint using sepia
      const sepiaAmount = Math.min(tempValue / 150, 0.6);
      tempFilters.push(`sepia(${sepiaAmount})`);
      if (sepiaAmount > 0.2) {
        tempFilters.push(`saturate(${1 + sepiaAmount * 0.3})`);
      }
    } else if (tempValue < 0) {
      // Cool: Shift hue towards blue/cyan
      const coolAmount = Math.abs(tempValue);
      // Negative hue-rotate shifts towards blue
      tempFilters.push(`hue-rotate(${-coolAmount * 1.2}deg)`);
      // Slight desaturation for cool tones
      if (coolAmount > 30) {
        tempFilters.push(`saturate(${Math.max(0.7, 1 - coolAmount / 300)})`);
      }
    }
    const tempFilter = tempFilters.join(' ');

    // Build filter string
    let filterParts = [];
    if (brightness !== 1) filterParts.push(`brightness(${brightness})`);
    if (contrast !== 1) filterParts.push(`contrast(${contrast})`);
    if (saturation !== 1) filterParts.push(`saturate(${saturation})`);
    if (grayscale > 0) filterParts.push(`grayscale(${grayscale})`);
    if (tempFilter) filterParts.push(tempFilter);

    const filterStyle = filterParts.join(' ');
    const opacityStyle = fade !== 1 ? fade : 1;

    return {
      filter: filterStyle || 'none',
      opacity: opacityStyle
    };
  };

  // Get vignette style (needs to be applied as box-shadow or overlay)
  const getVignetteStyle = () => {
    if (adjustments.vignette === 0) return null;
    const intensity = Math.abs(adjustments.vignette) / 100;
    return {
      boxShadow: `inset 0 0 ${100 + intensity * 200}px ${intensity * 50}px rgba(0, 0, 0, ${intensity})`
    };
  };

  // Handle caption change with 2200 limit
  const handleCaptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 2200) {
      setCaption(value);
    }
  };

  // Handle emoji selection
  const handleEmojiSelect = (emoji) => {
    setCaption(prev => {
      const newCaption = prev + emoji;
      return newCaption.length <= 2200 ? newCaption : prev;
    });
  };

  if (!isOpen) return null;

  // Desktop-only modal (mobile will be handled separately later)
  return (
    <AnimatePresence>
      <div className="hidden md:flex fixed inset-0 z-[100] items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80"
        />

        {/* Modal Content - Dark Theme */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`relative bg-[#0f0f0f] rounded-lg shadow-2xl ${step === "final" ? "overflow-visible" : "overflow-hidden"} max-w-5xl w-full max-h-[90vh] flex flex-col border border-gray-800`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Step 1: Upload */}
          {step === "upload" && (
            <div className="flex flex-col items-center justify-center p-12 min-h-[600px]">
              <h2 className="text-xl font-semibold mb-8 text-white">Create new post</h2>
              
              <div
                className={`w-full max-w-md border-2 border-dashed rounded-lg p-16 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-600 hover:border-gray-500"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center gap-4">
                  {/* Upload icon from assets */}
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <img
                      src={uploadIcon}
                      alt="Upload"
                      className="w-20 h-20 invert"
                    />
                  </div>

                  <p className="text-gray-300 text-lg">Drag photos and videos here</p>
                  <button
                    className="px-6 py-2 bg-[#A855F7] text-white rounded-lg font-semibold hover:bg-[#9333EA] transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    Select From Computer
                  </button>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          )}

          {/* Step 2: Crop */}
          {step === "crop" && imagePreview && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                <button
                  onClick={() => {
                    setStep("upload");
                    setImagePreview(null);
                  }}
                  className="text-blue-500 font-semibold hover:text-blue-400"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-base font-semibold text-white">Crop</h2>
                <button
                  onClick={handleCropNext}
                  className="text-blue-500 font-semibold hover:text-blue-400"
                >
                  Next
                </button>
              </div>

              {/* Crop Content */}
              <div className="flex-1 flex">
                <div className="flex-1 bg-black flex items-center justify-center p-8 relative overflow-hidden">
                  {/* Grid lines */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-0 right-0 h-px bg-white/30"></div>
                    <div className="absolute top-2/3 left-0 right-0 h-px bg-white/30"></div>
                    <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/30"></div>
                    <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/30"></div>
                  </div>

                  {/* Image with crop overlay - draggable */}
                  <div
                    ref={cropContainerRef}
                    className="relative max-w-full max-h-full cursor-move"
                    style={{
                      aspectRatio: aspectRatio === "4:3" ? "4/3" : aspectRatio === "1:1" ? "1/1" : aspectRatio === "16:9" ? "16/9" : aspectRatio === "9:16" ? "9/16" : "auto"
                    }}
                  >
                    <img
                      ref={imageRef}
                      src={imagePreview}
                      alt="Crop preview"
                      className="max-w-full max-h-full object-contain select-none"
                      style={{
                        transform: `scale(${cropData.zoom}) translate(${cropData.x}px, ${cropData.y}px)`,
                        cursor: isDraggingImage ? 'grabbing' : 'grab'
                      }}
                      onMouseDown={handleImageMouseDown}
                      draggable={false}
                    />
                  </div>
                </div>

                {/* Sidebar - Aspect Ratio and Zoom */}
                <div className="w-80 bg-[#1a1a1a] border-l border-gray-800 p-4 space-y-6 overflow-y-auto">
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Aspect Ratio</h3>
                    <div className="space-y-2">
                      {aspectRatios.map((ratio) => (
                        <button
                          key={ratio.value}
                          onClick={() => {
                            setAspectRatio(ratio.value);
                            // Reset crop position when aspect ratio changes
                            setCropData({ x: 0, y: 0, zoom: 1 });
                          }}
                          className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                            aspectRatio === ratio.value
                              ? "bg-blue-500/20 text-blue-400 font-semibold border border-blue-500/50"
                              : "text-gray-300 hover:bg-gray-800"
                          }`}
                        >
                          {ratio.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Zoom</h3>
                    <input
                      type="range"
                      min="1"
                      max="3"
                      step="0.1"
                      value={cropData.zoom}
                      onChange={(e) =>
                        setCropData({ ...cropData, zoom: parseFloat(e.target.value) })
                      }
                      className="w-full"
                    />
                    <div className="text-xs text-gray-400 mt-1 text-center">
                      {Math.round(cropData.zoom * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Edit (Filters & Adjustments) */}
          {step === "edit" && (croppedImage || imagePreview) && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                <button
                  onClick={() => setStep("crop")}
                  className="text-blue-500 font-semibold hover:text-blue-400"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-base font-semibold text-white">Edit</h2>
                <button
                  onClick={handleEditNext}
                  className="text-blue-500 font-semibold hover:text-blue-400"
                >
                  Next
                </button>
              </div>

              {/* Edit Content */}
              <div className="flex-1 flex">
                {/* Image Preview */}
                <div className="flex-1 bg-black flex items-center justify-center p-8 relative">
                  <img
                    src={croppedImage || imagePreview}
                    alt="Edit preview"
                    className="max-w-full max-h-full object-contain rounded-lg relative z-10"
                    style={getImageStyle()}
                  />
                  {getVignetteStyle() && (
                    <div
                      className="absolute inset-0 pointer-events-none z-20 rounded-lg"
                      style={getVignetteStyle()}
                    />
                  )}
                </div>

                {/* Filters/Adjustments Sidebar */}
                <div className="w-80 bg-[#1a1a1a] border-l border-gray-800 flex flex-col">
                  {/* Tabs */}
                  <div className="flex border-b border-gray-800">
                    <button
                      onClick={() => setActiveTab("filters")}
                      className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                        activeTab === "filters"
                          ? "text-purple-400 border-b-2 border-purple-400"
                          : "text-gray-400 hover:text-gray-300"
                      }`}
                    >
                      Filters
                    </button>
                    <button
                      onClick={() => setActiveTab("adjustments")}
                      className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                        activeTab === "adjustments"
                          ? "text-purple-400 border-b-2 border-purple-400"
                          : "text-gray-400 hover:text-gray-300"
                      }`}
                    >
                      Adjustments
                    </button>
                  </div>

                  {/* Filters Grid */}
                  {activeTab === "filters" && (
                    <div className="flex-1 overflow-y-auto p-4">
                      <div className="grid grid-cols-3 gap-3">
                        {filters.map((filter) => (
                          <button
                            key={filter.name}
                            onClick={() => setSelectedFilter(filter.name)}
                            className="flex flex-col items-center gap-2"
                          >
                            <div
                              className={`w-20 h-20 rounded border-2 overflow-hidden ${
                                selectedFilter === filter.name
                                  ? "border-blue-500"
                                  : "border-transparent"
                              }`}
                            >
                              <img
                                src={croppedImage || imagePreview}
                                alt={filter.label}
                                className="w-full h-full object-cover"
                                style={{ filter: getFilterStyle(filter.name) }}
                              />
                            </div>
                            <span
                              className={`text-xs ${
                                selectedFilter === filter.name
                                  ? "text-blue-400 font-semibold"
                                  : "text-gray-400"
                              }`}
                            >
                              {filter.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Adjustments */}
                  {activeTab === "adjustments" && (
                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                      {Object.entries(adjustments).map(([key, value]) => (
                        <div key={key}>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-sm text-gray-300 capitalize">
                              {key}
                            </label>
                            <span className="text-sm text-gray-400">{value}</span>
                          </div>
                          <input
                            type="range"
                            min="-100"
                            max="100"
                            value={value}
                            onChange={(e) =>
                              setAdjustments({
                                ...adjustments,
                                [key]: parseInt(e.target.value),
                              })
                            }
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Final Create Post */}
          {step === "final" && (editedImage || croppedImage || imagePreview) && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                <button
                  onClick={() => setStep("edit")}
                  className="text-blue-500 font-semibold hover:text-blue-400"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-base font-semibold text-white">Create new post</h2>
                <button
                  onClick={handleShare}
                  className="text-blue-500 font-semibold hover:text-blue-400 disabled:text-gray-600"
                >
                  Share
                </button>
              </div>

              {/* Final Content */}
              <div className="flex-1 flex overflow-hidden relative">
                {/* Image Preview */}
                <div className="flex-1 bg-black flex items-center justify-center relative">
                  <img
                    src={croppedImage || imagePreview}
                    alt="Post preview"
                    className="max-w-full max-h-full object-contain cursor-pointer relative z-10"
                    style={getImageStyle()}
                    onClick={() => setShowTagPeopleModal(true)}
                  />
                  {getVignetteStyle() && (
                    <div
                      className="absolute inset-0 pointer-events-none z-20"
                      style={getVignetteStyle()}
                    />
                  )}
                  {taggedPeople.length > 0 && (
                    <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {taggedPeople.length} {taggedPeople.length === 1 ? "person" : "people"} tagged
                    </div>
                  )}
                  <div
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-2 rounded cursor-pointer hover:bg-black/90"
                    onClick={() => setShowTagPeopleModal(true)}
                  >
                    Click photo to tag people
                  </div>
                </div>

                {/* Settings Sidebar */}
                <div className="w-96 bg-[#1a1a1a] border-l border-gray-800 flex flex-col overflow-visible relative">
                  {/* User Profile */}
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
                    <img
                      src={profilePhoto}
                      alt={username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-semibold text-white">{username}</span>
                  </div>

                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto overflow-x-visible relative" style={{ overflow: 'visible' }}>
                    {/* Caption */}
                    <div className="px-4 py-3 border-b border-gray-800 relative" style={{ overflow: 'visible' }}>
                      <textarea
                        placeholder="Write a caption..."
                        value={caption}
                        onChange={handleCaptionChange}
                        className="w-full resize-none outline-none text-sm text-white placeholder-gray-500 bg-transparent"
                        rows={10}
                        maxLength={2200}
                      />
                      <div className="flex items-center justify-between mt-2">
                        <div className="relative overflow-visible" ref={emojiPickerRef}>
                          <Smile
                            className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-300"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          />
                          {showEmojiPicker && (
                            <AnimatePresence>
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                className="absolute bottom-full left-0 mb-2 z-[150]"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="rounded-lg shadow-2xl overflow-hidden">
                                  <EmojiPickerReact
                                    onEmojiClick={(emojiData) => {
                                      handleEmojiSelect(emojiData.emoji);
                                      setShowEmojiPicker(false);
                                    }}
                                    theme="dark"
                                    width={350}
                                    height={400}
                                    previewConfig={{
                                      showPreview: false
                                    }}
                                    skinTonesDisabled
                                    searchDisabled={false}
                                    lazyLoadEmojis={true}
                                  />
                                </div>
                              </motion.div>
                            </AnimatePresence>
                          )}
                        </div>
                        <span className={`text-xs ${caption.length >= 2200 ? 'text-red-400' : 'text-gray-400'}`}>
                          {caption.length}/2,200
                        </span>
                      </div>
                    </div>

                    {/* Add Location */}
                    <button
                      onClick={() => setShowLocationModal(true)}
                      className="w-full px-4 py-3 border-b border-gray-800 flex items-center justify-between hover:bg-gray-900 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-white" />
                        <span className="text-sm text-white">
                          {location || "Add location"}
                        </span>
                      </div>
                    </button>

                    {/* Add Collaborators */}
                    <button
                      onClick={() => setShowCollaboratorsModal(true)}
                      className="w-full px-4 py-3 border-b border-gray-800 flex items-center justify-between hover:bg-gray-900 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <UserPlus className="w-5 h-5 text-white" />
                        <span className="text-sm text-white">
                          {collaborators.length > 0
                            ? `Add collaborators (${collaborators.length})`
                            : "Add collaborators"}
                        </span>
                      </div>
                    </button>

                    {/* Advanced Settings */}
                    <div className="border-b border-gray-800">
                      <button
                        onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-900 transition-colors"
                      >
                        <span className="text-sm text-white">Advanced Settings</span>
                        {showAdvancedSettings ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      {showAdvancedSettings && (
                        <div className="px-4 pb-4 space-y-4">
                          {/* Hide like and view counts */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-white">
                                Hide like and view counts on this post
                              </span>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={hideLikeCounts}
                                  onChange={(e) => setHideLikeCounts(e.target.checked)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                              </label>
                            </div>
                            <p className="text-xs text-gray-400">
                              Only you will see the total number of likes and views on this post. You can change this later by going to the ... menu at the top of the post. To hide like counts on other people's posts, go to your account settings. Learn more
                            </p>
                          </div>

                          {/* Turn off commenting */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-white">
                                Turn off commenting
                              </span>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={turnOffCommenting}
                                  onChange={(e) => setTurnOffCommenting(e.target.checked)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                              </label>
                            </div>
                            <p className="text-xs text-gray-400">
                              You can change this later by going to the ... menu at the top of your post.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Small Popup Modals - Centered in Modal */}
          {/* Tag People Popup */}
          <AnimatePresence>
            {showTagPeopleModal && (
              <>
                <div
                  className="absolute inset-0 bg-black/60 z-[110]"
                  onClick={() => setShowTagPeopleModal(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-2xl z-[111] w-96 max-h-[500px] flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                    <h2 className="text-base font-semibold text-white">Tag people</h2>
                    <button
                      onClick={() => setShowTagPeopleModal(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4">
                    <input
                      type="text"
                      placeholder="Search for people..."
                      value={tagSearch}
                      onChange={(e) => setTagSearch(e.target.value)}
                      className="w-full px-4 py-2 bg-[#0f0f0f] border border-gray-700 rounded-lg mb-4 outline-none focus:border-blue-500 text-white placeholder-gray-500"
                    />
                    {taggedPeople.length > 0 && (
                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-semibold text-white">Tagged:</p>
                        {taggedPeople.map((tag, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-[#0f0f0f] rounded"
                          >
                            <span className="text-sm text-white">{tag}</span>
                            <button
                              onClick={() =>
                                setTaggedPeople(taggedPeople.filter((_, i) => i !== index))
                              }
                              className="text-red-400 text-sm hover:text-red-300"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <button
                      onClick={() => {
                        if (tagSearch.trim() && !taggedPeople.includes(tagSearch.trim())) {
                          setTaggedPeople([...taggedPeople, tagSearch.trim()]);
                          setTagSearch("");
                        }
                      }}
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Add Tag
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Location Popup */}
          <AnimatePresence>
            {showLocationModal && (
              <>
                <div
                  className="absolute inset-0 bg-black/60 z-[110]"
                  onClick={() => {
                    setShowLocationModal(false);
                    setLocationSearch("");
                  }}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-2xl z-[111] w-96 max-h-[400px] flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                    <h2 className="text-base font-semibold text-white">Add location</h2>
                    <button
                      onClick={() => {
                        setShowLocationModal(false);
                        setLocationSearch("");
                      }}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4">
                    <input
                      type="text"
                      placeholder="Search for a location..."
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      className="w-full px-4 py-2 bg-[#0f0f0f] border border-gray-700 rounded-lg mb-4 outline-none focus:border-blue-500 text-white placeholder-gray-500"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (locationSearch.trim()) {
                            setLocation(locationSearch.trim());
                          }
                          setShowLocationModal(false);
                          setLocationSearch("");
                        }}
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Done
                      </button>
                      {location && (
                        <button
                          onClick={() => {
                            setLocation("");
                            setLocationSearch("");
                          }}
                          className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Collaborators Popup */}
          <AnimatePresence>
            {showCollaboratorsModal && (
              <>
                <div
                  className="absolute inset-0 bg-black/60 z-[110]"
                  onClick={() => setShowCollaboratorsModal(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-2xl z-[111] w-96 max-h-[500px] flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                    <h2 className="text-base font-semibold text-white">Add collaborators</h2>
                    <button
                      onClick={() => setShowCollaboratorsModal(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4">
                    <input
                      type="text"
                      placeholder="Search for people..."
                      value={collabSearch}
                      onChange={(e) => setCollabSearch(e.target.value)}
                      className="w-full px-4 py-2 bg-[#0f0f0f] border border-gray-700 rounded-lg mb-4 outline-none focus:border-blue-500 text-white placeholder-gray-500"
                    />
                    {collaborators.length > 0 && (
                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-semibold text-white">Collaborators:</p>
                        {collaborators.map((collab, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-[#0f0f0f] rounded"
                          >
                            <span className="text-sm text-white">{collab}</span>
                            <button
                              onClick={() =>
                                setCollaborators(collaborators.filter((_, i) => i !== index))
                              }
                              className="text-red-400 text-sm hover:text-red-300"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <button
                      onClick={() => {
                        if (collabSearch.trim() && !collaborators.includes(collabSearch.trim())) {
                          setCollaborators([...collaborators, collabSearch.trim()]);
                          setCollabSearch("");
                        }
                      }}
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Add Collaborator
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}