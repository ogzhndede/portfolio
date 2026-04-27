"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { publicAssetPath } from "@/lib/paths";

function parseAspect(aspect: string): { w: number; h: number } {
  const [w, h] = aspect.split(":").map(Number);
  return { w, h };
}

export default function PhonePlayable({
  url,
  title,
  logo,
  aspect = "9:16",
}: {
  url: string;
  title: string;
  logo?: string;
  aspect?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
  }, [url, aspect]);

  const handleFullscreen = () => {
    const element = document.getElementById(`game-container-${title}`);
    if (element?.requestFullscreen) {
      element.requestFullscreen();
    }
  };

  const { w, h } = parseAspect(aspect);
  const isPortrait = h > w;
  const hasNotch = isPortrait && aspect !== "3:4";
  const cssRatio = aspect.replace(":", "/");

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div
        id={`game-container-${title}`}
        className={`
          relative rounded-[32px] md:rounded-[40px] bg-zinc-900 shadow-2xl transition-all duration-500
          border-[6px] md:border-[8px] border-zinc-800 p-[6px] md:p-[10px] ring-1 ring-white/10 shrink-0
        `}
        style={{
          aspectRatio: cssRatio,
          ...(isPortrait
            ? { height: "100%", maxHeight: "650px", width: "auto" }
            : { width: "100%", maxWidth: "800px", height: "auto" }),
        }}
      >
        {/* Notch - sadece dikey telefon formatlarında */}
        {hasNotch && (
          <div className="pointer-events-none absolute left-1/2 top-[6px] md:top-[12px] z-20 flex h-[18px] md:h-[24px] w-[30%] md:w-[35%] -translate-x-1/2 items-center justify-center gap-2 md:gap-3 rounded-full bg-black/80 backdrop-blur-md border border-white/5">
            <span className="h-1 md:h-1.5 w-8 md:w-12 rounded-full bg-zinc-800 shadow-inner" />
            <span className="h-1.5 md:h-2 w-1.5 md:w-2 rounded-full bg-zinc-800" />
          </div>
        )}

        <div className="relative h-full w-full overflow-hidden rounded-[16px] md:rounded-[24px] bg-black shadow-inner">
          {!isPlaying ? (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-900/90 backdrop-blur-sm px-4 text-center">
              {logo && (
                <div className="relative mb-4 md:mb-6 h-16 w-16 md:h-20 md:w-20 overflow-hidden rounded-xl md:rounded-2xl border border-white/10 shadow-2xl">
                  <Image
                    src={publicAssetPath(logo)}
                    alt={title}
                    fill
                    className="object-cover scale-110"
                    sizes="80px"
                  />
                </div>
              )}

              <h3 className="text-sm md:text-base font-bold text-white/90 mb-2">
                {title}
              </h3>

              <button
                onClick={() => setIsPlaying(true)}
                className="group relative flex items-center justify-center overflow-hidden rounded-full bg-white px-6 md:px-8 py-2.5 md:py-3.5 font-black uppercase tracking-widest text-black text-xs md:text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                <span className="relative z-10">Start Playable</span>
              </button>

              <p className="mt-3 md:mt-4 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/20">
                Aspect Ratio: {aspect}
              </p>
            </div>
          ) : (
            <>
              <iframe
                className="absolute inset-0 h-full w-full border-0"
                src={publicAssetPath(url)}
                title={title}
                allow="autoplay; fullscreen; gamepad; clipboard-read; clipboard-write"
                sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms allow-popups allow-modals"
              />
              <button
                onClick={handleFullscreen}
                className="absolute bottom-2 md:bottom-4 right-2 md:right-4 z-20 rounded-lg md:rounded-xl bg-black/60 p-1.5 md:p-2.5 text-white backdrop-blur-md border border-white/10 hover:bg-black/80 transition-all duration-300 opacity-70 hover:opacity-100"
                title="Fullscreen"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
