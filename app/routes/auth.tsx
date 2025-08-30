import React from 'react'
import { usePuterStore } from '~/lib/puter';
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Iridescence from "../../Backgrounds/Iridescence/Iridescence";
import GlassSurface from "../../Animations/GlassSurface/GlassSurface";

export const meta = () => ([
    { title: 'Resumind | Auth' },
    { name: 'description', content: 'Log into your account' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const next = searchParams.get('next') || '/dashboard';
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated && next) {
            navigate(decodeURIComponent(next));
        }
    }, [auth.isAuthenticated, next, navigate]);

    return (
        <main className="relative min-h-screen overflow-hidden">
            {/* Iridescence Background */}
            <div className="absolute inset-0 z-0">
                <Iridescence
                    color={[0.5, 0.6, 0.8]}
                    mouseReact={false}
                    amplitude={0.1}
                    speed={1.0}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6">
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
                    {/* Main Auth Card */}
                    <div className="w-full">
                        <GlassSurface
                            width="100%"
                            height="auto"
                            borderRadius={24}
                            displace={8}
                            distortionScale={-100}
                            redOffset={3}
                            greenOffset={8}
                            blueOffset={15}
                            brightness={70}
                            opacity={0.9}
                            mixBlendMode="normal"
                            className="shadow-xl sm:shadow-2xl backdrop-blur-xl"
                        >
                            <div className="p-4 sm:p-6 md:p-8 min-h-[400px] sm:min-h-[450px] md:min-h-[500px] flex flex-col">
                                {/* Header Section */}
                                <div className="text-center mb-6 sm:mb-8">
                                    <div className="mb-4 sm:mb-6">
                                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
                                            Welcome
                                        </h1>
                                        <h2 className="text-sm sm:text-base md:text-lg text-white/80 font-medium leading-relaxed px-2 sm:px-0">
                                            Continue Your Job Journey
                                        </h2>
                                    </div>
                                </div>

                                {/* Auth Section */}
                                <div className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-6">
                                    {/* Status Message */}
                                    <div className="text-center">
                                        {isLoading ? (
                                            <p className="text-white/70 text-xs sm:text-sm font-medium">
                                                Authenticating securely...
                                            </p>
                                        ) : auth?.isAuthenticated ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                                                <p className="text-green-300 text-xs sm:text-sm font-medium">
                                                    Successfully signed in
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="text-white/70 text-xs sm:text-sm px-2 sm:px-0">
                                                Sign in to access your dashboard
                                            </p>
                                        )}
                                    </div>

                                    {/* Auth Button Container */}
                                    <div className="space-y-3 sm:space-y-4">
                                        {isLoading ? (
                                            <div className="w-full">
                                                <GlassSurface
                                                    width="100%"
                                                    height={48}
                                                    borderRadius={12}
                                                    displace={6}
                                                    distortionScale={-60}
                                                    brightness={50}
                                                    opacity={0.6}
                                                    className="cursor-not-allowed"
                                                >
                                                    <button
                                                        disabled
                                                        className="w-full h-full flex items-center justify-center gap-2 sm:gap-3 text-white font-semibold text-sm sm:text-base"
                                                    >
                                                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                                                        <span className="text-xs sm:text-sm">Signing you in...</span>
                                                    </button>
                                                </GlassSurface>
                                            </div>
                                        ) : (
                                            <>
                                                {auth?.isAuthenticated ? (
                                                    <div className="w-full">
                                                        <GlassSurface
                                                            width="100%"
                                                            height={48}
                                                            borderRadius={12}
                                                            displace={8}
                                                            distortionScale={-80}
                                                            redOffset={8}
                                                            greenOffset={2}
                                                            blueOffset={2}
                                                            brightness={60}
                                                            opacity={0.8}
                                                            className="transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group touch-manipulation"
                                                        >
                                                            <button
                                                                onClick={auth.signOut}
                                                                className="w-full h-full text-white font-semibold text-sm sm:text-base transition-all duration-300 group-hover:text-red-200"
                                                            >
                                                                Sign Out
                                                            </button>
                                                        </GlassSurface>
                                                    </div>
                                                ) : (
                                                    <div className="w-full">
                                                        <GlassSurface
                                                            width="100%"
                                                            height={48}
                                                            borderRadius={12}
                                                            displace={8}
                                                            distortionScale={-80}
                                                            redOffset={2}
                                                            greenOffset={2}
                                                            blueOffset={8}
                                                            brightness={65}
                                                            opacity={0.8}
                                                            className="transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group touch-manipulation"
                                                        >
                                                            <button
                                                                onClick={auth.signIn}
                                                                className="w-full h-full text-white font-semibold text-sm sm:text-base transition-all duration-300 group-hover:text-blue-200"
                                                            >
                                                                Sign In
                                                            </button>
                                                        </GlassSurface>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    {/* Security Badge */}
                                    {!auth?.isAuthenticated && !isLoading && (
                                        <div className="text-center pt-2 sm:pt-4">
                                            <div className="w-full">
                                                <GlassSurface
                                                    width="100%"
                                                    height={32}
                                                    borderRadius={8}
                                                    displace={4}
                                                    distortionScale={-40}
                                                    brightness={40}
                                                    opacity={0.6}
                                                    className="flex items-center justify-center"
                                                >
                                                    <p className="text-white/60 text-xs font-medium px-2">
                                                        🔒 Secure authentication powered by Puter
                                                    </p>
                                                </GlassSurface>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </GlassSurface>
                    </div>


                </div>
            </div>
        </main>
    );
};

export default Auth;
