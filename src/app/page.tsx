"use client";
import { useState, useEffect } from "react";
import TextType from './components/TextType';
import Image from "next/image";
import Link from "next/link";
import useLenis from './lib/useLenis';


export default function Page() {
   useLenis({ lerp: 0.07 });
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
            <Image
              src="/land.png"
              width={100}
              height={100}
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
    <>
      {/* Navbar */}
      <nav
        className="w-full absolute top-0 left-0 z-30 flex items-center px-8 py-6"
        style={{
          backdropFilter: "blur(10px)",
          zIndex: 30,
        }}
      >
        {/* Navbar content without Semicolon'25 */}
      </nav>
      <div
        className="absolute left-8 top-24 z-40"
        style={{
          fontFamily: "'Press Start 2P', cursive",
          color: "white",
          fontSize: "3rem",
          fontWeight: "bold",
          textShadow: "2px 2px 8px #000",
        }}
      >
        Semicolon'25
      </div>
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
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/40"
          style={{ zIndex: 20 }}
        >
          {/* Removed Semicolon'25 from here */}
        </div>
      </div>
      {/* Features Section */}
      <section className="w-full relative flex items-center justify-center overflow-hidden p-0 m-0" style={{ minHeight: "1100px" }}>
        <Image
          src="/2nd-bg.png"
          alt="Features Background"
          fill
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
      </section>
    </>
  );
}

