"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";

export default function AboutPage() {

    const text1 = "Hi, I'm Oğuz Han Dede";
    const text2 = "Game / Playable Ads Developer";

    const [displayedText1, setDisplayedText1] = useState("");
    const [displayedText2, setDisplayedText2] = useState("");

    const [phase, setPhase] = useState(0);

    useEffect(() => {
        if (phase === 0) {
            if (displayedText1.length < text1.length) {
                const timeout = setTimeout(() => {
                    setDisplayedText1(text1.slice(0, displayedText1.length + 1));
                }, 70);
                return () => clearTimeout(timeout);
            } else {
                setTimeout(() => setPhase(1), 400);
            }
        } else if (phase === 1) {
            if (displayedText2.length < text2.length) {
                const timeout = setTimeout(() => {
                    setDisplayedText2(text2.slice(0, displayedText2.length + 1));
                }, 70);
                return () => clearTimeout(timeout);
            } else {
              
                setPhase(2);
            }
        }
    }, [displayedText1, displayedText2, phase]);

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white flex">
            <Sidebar title="Oğuz Han Dede" imageSrc="/ben.png" />

            <div className="flex-1 md:ml-80 flex flex-col justify-center items-center p-4">

                <div className="flex flex-col items-center text-center gap-8 max-w-3xl w-full z-10">

                    <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-3xl border-2 border-white/20 bg-gradient-to-br from-white/10 to-black/40 shadow-2xl shadow-white/5 md:h-48 md:w-48">
                        <Image
                            src="/ben.png"
                            alt="Oğuz Han Dede"
                            fill
                            className="object-cover transition duration-500 hover:scale-110"
                        />
                    </div>

                    <div className="font-mono flex flex-col items-center gap-2">
                        <h1 className="text-3xl md:text-5xl font-bold text-white min-h-[36px] md:min-h-[48px]">
                            {displayedText1}
                            {phase === 0 && <span className="animate-pulse">|</span>}
                        </h1>

                        <h2 className="text-xl md:text-3xl font-bold text-[#8b8aef] min-h-[28px] md:min-h-[36px]">
                            {displayedText2}
                            {phase === 1 && <span className="animate-pulse text-white">|</span>}
                        </h2>
                    </div>

                    <div className={`flex gap-4 mt-4 transition-opacity duration-1000 ${phase === 2 ? 'opacity-100' : 'opacity-0'}`}>
                        <Link href="/works" className="px-8 py-3 bg-white text-black font-mono font-bold rounded-lg hover:bg-gray-200 transition">
                            Projects
                        </Link>
                        <Link href="/playable" className="px-8 py-3 border border-white/20 bg-white/5 font-mono text-white font-bold rounded-lg hover:bg-white/10 transition">
                            Playables
                        </Link>
                    </div>

                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-transparent pointer-events-none" />
            </div>
        </main>
    );
}