import React, { useState, useEffect, useRef } from "react";

export default function SignupPage({ onSignup, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const particlesRef = useRef(null);
  const backgroundElementsRef = useRef(null);
  const gridBackgroundRef = useRef(null);
  const scanLineRef = useRef(null);

  // Create floating particles
  useEffect(() => {
    const createParticles = () => {
      if (!particlesRef.current) return;
      particlesRef.current.innerHTML = "";
      const particleCount = 25;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";

        const size = Math.random() * 12 + 5;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 10;
        const animationDelay = Math.random() * 5;
        const hue = Math.random() * 30 + 15;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${animationDelay}s`;
        particle.style.background = `rgba(255, ${87 - hue}, ${34 - hue / 2}, 0.6)`;

        particlesRef.current.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  // Create background elements
  useEffect(() => {
    const createBackgroundElements = () => {
      if (!backgroundElementsRef.current) return;
      backgroundElementsRef.current.innerHTML = "";
      const elementCount = 8;

      for (let i = 0; i < elementCount; i++) {
        const element = document.createElement("div");
        element.className = "floating-element";

        const size = Math.random() * 200 + 100;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const animationDuration = Math.random() * 30 + 20;
        const animationDelay = Math.random() * 10;

        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.left = `${left}%`;
        element.style.top = `${top}%`;
        element.style.animationDuration = `${animationDuration}s`;
        element.style.animationDelay = `${animationDelay}s`;

        backgroundElementsRef.current.appendChild(element);
      }
    };

    createBackgroundElements();
  }, []);

  // Create grid background
  useEffect(() => {
    const createGridBackground = () => {
      if (!gridBackgroundRef.current) return;
      gridBackgroundRef.current.innerHTML = "";

      // Create horizontal lines
      for (let i = 0; i < 20; i++) {
        const line = document.createElement("div");
        line.className = "grid-line horizontal";
        line.style.top = `${i * 50}px`;
        line.style.animationDelay = `${Math.random() * 5}s`;
        gridBackgroundRef.current.appendChild(line);
      }

      // Create vertical lines
      for (let i = 0; i < 20; i++) {
        const line = document.createElement("div");
        line.className = "grid-line vertical";
        line.style.left = `${i * 50}px`;
        line.style.animationDelay = `${Math.random() * 5}s`;
        gridBackgroundRef.current.appendChild(line);
      }

      // Create pulse circles
      for (let i = 0; i < 5; i++) {
        const circle = document.createElement("div");
        circle.className = "pulse-circle";

        const size = Math.random() * 200 + 100;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const animationDuration = Math.random() * 10 + 5;
        const animationDelay = Math.random() * 5;

        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.left = `${left}%`;
        circle.style.top = `${top}%`;
        circle.style.animationDuration = `${animationDuration}s`;
        circle.style.animationDelay = `${animationDelay}s`;

        gridBackgroundRef.current.appendChild(circle);
      }
    };

    createGridBackground();
  }, []);

  // Scan line animation
  useEffect(() => {
    const createScanLine = () => {
      if (!scanLineRef.current) return;
      const interval = setInterval(() => {
        scanLineRef.current.style.animation = "none";
        setTimeout(() => {
          scanLineRef.current.style.animation = "scan 4s linear infinite";
        }, 10);
      }, 4000);

      return () => clearInterval(interval);
    };

    const cleanup = createScanLine();
    return cleanup;
  }, []);

  // D-pad button interactions
  useEffect(() => {
    const dpadButtons = document.querySelectorAll(".d-pad-btn");

    const handleMouseDown = (e) => {
      e.target.style.transform = "scale(0.95)";
      e.target.style.background = "#ff5722";
    };

    const handleMouseUp = (e) => {
      e.target.style.transform = "scale(1.08)";
      setTimeout(() => {
        e.target.style.background = "#555";
      }, 150);
    };

    const handleMouseLeave = (e) => {
      e.target.style.transform = "scale(1)";
      e.target.style.background = "#555";
    };

    dpadButtons.forEach((button) => {
      button.addEventListener("mousedown", handleMouseDown);
      button.addEventListener("mouseup", handleMouseUp);
      button.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      dpadButtons.forEach((button) => {
        button.removeEventListener("mousedown", handleMouseDown);
        button.removeEventListener("mouseup", handleMouseUp);
        button.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // Action button interactions
  useEffect(() => {
    const actionButtons = document.querySelectorAll(".action-btn");

    const handleMouseDown = (e) => {
      e.target.style.transform = "scale(0.9)";
    };

    const handleMouseUp = (e) => {
      e.target.style.transform = "scale(1.15)";
    };

    const handleMouseLeave = (e) => {
      e.target.style.transform = "scale(1)";
    };

    actionButtons.forEach((button) => {
      button.addEventListener("mousedown", handleMouseDown);
      button.addEventListener("mouseup", handleMouseUp);
      button.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      actionButtons.forEach((button) => {
        button.removeEventListener("mousedown", handleMouseDown);
        button.removeEventListener("mouseup", handleMouseUp);
        button.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // Input focus effects
  useEffect(() => {
    const inputFields = document.querySelectorAll(".input-field");

    const handleFocus = (e) => {
      let label = e.target.parentElement.querySelector("label");
      // For password fields with nested structure, check parent's parent
      if (!label && e.target.parentElement.parentElement) {
        label = e.target.parentElement.parentElement.querySelector("label");
      }
      if (label) {
        label.style.color = "#ff5722";
        label.style.transform = "translateY(-5px) scale(0.9)";
      }
    };

    const handleBlur = (e) => {
      if (!e.target.value) {
        let label = e.target.parentElement.querySelector("label");
        // For password fields with nested structure, check parent's parent
        if (!label && e.target.parentElement.parentElement) {
          label = e.target.parentElement.parentElement.querySelector("label");
        }
        if (label) {
          label.style.color = "#ccc";
          label.style.transform = "translateY(0) scale(1)";
        }
      }
    };

    inputFields.forEach((input) => {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
    });

    return () => {
      inputFields.forEach((input) => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      });
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Please enter your name");
      triggerErrorAnimation();
      return;
    }

    if (!formData.username.trim()) {
      setError("Please enter a username");
      triggerErrorAnimation();
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email");
      triggerErrorAnimation();
      return;
    }

    if (!formData.password.trim()) {
      setError("Please enter a password");
      triggerErrorAnimation();
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      triggerErrorAnimation();
      return;
    }

    if (!agreedToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      triggerErrorAnimation();
      return;
    }

    // Success - show loading state
    setIsLoading(true);
    const controller = document.querySelector(".controller");
    if (controller) {
      controller.style.animation = "none";
      controller.style.transform = "scale(1.05) rotateY(10deg)";
      createSuccessParticles();

      setTimeout(() => {
        setIsLoading(false);
      onSignup();
      }, 800);
    }
  };

  const triggerErrorAnimation = () => {
    const controller = document.querySelector(".controller");
    if (controller) {
      controller.style.animation = "shake 0.5s";
      setTimeout(() => {
        controller.style.animation = "controllerFloat 8s ease-in-out infinite";
      }, 500);
    }
  };

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && (e.target.tagName === "INPUT")) {
        const form = document.getElementById("signupForm");
        if (form) {
          form.requestSubmit();
        }
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, []);

  const createSuccessParticles = () => {
    const controller = document.querySelector(".controller");
    if (!controller) return;

    const rect = controller.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 15; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.position = "fixed";
      particle.style.zIndex = "100";

      const size = Math.random() * 8 + 4;
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 100 + 50;
      const duration = Math.random() * 1 + 0.5;
      const endX = Math.cos(angle) * distance;
      const endY = Math.sin(angle) * distance;

      // Create unique animation for each particle
      const animationName = `successParticle${i}`;
      const style = document.createElement("style");
      style.textContent = `
        @keyframes ${animationName} {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(${endX}px, ${endY}px) scale(0);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;
      particle.style.background = `rgba(255, 215, 0, 0.8)`;
      particle.style.animation = `${animationName} ${duration}s ease-out forwards`;

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
        style.remove();
      }, duration * 1000);
    }
  };

  const handleLoginClick = () => {
    const controller = document.querySelector(".controller");
    if (controller) {
      controller.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      controller.style.opacity = "0";
      controller.style.transform = "scale(0.95)";
      setTimeout(() => {
        onSwitchToLogin();
      }, 400);
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .signup-page-body {
          background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          color: #fff;
          padding: 20px;
          overflow: hidden;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .controller-container {
          width: 100%;
          max-width: 450px;
          perspective: 1000px;
          position: relative;
          z-index: 10;
        }

        .controller {
          background: linear-gradient(145deg, #2d2d2d, #3a3a3a);
          border-radius: 20px;
          padding: 35px;
          box-shadow:
            0 15px 35px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transform-style: preserve-3d;
          transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          animation: controllerFloat 8s ease-in-out infinite;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        @keyframes controllerFloat {
          0%, 100% {
            transform: translateY(0) rotateY(0) rotateX(0);
          }
          25% {
            transform: translateY(-10px) rotateY(2deg) rotateX(1deg);
          }
          50% {
            transform: translateY(-5px) rotateY(-1deg) rotateX(-1deg);
          }
          75% {
            transform: translateY(-8px) rotateY(1deg) rotateX(0.5deg);
          }
        }

        .controller:hover {
          transform: rotateY(5deg) rotateX(5deg) scale(1.02);
          animation-play-state: paused;
        }

        .controller::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
          transform: rotate(30deg);
          animation: shine 10s linear infinite;
        }

        @keyframes shine {
          0% { transform: rotate(30deg) translateX(-100%); }
          100% { transform: rotate(30deg) translateX(100%); }
        }

        .controller::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,87,34,0.05) 0%, transparent 50%);
          border-radius: 20px;
          z-index: -1;
        }

        .logo {
          text-align: center;
          margin-bottom: 35px;
          position: relative;
        }

        .logo h1 {
          font-size: 32px;
          color: #ff5722;
          text-shadow:
            0 0 10px rgba(255, 87, 34, 0.5),
            0 0 20px rgba(255, 87, 34, 0.3);
          letter-spacing: 3px;
          animation: logoGlow 3s ease-in-out infinite alternate;
          position: relative;
          display: inline-block;
        }

        .logo h1::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 10%;
          width: 80%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ff5722, transparent);
          animation: logoLine 3s ease-in-out infinite;
        }

        @keyframes logoGlow {
          0% {
            text-shadow: 0 0 10px rgba(255, 87, 34, 0.5);
          }
          100% {
            text-shadow:
              0 0 20px rgba(255, 87, 34, 0.8),
              0 0 30px rgba(255, 87, 34, 0.6),
              0 0 40px rgba(255, 87, 34, 0.4);
          }
        }

        @keyframes logoLine {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .input-group {
          margin-bottom: 20px;
          position: relative;
        }

        .input-group:last-of-type {
          margin-bottom: 15px;
        }

        .input-group label {
          display: block;
          margin-bottom: 8px;
          color: #ccc;
          font-size: 14px;
          transition: all 0.4s ease;
          transform-origin: left;
        }

        .input-field {
          width: 100%;
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.08);
          border: 2px solid rgba(68, 68, 68, 0.7);
          border-radius: 10px;
          color: #fff;
          font-size: 16px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          backdrop-filter: blur(5px);
        }

        .input-field:-webkit-autofill,
        .input-field:-webkit-autofill:hover,
        .input-field:-webkit-autofill:focus {
          -webkit-text-fill-color: #fff;
          -webkit-box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 0.08) inset;
          transition: background-color 5000s ease-in-out 0s;
        }

        .input-field:focus {
          outline: none;
          border-color: #ff5722;
          box-shadow:
            0 0 15px rgba(255, 87, 34, 0.4),
            inset 0 0 10px rgba(255, 87, 34, 0.1);
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.12);
        }

        .input-field:focus{
          width: 100%;
          opacity: 1;
        }

        .password-input-wrapper {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          color: #ccc;
          cursor: pointer;
          padding: 5px 10px;
          font-size: 11px;
          font-weight: bold;
          transition: all 0.3s ease;
          z-index: 1;
          border-radius: 4px;
          opacity: 0.8;
        }

        .password-toggle:hover {
          color: #ff5722;
          background: rgba(255, 87, 34, 0.1);
        }

        .password-toggle:active {
          transform: translateY(-50%) scale(0.95);
        }

        .error-message {
          color: #ff5722;
          font-size: 12px;
          margin-top: 8px;
          display: block;
          animation: errorFadeIn 0.3s ease;
          text-shadow: 0 0 8px rgba(255, 87, 34, 0.5);
          position: relative;
          padding-left: 20px;
        }

        .error-message::before {
          content: '⚠';
          position: absolute;
          left: 0;
          font-size: 14px;
        }

        @keyframes errorFadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .input-group.has-error .input-field {
          border-color: rgba(255, 87, 34, 0.7);
          animation: inputError 0.3s ease;
        }

        @keyframes inputError {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }

        .input-field::placeholder {
          color: rgba(255, 255, 255, 0.35);
          transition: opacity 0.3s;
        }

        .input-field:focus::placeholder {
          opacity: 0.5;
        }

        .input-field:invalid:not(:placeholder-shown):not(:focus) {
          border-color: rgba(255, 87, 34, 0.6);
        }

        .terms-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 25px;
          padding: 10px;
          border-radius: 8px;
          transition: background 0.3s;
        }

        .terms-checkbox:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        .terms-checkbox input[type="checkbox"] {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          cursor: pointer;
          accent-color: #ff5722;
          flex-shrink: 0;
        }

        .terms-checkbox label {
          color: #ccc;
          font-size: 13px;
          cursor: pointer;
          line-height: 1.5;
          margin: 0;
        }

        .terms-checkbox label a {
          color: #ff9800;
          text-decoration: none;
          transition: color 0.3s;
        }

        .terms-checkbox label a:hover {
          color: #ff5722;
          text-decoration: underline;
        }

        .button-group {
          display: flex;
          justify-content: space-between;
          margin-top: 25px;
          gap: 15px;
        }

        .btn {
          padding: 14px 25px;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .btn:focus-visible {
          outline: 2px solid #ff5722;
          outline-offset: 2px;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s ease;
          z-index: -1;
        }

        .btn:hover:not(:disabled)::before {
          transform: scaleX(1);
          transform-origin: left;
        }

        .btn::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
          z-index: -1;
        }

        .btn:active:not(:disabled)::after {
          width: 300px;
          height: 300px;
        }

        .signup-btn {
          background: linear-gradient(45deg, #ff5722, #ff9800);
          color: white;
          flex: 1;
          box-shadow: 0 5px 15px rgba(255, 87, 34, 0.4);
        }

        .signup-btn:hover:not(:disabled) {
          background: linear-gradient(45deg, #e64a19, #f57c00);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(255, 87, 34, 0.6);
        }

        .signup-btn.loading {
          position: relative;
        }

        .signup-btn.loading span {
          opacity: 0;
        }

        .signup-btn.loading::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .signup-btn:disabled:not(.loading) {
          opacity: 0.5;
        }

        .login-btn {
          background: transparent;
          color: #ff5722;
          border: 2px solid #ff5722;
          flex: 1;
        }

        .login-btn:hover:not(:disabled) {
          background: rgba(255, 87, 34, 0.1);
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(255, 87, 34, 0.3);
        }

        .controller-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
          align-items: center;
        }

        .d-pad {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 6px;
          width: 110px;
          height: 110px;
          position: relative;
        }

        .d-pad::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 80%;
          background: #222;
          border-radius: 50%;
          z-index: 0;
        }

        .d-pad-btn {
          background: #555;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          z-index: 1;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }

        .d-pad-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255, 87, 34, 0.7), rgba(255, 152, 0, 0.7));
          transform: scale(0);
          transition: transform 0.3s;
          border-radius: 8px;
          z-index: -1;
        }

        .d-pad-btn:active::after {
          transform: scale(1);
        }

        .d-pad-btn:hover {
          background: #666;
          transform: scale(1.08);
          box-shadow: 0 6px 10px rgba(0, 0, 0, 0.4);
        }

        .d-pad-up {
          grid-column: 2;
          grid-row: 1;
        }

        .d-pad-left {
          grid-column: 1;
          grid-row: 2;
        }

        .d-pad-center {
          grid-column: 2;
          grid-row: 2;
          background: #333;
          box-shadow: none;
          cursor: default;
        }

        .d-pad-center:hover {
          transform: none;
          background: #333;
        }

        .d-pad-right {
          grid-column: 3;
          grid-row: 2;
        }

        .d-pad-down {
          grid-column: 2;
          grid-row: 3;
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 110px;
          gap: 10px;
        }

        .action-btn {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #ff5722, #ff9800);
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow:
            0 5px 15px rgba(255, 87, 34, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transform: scale(0);
          transition: transform 0.4s;
          border-radius: 50%;
        }

        .action-btn:active::after {
          transform: scale(1);
        }

        .action-btn:hover {
          transform: scale(1.15);
          box-shadow:
            0 8px 20px rgba(255, 87, 34, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .forgot-password {
          text-align: center;
          margin-top: 25px;
        }

        .forgot-password a {
          color: #ff9800;
          text-decoration: none;
          font-size: 14px;
          position: relative;
          transition: all 0.3s ease;
          padding: 5px 10px;
          border-radius: 5px;
        }

        .forgot-password a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #ff9800;
          transition: width 0.3s ease;
        }

        .forgot-password a:hover {
          background: rgba(255, 152, 0, 0.1);
        }

        .forgot-password a:hover::after {
          width: 100%;
        }

        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          background: rgba(255, 87, 34, 0.6);
          border-radius: 50%;
          animation: float 15s infinite linear;
          box-shadow: 0 0 10px rgba(255, 87, 34, 0.5);
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(90vh) rotate(36deg) scale(1);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg) scale(0);
            opacity: 0;
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px) rotate(-1deg); }
          20%, 40%, 60%, 80% { transform: translateX(5px) rotate(1deg); }
        }

        .background-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .floating-element {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          animation: floating 20s infinite linear;
        }

        @keyframes floating {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
          100% {
            transform: translateY(0) rotate(360deg);
          }
        }

        .grid-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          opacity: 0.2;
          pointer-events: none;
        }

        .grid-line {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
        }

        .grid-line.horizontal {
          width: 100%;
          height: 1px;
          left: 0;
          animation: gridMoveHorizontal 20s linear infinite;
        }

        .grid-line.vertical {
          width: 1px;
          height: 100%;
          top: 0;
          animation: gridMoveVertical 15s linear infinite;
        }

        @keyframes gridMoveHorizontal {
          0% { transform: translateY(0); }
          100% { transform: translateY(100px); }
        }

        @keyframes gridMoveVertical {
          0% { transform: translateX(0); }
          100% { transform: translateX(100px); }
        }

        .pulse-circle {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255, 87, 34, 0.3);
          animation: pulse 8s infinite ease-in-out;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.3;
          }
        }

        .scan-line {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255, 87, 34, 0.5), transparent);
          animation: scan 4s linear infinite;
          z-index: 2;
          pointer-events: none;
        }

        @keyframes scan {
          0% {
            top: 0;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }

        @media (max-width: 480px) {
          .controller {
            padding: 25px;
          }

          .button-group {
            flex-direction: column;
          }

          .signup-btn, .login-btn {
            margin: 5px 0;
            width: 100%;
          }

          .controller-buttons {
            flex-direction: column;
            gap: 20px;
          }

          .action-buttons {
            flex-direction: row;
            height: auto;
            width: 100%;
            justify-content: center;
            gap: 20px;
          }
        }
      `}</style>

      <div className="signup-page-body">
        <div className="grid-background" ref={gridBackgroundRef}></div>
        <div className="background-elements" ref={backgroundElementsRef}></div>
        <div className="particles" ref={particlesRef}></div>
        <div className="scan-line" ref={scanLineRef}></div>

        <div className="controller-container">
          <div className="controller">
            <div className="logo">
              <h1>BaitHub</h1>
          </div>

            <form id="signupForm" onSubmit={handleSubmit}>
              <div className={`input-group ${error && !formData.name.trim() ? "has-error" : ""}`}>
                <label htmlFor="name">FULL NAME</label>
              <input
                type="text"
                  id="name"
                name="name"
                  className="input-field"
                  placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                  autoComplete="name"
                required
              />
            </div>

              <div className={`input-group ${error && !formData.username.trim() ? "has-error" : ""}`}>
                <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                  id="username"
                name="username"
                  className="input-field"
                  placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                  autoComplete="username"
                required
              />
            </div>

              <div className={`input-group ${error && !formData.email.trim() ? "has-error" : ""}`}>
                <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                  id="email"
                name="email"
                  className="input-field"
                  placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                  autoComplete="email"
                required
              />
            </div>

              <div className={`input-group ${error && (!formData.password.trim() || formData.password.length < 6) ? "has-error" : ""}`}>
                <label htmlFor="password">PASSWORD</label>
                <div className="password-input-wrapper">
              <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                name="password"
                    className="input-field"
                    placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                    autoComplete="new-password"
                required
                    style={{ paddingRight: "60px" }}
                  />
                  {formData.password && (
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? "HIDE" : "SHOW"}
                    </button>
                  )}
                </div>
                {error && (
                  <span className="error-message" role="alert" id="password-error">
                    {error}
                  </span>
                )}
            </div>

              <div className={`terms-checkbox ${error && !agreedToTerms ? "has-error" : ""}`}>
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked);
                    if (error) setError("");
                  }}
                />
                <label htmlFor="terms">
                  I agree with the{" "}
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Privacy Policy
                  </a>
              </label>
            </div>

              <div className="button-group">
                <button
              type="submit"
                  className={`btn signup-btn ${isLoading ? "loading" : ""}`}
                  disabled={isLoading || !formData.name.trim() || !formData.username.trim() || !formData.email.trim() || !formData.password.trim() || !agreedToTerms}
                  aria-busy={isLoading}
                >
                  <span>{isLoading ? "CREATING..." : "SIGN UP"}</span>
                </button>
              <button
                  type="button"
                  className="btn login-btn"
                  onClick={handleLoginClick}
                  disabled={isLoading}
                >
                  LOGIN
              </button>
              </div>
            </form>

            <div className="controller-buttons">
              <div className="d-pad">
                <button className="d-pad-btn d-pad-up"></button>
                <button className="d-pad-btn d-pad-left"></button>
                <div className="d-pad-center"></div>
                <button className="d-pad-btn d-pad-right"></button>
                <button className="d-pad-btn d-pad-down"></button>
              </div>
              <div className="action-buttons">
                <button className="action-btn">A</button>
                <button className="action-btn">B</button>
              </div>
            </div>
          </div>
        </div>
    </div>
    </>
  );
}
