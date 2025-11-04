import React from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
// import LoginBgImg from "../../assets/Eco-Club-Tree-Plantation-1024x758.webp"
import LoginBgImg from "../../assets/pexels-gary-barnes-6231905.jpg"
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const navigate = useNavigate()
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
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

                    {/* Content */}
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
                            Streamline your business operations with our powerful and intuitive ERP
                            solution.
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 sm:p-12">
                    <div className="max-w-md mx-auto w-full">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
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
                                <a
                                    href="#"
                                    className="text-sm text-green-600 hover:underline font-medium"
                                >
                                    Forgot password?
                                </a>
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

                        {/* Divider */}
                        <div className="my-6 flex items-center justify-center text-gray-400">
                            <div className="h-px w-full bg-gray-200"></div>
                            <span className="px-3 text-sm">or</span>
                            <div className="h-px w-full bg-gray-200"></div>
                        </div>

                        {/* Microsoft Login */}
                        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-2.5 hover:bg-gray-50 transition-all font-medium text-gray-700">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                                alt="Microsoft"
                                className="w-5 h-5"
                            />
                            Sign in with Microsoft 365
                        </button>

                        {/* Footer */}
                        <p className="text-xs text-center text-gray-500 mt-8">
                            © 2025 [ERP System Name]. All rights reserved. <br />
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
