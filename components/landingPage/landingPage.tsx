'use client';

import React, { Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import Three.js canvas to avoid SSR issues
const HeroThreeScene = dynamic(() => import("@/components/three/HeroThreeScene"), { ssr: false });

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/10 to-background flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-20 gap-10">
        <div className="flex-1 z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-6 leading-tight drop-shadow-lg">
            Unlock Knowledge Instantly.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">
              Summarize PDFs with AI.
            </span>
          </h1>
          {/* <canvas className="w-full h-64" border-2 border-white>Hello</canvas> */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
            Saaransh empowers you to extract the essence of any document in seconds. Upload, summarize, and understand—no more endless scrolling or information overload.
          </p>
          <div className="flex gap-4">
            <Link href="/upload">
              <button className="px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow-lg hover:bg-primary/90 transition">
                Get Started
              </button>
            </Link>
            <Link href="/about">
              <button className="px-6 py-3 rounded-lg border border-primary text-primary font-semibold bg-white/80 hover:bg-primary/10 transition">
                Learn More
              </button>
            </Link>
          </div>
        </div>
        {/* Three.js Interactive Canvas */}
        <div className="flex-1 flex items-center justify-center w-full h-[400px] md:h-[500px]">
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading 3D...</div>}>
            <HeroThreeScene />
          </Suspense>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary">Why Saaransh?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <svg width="48" height="48" fill="none" className="mb-4" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm0 0l8 8 8-8" stroke="#be185d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <h3 className="font-semibold text-lg mb-2">Instant Summaries</h3>
            <p className="text-muted-foreground">Get concise, accurate summaries of your PDFs in seconds, powered by advanced AI.</p>
          </div>
          <div className="bg-card rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <svg width="48" height="48" fill="none" className="mb-4" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#be185d" strokeWidth="1.5"/><path d="M8 12h8M12 8v8" stroke="#be185d" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <h3 className="font-semibold text-lg mb-2">Save Time & Effort</h3>
            <p className="text-muted-foreground">No more skimming through pages. Focus on what matters most, instantly.</p>
          </div>
          <div className="bg-card rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <svg width="48" height="48" fill="none" className="mb-4" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="#be185d" strokeWidth="1.5"/><path d="M8 12h8" stroke="#be185d" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <h3 className="font-semibold text-lg mb-2">Secure & Private</h3>
            <p className="text-muted-foreground">Your documents are processed securely and never stored longer than needed.</p>
          </div>
        </div>
      </section>

      {/* Motive Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary text-center">Our Motive</h2>
          <p className="text-lg text-muted-foreground max-w-2xl text-center mb-8">
            Saaransh was born out of the need to make information more accessible. We believe that everyone should be able to grasp the core ideas of any document—fast. Whether you’re a student, researcher, or professional, Saaransh helps you stay ahead by transforming lengthy PDFs into actionable insights.
          </p>
          <Link href="/upload">
            <button className="px-8 py-3 rounded-lg bg-primary text-white font-semibold shadow-lg hover:bg-primary/90 transition">
              Try Saaransh Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}