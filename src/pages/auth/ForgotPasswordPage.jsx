import React, { useState, useEffect, useRef } from "react";
import { authService } from "../../services/authService";

export default function ResetPasswordPage({ onComplete, onCancel }) {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const particlesRef = useRef(null);
  const gridBackgroundRef = useRef(null);

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
    };

    createGridBackground();
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      await authService.forgotPassword(email);
      setSuccess("OTP sent to your email!");
      setTimeout(() => {
        setStep(2);
        setSuccess("");
      }, 1500);
    } catch (err) {
      console.error("Forgot password error:", err);
      setError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp.trim()) {
      setError("Please enter the OTP code");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setIsLoading(true);

    try {
      await authService.verifyOTP(email, otp);
      setSuccess("OTP verified!");
      setTimeout(() => {
        setStep(3);
        setSuccess("");
      }, 1000);
    } catch (err) {
      console.error("Verify OTP error:", err);
      setError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newPassword.trim()) {
      setError("Please enter a new password");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await authService.resetPassword(email, otp, newPassword);
      setSuccess("Password reset successful!");
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500);
    } catch (err) {
      console.error("Reset password error:", err);
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .reset-page-body {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        .reset-container {
          max-width: 450px;
          width: 90%;
          padding: 40px;
          background: rgba(30, 30, 30, 0.85);
          border-radius: 20px;
          box-shadow: 0 15px 60px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 87, 34, 0.2);
          position: relative;
          z-index: 10;
        }

        .reset-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .reset-header h1 {
          color: #ff5722;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 10px;
          text-shadow: 0 0 20px rgba(255, 87, 34, 0.5);
        }

        .reset-header p {
          color: #ccc;
          font-size: 14px;
          margin: 0;
        }

        .step-indicator {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 30px;
        }

        .step {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          font-weight: bold;
          border: 2px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .step.active {
          background: linear-gradient(45deg, #ff5722, #ff9800);
          color: white;
          border-color: #ff5722;
          box-shadow: 0 0 20px rgba(255, 87, 34, 0.6);
        }

        .step.completed {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          border-color: #10b981;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .input-group label {
          display: block;
          margin-bottom: 8px;
          color: #ccc;
          font-size: 14px;
          font-weight: 500;
        }

        .input-field {
          width: 100%;
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.08);
          border: 2px solid rgba(68, 68, 68, 0.7);
          border-radius: 10px;
          color: #fff;
          font-size: 16px;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }

        .input-field:focus {
          outline: none;
          border-color: #ff5722;
          box-shadow: 0 0 15px rgba(255, 87, 34, 0.4);
          background: rgba(255, 255, 255, 0.12);
        }

        .input-field::placeholder {
          color: rgba(255, 255, 255, 0.35);
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
          border-radius: 4px;
        }

        .password-toggle:hover {
          color: #ff5722;
          background: rgba(255, 87, 34, 0.1);
        }

        .error-message {
          color: #ff5722;
          font-size: 12px;
          margin-top: 8px;
          display: block;
          padding-left: 20px;
          position: relative;
        }

        .error-message::before {
          content: '⚠';
          position: absolute;
          left: 0;
          font-size: 14px;
        }

        .success-message {
          color: #10b981;
          font-size: 12px;
          margin-top: 8px;
          display: block;
          padding-left: 20px;
          position: relative;
        }

        .success-message::before {
          content: '✓';
          position: absolute;
          left: 0;
          font-size: 14px;
          font-weight: bold;
        }

        .button-group {
          display: flex;
          gap: 12px;
          margin-top: 25px;
        }

        .btn {
          flex: 1;
          padding: 14px 25px;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .btn-primary {
          background: linear-gradient(45deg, #ff5722, #ff9800);
          color: white;
          box-shadow: 0 5px 15px rgba(255, 87, 34, 0.4);
        }

        .btn-primary:hover:not(:disabled) {
          background: linear-gradient(45deg, #e64a19, #f57c00);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 87, 34, 0.6);
        }

        .btn-secondary {
          background: transparent;
          color: #ff5722;
          border: 2px solid #ff5722;
        }

        .btn-secondary:hover:not(:disabled) {
          background: rgba(255, 87, 34, 0.1);
          transform: translateY(-2px);
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn.loading {
          position: relative;
        }

        .btn.loading span {
          opacity: 0;
        }

        .btn.loading::after {
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

        .particles {
          position: fixed;
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
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120px) rotate(360deg);
            opacity: 0;
          }
        }

        .grid-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
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

        .otp-input {
          text-align: center;
          font-size: 24px;
          letter-spacing: 8px;
          font-weight: bold;
        }

        .resend-link {
          text-align: center;
          margin-top: 15px;
        }

        .resend-link button {
          background: none;
          border: none;
          color: #ff9800;
          cursor: pointer;
          font-size: 14px;
          text-decoration: underline;
          padding: 5px 10px;
          border-radius: 5px;
          transition: all 0.3s ease;
        }

        .resend-link button:hover {
          background: rgba(255, 152, 0, 0.1);
          color: #ff5722;
        }

        @media (max-width: 480px) {
          .reset-container {
            padding: 30px 20px;
          }

          .reset-header h1 {
            font-size: 24px;
          }

          .step {
            width: 35px;
            height: 35px;
            font-size: 14px;
          }
        }
      `}</style>

      <div className="reset-page-body">
        <div className="grid-background" ref={gridBackgroundRef}></div>
        <div className="particles" ref={particlesRef}></div>

        <div className="reset-container">
          <div className="reset-header">
            <h1>Reset Password</h1>
            <p>
              {step === 1 && "Enter your email to receive OTP"}
              {step === 2 && "Enter the 6-digit code sent to your email"}
              {step === 3 && "Create your new password"}
            </p>
          </div>

          <div className="step-indicator">
            <div className={`step ${step >= 1 ? (step > 1 ? 'completed' : 'active') : ''}`}>1</div>
            <div className={`step ${step >= 2 ? (step > 2 ? 'completed' : 'active') : ''}`}>2</div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
          </div>

          {/* Step 1: Email */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  className="input-field"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  disabled={isLoading}
                  autoFocus
                />
                {error && <span className="error-message">{error}</span>}
                {success && <span className="success-message">{success}</span>}
              </div>

              <div className="button-group">
                <button
                  type="submit"
                  className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading || !email.trim()}
                >
                  <span>{isLoading ? "SENDING..." : "SEND OTP"}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  CANCEL
                </button>
              </div>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <form onSubmit={handleOTPSubmit}>
              <div className="input-group">
                <label htmlFor="otp">OTP Code</label>
                <input
                  id="otp"
                  type="text"
                  className="input-field otp-input"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setOtp(value);
                    setError("");
                  }}
                  disabled={isLoading}
                  autoFocus
                  maxLength={6}
                />
                {error && <span className="error-message">{error}</span>}
                {success && <span className="success-message">{success}</span>}
              </div>

              <div className="resend-link">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setOtp("");
                    setError("");
                  }}
                  disabled={isLoading}
                >
                  Didn't receive OTP? Resend
                </button>
              </div>

              <div className="button-group">
                <button
                  type="submit"
                  className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading || otp.length !== 6}
                >
                  <span>{isLoading ? "VERIFYING..." : "VERIFY OTP"}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setStep(1)}
                  disabled={isLoading}
                >
                  BACK
                </button>
              </div>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handlePasswordSubmit}>
              <div className="input-group">
                <label htmlFor="newPassword">New Password</label>
                <div className="password-input-wrapper">
                  <input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    className="input-field"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setError("");
                    }}
                    disabled={isLoading}
                    autoFocus
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input-wrapper">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="input-field"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError("");
                    }}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
                {error && <span className="error-message">{error}</span>}
                {success && <span className="success-message">{success}</span>}
              </div>

              <div className="button-group">
                <button
                  type="submit"
                  className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading || !newPassword.trim() || !confirmPassword.trim()}
                >
                  <span>{isLoading ? "RESETTING..." : "RESET PASSWORD"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
