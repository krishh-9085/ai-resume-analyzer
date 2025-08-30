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
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Main Auth Card */}
                    <GlassSurface
                        width={400}
                        height={500}
                        borderRadius={32}
                        displace={12}
                        distortionScale={-120}
                        redOffset={3}
                        greenOffset={8}
                        blueOffset={15}
                        brightness={70}
                        opacity={0.9}
                        mixBlendMode="normal"
                        className="shadow-2xl backdrop-blur-xl"
                    >
                        <div className="p-8 h-full flex flex-col">
                            {/* Header Section */}
                            <div className="text-center mb-8">
                                <div className="mb-6">
                                    <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
                                        Welcome
                                    </h1>
                                    <h2 className="text-lg text-white/80 font-medium leading-relaxed">
                                        Continue Your Job Journey
                                    </h2>
                                </div>
                            </div>

                            {/* Auth Section */}
                            <div className="flex-1 flex flex-col justify-center space-y-6">
                                {/* Status Message */}
                                <div className="text-center">
                                    {isLoading ? (
                                        <p className="text-white/70 text-sm font-medium">
                                            Authenticating securely...
                                        </p>
                                    ) : auth?.isAuthenticated ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                            <p className="text-green-300 text-sm font-medium">
                                                Successfully signed in
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-white/70 text-sm">
                                            Sign in to access your dashboard
                                        </p>
                                    )}
                                </div>

                                {/* Auth Button Container */}
                                <div className="space-y-4">
                                    {isLoading ? (
                                        <GlassSurface
                                            width="100%"
                                            height={56}
                                            borderRadius={16}
                                            displace={8}
                                            distortionScale={-80}
                                            brightness={50}
                                            opacity={0.6}
                                            className="cursor-not-allowed"
                                        >
                                            <button
                                                disabled
                                                className="w-full h-full flex items-center justify-center gap-3 text-white font-semibold"
                                            >
                                                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                                                Signing you in...
                                            </button>
                                        </GlassSurface>
                                    ) : (
                                        <>
                                            {auth?.isAuthenticated ? (
                                                <GlassSurface
                                                    width="100%"
                                                    height={56}
                                                    borderRadius={16}
                                                    displace={10}
                                                    distortionScale={-100}
                                                    redOffset={8}
                                                    greenOffset={2}
                                                    blueOffset={2}
                                                    brightness={60}
                                                    opacity={0.8}
                                                    className="transition-all duration-300 hover:scale-105 cursor-pointer group"
                                                >
                                                    <button
                                                        onClick={auth.signOut}
                                                        className="w-full h-full text-white font-semibold transition-all duration-300 group-hover:text-red-200"
                                                    >
                                                        Sign Out
                                                    </button>
                                                </GlassSurface>
                                            ) : (
                                                <GlassSurface
                                                    width="100%"
                                                    height={56}
                                                    borderRadius={16}
                                                    displace={10}
                                                    distortionScale={-100}
                                                    redOffset={2}
                                                    greenOffset={2}
                                                    blueOffset={8}
                                                    brightness={65}
                                                    opacity={0.8}
                                                    className="transition-all duration-300 hover:scale-105 cursor-pointer group"
                                                >
                                                    <button
                                                        onClick={auth.signIn}
                                                        className="w-full h-full text-white font-semibold transition-all duration-300 group-hover:text-blue-200"
                                                    >
                                                        Sign In
                                                    </button>
                                                </GlassSurface>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* Security Badge */}
                                {!auth?.isAuthenticated && !isLoading && (
                                    <div className="text-center pt-4">
                                        <GlassSurface
                                            width="100%"
                                            height={40}
                                            borderRadius={12}
                                            displace={5}
                                            distortionScale={-60}
                                            brightness={40}
                                            opacity={0.6}
                                            className="flex items-center justify-center"
                                        >
                                            <p className="text-white/60 text-xs font-medium">
                                                🔒 Secure authentication powered by Puter
                                            </p>
                                        </GlassSurface>
                                    </div>
                                )}
                            </div>
                        </div>
                    </GlassSurface>


                </div>
            </div>
        </main>
    );
};

export default Auth;
