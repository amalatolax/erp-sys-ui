import React, { useState } from "react";
import { Mail, Lock, ArrowRight, ArrowLeft, User } from "lucide-react";
import LoginBgImg from "../../assets/pexels-gary-barnes-6231905.jpg";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [resetMode, setResetMode] = useState(false);
  const [resetMethod, setResetMethod] = useState<"user" | "admin">("user");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 p-6">
      <div className="flex w-full max-w-5xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-green-100">
        {/* Left Section */}
        <div
          className="hidden lg:flex flex-col justify-center items-center w-1/2 text-white p-12 relative overflow-hidden"
          style={{
            backgroundImage: `url(${LoginBgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
          <div className="relative z-10 space-y-6 text-center">
            <div className="bg-white/20 p-4 rounded-2xl inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c0-1.657-1.343-3-3-3H4a1 1 0 00-1 1v8a1 1 0 001 1h5a3 3 0 003-3v-4zm0 0V8a4 4 0 014-4h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a4 4 0 01-4-4z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight drop-shadow-md">
              Unlock Your Productivity
            </h1>
            <p className="text-green-50 text-base leading-relaxed max-w-sm mx-auto drop-shadow-sm">
              Streamline your business operations with our powerful ERP
              solution.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 sm:p-12">
          <div className="max-w-md mx-auto w-full">
            {!resetMode ? (
              <>
                {/* Login Form */}
                <h2 className="text-2xl font-semibold tracking-tight mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600 mb-8 text-sm">
                  Sign in to continue managing your workspace.
                </p>

                <form className="space-y-6">
                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username or Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                      <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Forgot Password */}
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => setResetMode(true)}
                      className="text-sm text-green-600 hover:underline font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-xl shadow-md shadow-green-100 transition-all"
                    onClick={() => navigate("/")}
                  >
                    Log In
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <>
                {/* Reset Password Form */}
                <div className="flex items-center gap-2 mb-6">
                  <button
                    type="button"
                    onClick={() => setResetMode(false)}
                    className="flex items-center text-green-600 hover:underline"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Login
                  </button>
                </div>

                <h2 className="text-2xl font-semibold tracking-tight mb-2">
                  Reset Your Password
                </h2>
                <p className="text-gray-600 mb-6 text-sm">
                  Choose how you'd like to reset your password.
                </p>

                {/* Radio Buttons */}
                <div className="flex flex-col gap-3 mb-6">
                  <label
                    className={`flex items-center justify-between border rounded-xl p-3 cursor-pointer transition-all ${
                      resetMethod === "user"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="resetMethod"
                        value="user"
                        checked={resetMethod === "user"}
                        onChange={() => setResetMethod("user")}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="font-medium text-gray-800">
                        Reset password by user
                      </span>
                    </div>
                    <User className="text-green-600" />
                  </label>

                  <label
                    className={`flex items-center justify-between border rounded-xl p-3 cursor-pointer transition-all ${
                      resetMethod === "admin"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="resetMethod"
                        value="admin"
                        checked={resetMethod === "admin"}
                        onChange={() => setResetMethod("admin")}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="font-medium text-gray-800">
                        Request reset by admin
                      </span>
                    </div>
                    <Mail className="text-green-600" />
                  </label>
                </div>

                {/* Username (mandatory for user method) */}
                {resetMethod === "user" && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username or Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Enter your username or email"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all placeholder-gray-400"
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-xl shadow-md shadow-green-100 transition-all"
                >
                  {resetMethod === "user"
                    ? "Send Reset Link"
                    : "Request Admin Assistance"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Footer */}
            <p className="text-xs text-center text-gray-500 mt-8">
              © 2025 Olax - ERP System. All rights reserved. <br />
              For assistance, please{" "}
              <a href="#" className="text-green-600 hover:underline">
                contact support
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
