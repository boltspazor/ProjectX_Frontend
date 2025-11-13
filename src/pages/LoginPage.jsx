import React, { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage({ onLogin, onSwitchToSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Dummy credentials
    if (username === "demo" && password === "demo123") {
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  const handleGoogleLogin = () => {
    // Dummy Google login - just log in directly
    onLogin();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        {/* Login Form */}
        <div className="bg-[#0a0a0a] rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-800">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Login to BaitHub
          </h1>

          {/* Google Login Button */}
          <motion.button
            onClick={handleGoogleLogin}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 px-6 rounded-full flex items-center justify-center gap-3 mb-6 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Login with Google
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-gray-500 text-sm">Or continue with Email</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl mb-6 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username or Email */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Username or Email
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="demo"
                className="w-full bg-white text-black px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="demo123"
                className="w-full bg-white text-black px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                required
              />
              <div className="text-right mt-2">
                <button
                  type="button"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Forgot?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition-colors mt-6"
            >
              Confirm
            </motion.button>
          </form>

          {/* Switch to Sign Up */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <button
                onClick={onSwitchToSignup}
                className="text-orange-500 hover:text-orange-400 font-medium transition-colors"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}