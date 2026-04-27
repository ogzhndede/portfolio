"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import { profile } from "@/data/profile";
import { publicAssetPath } from "@/lib/paths";

export default function AboutPage() {
    const pathname = usePathname();

    const text1 = profile.greeting;
    const text2 = profile.title;

    const [displayedText1, setDisplayedText1] = useState("");
    const [displayedText2, setDisplayedText2] = useState("");

    const [phase, setPhase] = useState(0);

    useEffect(() => {
        setDisplayedText1("");
        setDisplayedText2("");
        setPhase(0);
    }, [pathname]);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        if (phase === 0) {
            if (displayedText1.length < text1.length) {
                timeout = setTimeout(() => {
                    setDisplayedText1(text1.slice(0, displayedText1.length + 1));
                }, 70);
            } else {
                timeout = setTimeout(() => setPhase(1), 400);
            }
        } else if (phase === 1) {
            if (displayedText2.length < text2.length) {
                timeout = setTimeout(() => {
                    setDisplayedText2(text2.slice(0, displayedText2.length + 1));
                }, 70);
            } else {
                timeout = setTimeout(() => setPhase(2), 250);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayedText1, displayedText2, phase]);

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col md:flex-row">
            <Sidebar />

            <div className="relative flex-1 md:ml-80 flex min-w-0 flex-col justify-center items-center overflow-hidden p-4 py-12 md:py-4">

                <div className="flex flex-col items-center text-center gap-8 max-w-3xl w-full z-10">

                    <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-3xl border-2 border-white/20 bg-gradient-to-br from-white/10 to-black/40 shadow-2xl shadow-white/5 md:h-48 md:w-48">
                        <Image
                            src={publicAssetPath(profile.profileImage)}
                            alt={profile.name}
                            fill
                            className="object-cover transition duration-500 hover:scale-110"
                        />
                    </div>

                    <div className="font-mono flex flex-col items-center gap-2">
                        <h1 className="break-words text-3xl md:text-5xl font-bold text-white min-h-[36px] md:min-h-[48px]">
                            {displayedText1}
                            {phase === 0 && <span className="animate-pulse">|</span>}
                        </h1>

                        <h2 className="break-words text-xl md:text-3xl font-bold text-[#8b8aef] min-h-[28px] md:min-h-[36px]">
                            {displayedText2}
                            {phase === 1 && <span className="animate-pulse text-white">|</span>}
                        </h2>
                    </div>

                    <div className={`flex w-full flex-col gap-3 mt-4 transition-opacity duration-1000 sm:w-auto sm:flex-row sm:gap-4 ${phase === 2 ? 'opacity-100' : 'opacity-0'}`}>
                        <Link href="/projects" className="px-8 py-3 text-center bg-white text-black font-mono font-bold rounded-lg hover:bg-gray-200 transition">
                            Projects
                        </Link>
                        <Link href="/works" className="px-8 py-3 text-center border border-white/20 bg-white/5 font-mono text-white font-bold rounded-lg hover:bg-white/10 transition">
                            Playables
                        </Link>
                    </div>

                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-transparent pointer-events-none" />
            </div>
        </main>
    );
}
