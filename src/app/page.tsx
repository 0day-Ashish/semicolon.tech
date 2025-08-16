"use client";
import { useState, useEffect } from "react";
import TextType from './components/TextType';

export default function Page() {
  const [step, setStep] = useState<"image" | "video" | "home">("image");

  useEffect(() => {
    if (step === "video") {
      const video = document.getElementById("intro-video") as HTMLVideoElement;
      if (video) {
        video.onended = () => setStep("home");
      }

      const timer = setTimeout(() => setStep("home"), 8000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  
  if (step === "image") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black mx-auto">
        <img
          src="/land.png"
          alt="Intro Image"
          className="w-[200px] h-[190px] cursor-pointer transition-transform duration-300 hover:scale-125 hover:animate-bounce mx-auto"
          onClick={() => setStep("video")}
        />
        <TextType 
  text={["Welcome, Super Coder!", "Are you ready to explore?", "Tap Mario and let's go!"]}
  typingSpeed={75}
  pauseDuration={1500}
  showCursor={true}
  cursorCharacter="|"
/>

      </div>
    );
  }

  // Video screen
  if (step === "video") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <video
          id="intro-video"
          className="w-[150px] h-[150px]object-cover"
          autoPlay
          muted
        >
          <source src="/videos/component.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }

  // Main website content
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-black text-white font-['Press_Start_2P']">
      <h1 className="text-4xl mb-6 text-white">🎮 Super Mario Hackathon</h1>
      <p className="text-lg">Welcome to the adventure!</p>
      <button className="mt-8 bg-yellow-400 text-black px-6 py-3 rounded-lg border-4 border-black hover:scale-105 transition-transform">
        Start
      </button>
    </div>
  );
}
