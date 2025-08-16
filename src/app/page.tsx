"use client";
import { useState, useEffect } from "react";
import TextType from './components/TextType';
import Image from "next/image";
import Link from "next/link";

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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black px-4 sm:px-6 lg:px-8">
          <div className="relative w-full max-w-md flex flex-col items-center space-y-8">
            <img
              src="/land.png"
              alt="Intro Image"
              className="w-[150px] h-[150px] sm:w-[200px] sm:h-[190px] cursor-pointer transition-transform duration-300 hover:scale-110"
              onClick={() => setStep("video")}
            />
            <div className="flex top-[calc(100%+2rem)] w-90% text-center">
              <TextType 
                text={["Welcome, Super Coder!", "Are you ready to explore?", "Tap Mario and let's go!"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Video screen
  if (step === "video") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
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
      </div>
    );
  }

  // Main website content
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src="/videos/main-bg-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{ backgroundColor: "black" }}
        onEnded={e => {
          const video = e.currentTarget;
          video.currentTime = 0;
          video.play();
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-red z-10 bg-black/40">
        <h1 className="text-5xl font-bold mb-4">Welcome to Mario World</h1>
        <p className="text-lg mb-6">Tap to start your adventure</p>
        <button className="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700">
          Start Game
        </button>
      </div>
      {/* <h1 className="text-white text-bold">hello</h1> */}
    </div>
  );
}
