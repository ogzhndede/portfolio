"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import PhonePlayable from "@/components/PhonePlayable";
import { GAMES, type GameItem, type PlayableItem } from "@/data/games";

const DEVICE_OPTIONS = [
  { label: "Phone (9:16)", value: "9:16" },
  { label: "Tall Phone (9:20)", value: "9:20" },
  { label: "Phone Landscape (16:9)", value: "16:9" },
  { label: "Tall Phone Landscape (20:9)", value: "20:9" },
  { label: "Tablet Portrait (3:4)", value: "3:4" },
  { label: "Tablet Landscape (4:3)", value: "4:3" },
];

export default function WorksPage() {
  const [activeGameId, setActiveGameId] = useState<string>(GAMES[0]?.id ?? "");
  const [expandedGameId, setExpandedGameId] = useState<string>(GAMES[0]?.id ?? "");
  const [activePlayableId, setActivePlayableId] = useState<string>(
    GAMES[0]?.playables[0]?.id ?? ""
  );

  const [selectedAspect, setSelectedAspect] = useState<string>(
    GAMES[0]?.playables[0]?.aspect ?? "9:16"
  );

  const activeGame = useMemo(
    () => GAMES.find((g) => g.id === activeGameId) ?? GAMES[0],
    [activeGameId]
  );

  const activePlayable = useMemo(
    () => activeGame?.playables.find((p) => p.id === activePlayableId) ?? activeGame?.playables[0],
    [activeGame, activePlayableId]
  );

  function selectGame(game: GameItem) {
    if (expandedGameId === game.id) {
      setExpandedGameId("");
    } else {
      setExpandedGameId(game.id);
    }
    const firstPlayable = game.playables[0];
    setActiveGameId(game.id);
    setActivePlayableId(firstPlayable?.id ?? "");

    if (firstPlayable) {
      setSelectedAspect(firstPlayable.aspect);
    }
  }

  function selectPlayable(game: GameItem, playable: PlayableItem) {
    setActiveGameId(game.id);
    setActivePlayableId(playable.id);

    setSelectedAspect(playable.aspect);
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-mono flex">
      <Sidebar title="Oğuz Han Dede" imageSrc="/portfolio/ben.png" />

      <div className="flex-1 md:ml-80">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          {/* Header */}
          <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-[#8b8aef]">
                Projects
              </h1>
              <p className="mt-2 text-lg text-white/50">
                Playable Ads & Interactive Experiences
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[350px_1fr]">
            {/* SOL: Oyun Listesi */}
            <section className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8b8aef] px-2">Library</div>
              <div className="grid gap-2 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
                {GAMES.map((g) => {
                  const isExpanded = expandedGameId === g.id;
                  const isActive = activeGameId === g.id;

                  return (
                    <div key={g.id} className="flex flex-col">
                      <button
                        onClick={() => selectGame(g)}
                        className={`
                          group flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition-all duration-300
                          ${isActive
                            ? "border-[#8b8aef]/50 bg-[#8b8aef]/10 shadow-[0_0_20px_rgba(139,138,239,0.1)]"
                            : "border-white/5 bg-black/40 hover:border-white/20 hover:bg-white/5"}
                        `}
                      >
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-inner">
                          <Image
                            src={`/portfolio/${g.logo}`}
                            alt={`${g.title} logo`}
                            fill
                            className={`object-cover transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className={`truncate text-sm font-bold ${isActive ? "text-white" : "text-white/70"}`}>
                            {g.title}
                          </div>
                          <div className="mt-1 text-[10px] text-white/30">
                            {g.playables.length} playable{g.playables.length > 1 ? "s" : ""}
                          </div>
                        </div>

                        <svg
                          className={`w-4 h-4 shrink-0 text-[#8b8aef] transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {isExpanded && (
                        <div className="mt-1 ml-4 flex flex-col gap-1 border-l border-white/10 pl-3">
                          {g.playables.map((p) => {
                            const pActive = activePlayableId === p.id && activeGameId === g.id;
                            return (
                              <button
                                key={p.id}
                                onClick={() => selectPlayable(g, p)}
                                className={`
                                  flex items-center justify-between rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition-all duration-200
                                  ${pActive
                                    ? "border-[#8b8aef]/40 bg-[#8b8aef]/15 text-white"
                                    : "border-white/5 bg-black/20 text-white/50 hover:border-white/15 hover:text-white/80"}
                                `}
                              >
                                <span>{p.label}</span>
                                <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-normal ${pActive ? "border-[#8b8aef]/30 text-[#8b8aef]" : "border-white/10 text-white/30"}`}>
                                  {p.aspect}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SAĞ: Oyun Önizleme Paneli */}
            <section className="relative">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">
                {activeGame && activePlayable ? (
                  <>
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/20">
                          <Image
                            src={`/portfolio/${activeGame.logo}`}
                            alt={`${activeGame.title} logo`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-white">{activeGame.title}</h2>
                          <p className="text-xs text-[#8b8aef] font-medium uppercase tracking-wide mt-1">
                            {activePlayable.label}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Cihaz/Boyut Seçici */}
                        <select
                          value={selectedAspect}
                          onChange={(e) => setSelectedAspect(e.target.value)}
                          className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs font-bold text-white/80 outline-none hover:bg-white/5 focus:ring-1 focus:ring-[#8b8aef]/50 transition-all cursor-pointer"
                        >
                          {DEVICE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-zinc-900 text-white">
                              {opt.label}
                            </option>
                          ))}
                        </select>

                        <a
                          href={activePlayable.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-xs font-bold text-white/70 border border-white/10 transition hover:bg-white/10 hover:text-white"
                        >
                          Fullscreen
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>

                    <div className="flex justify-center items-center rounded-2xl bg-black/40 p-4 md:p-6 border border-white/5 shadow-inner min-h-[500px] md:min-h-[650px]">
                      <div
                        className="relative flex items-center justify-center transition-all duration-500 w-full h-full max-h-[600px]"
                        style={{ aspectRatio: selectedAspect.replace(":", "/") }}
                      >
                        <PhonePlayable
                          url={activePlayable.url}
                          title={`${activeGame.title} – ${activePlayable.label}`}
                          logo={activeGame.logo}
                          aspect={selectedAspect}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex h-[400px] flex-col items-center justify-center text-white/30">
                    <svg className="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>Select a game to preview</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        <MobileDrawer
          activeGame={activeGame}
          activePlayable={activePlayable ?? null}
          selectedAspect={selectedAspect}
          setSelectedAspect={setSelectedAspect}
        />
      </div>
    </main>
  );
}

function MobileDrawer({
  activeGame,
  activePlayable,
  selectedAspect,
  setSelectedAspect,
}: {
  activeGame: GameItem | undefined;
  activePlayable: PlayableItem | null;
  selectedAspect: string;
  setSelectedAspect: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);

  if (!activeGame || !activePlayable) return null;

  return (
    <>
      <div className="mt-6 lg:hidden font-mono">
        <button
          onClick={() => setOpen(true)}
          className="w-full rounded-2xl bg-[#8b8aef] px-4 py-4 text-sm font-extrabold text-white shadow-lg shadow-[#8b8aef]/20"
        >
          Play — {activeGame.title} · {activePlayable.label}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden font-mono">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex flex-col h-full w-[95vw] border-l border-white/10 bg-[#0a0a0a] p-6 shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="mb-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#8b8aef] uppercase tracking-widest text-xs">Play Mode</div>
                  <div className="text-white/50 text-xs mt-1">{activeGame.title} · {activePlayable.label}</div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white hover:bg-white/10"
                >
                  Close
                </button>
              </div>

              {/* Mobil görünüm için ekran seçici */}
              <select
                value={selectedAspect}
                onChange={(e) => setSelectedAspect(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm font-bold text-white/80 outline-none focus:ring-1 focus:ring-[#8b8aef]/50 cursor-pointer"
              >
                {DEVICE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-zinc-900 text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 flex items-center justify-center overflow-hidden p-2">
              <div
                className="relative flex items-center justify-center w-full h-full max-h-[80vh] transition-all duration-500"
                style={{ aspectRatio: selectedAspect.replace(":", "/") }}
              >
                <PhonePlayable
                  url={activePlayable.url}
                  title={`${activeGame.title} – ${activePlayable.label}`}
                  logo={activeGame.logo}
                  aspect={selectedAspect}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}