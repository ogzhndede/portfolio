"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import { playableGames, type PlayableGame, type PlayableItem, type PlayableVariant } from "@/data/playables";
import { publicAssetPath } from "@/lib/paths";

type SelectedPlayableState = {
  gameId: string;
  playableId: string;
  variantId?: string;
};

type BaseRatio = "9:20" | "16:9" | "4:3";
type Orientation = "Portrait" | "Landscape";

const RATIO_OPTIONS: BaseRatio[] = ["9:20", "16:9", "4:3"];
const DEFAULT_RATIO: BaseRatio = "16:9";
const DEFAULT_ORIENTATION: Orientation = "Portrait";
const PREVIEW_FRAME_MAX_HEIGHT_VH = 70;
const MODAL_FRAME_MAX_HEIGHT_VH = 72;

function getFrameAspect(baseRatio: BaseRatio, orientation: Orientation) {
  const [first, second] = baseRatio.split(":").map(Number);
  const width = orientation === "Landscape" ? Math.max(first, second) : Math.min(first, second);
  const height = orientation === "Landscape" ? Math.min(first, second) : Math.max(first, second);

  return {
    css: `${width}/${height}`,
    value: width / height,
  };
}

function getFrameWidthForMaxHeight(baseRatio: BaseRatio, orientation: Orientation, maxHeightVh: number) {
  return `min(100%, ${(getFrameAspect(baseRatio, orientation).value * maxHeightVh).toFixed(4)}vh)`;
}

function getPlayableVariants(playable: PlayableItem | undefined) {
  return playable?.variants ?? [];
}

function getDefaultVariantId(playable: PlayableItem | undefined) {
  return getPlayableVariants(playable)[0]?.id;
}

function getSelectedVariant(playable: PlayableItem | undefined, variantId?: string) {
  const variants = getPlayableVariants(playable);
  return variants.find((variant) => variant.id === variantId) ?? variants[0];
}

function resolvePlayableUrl(playable: PlayableItem | undefined, variantId?: string) {
  if (!playable) return "";
  return getSelectedVariant(playable, variantId)?.url ?? playable.url ?? "";
}

function getFoldoutColumnCount(playableCount: number) {
  if (playableCount <= 0) return 1;
  if (playableCount <= 4) return playableCount;
  if (playableCount <= 9) return 3;
  return 4;
}

function PlayableStatusOverlay({ hasError }: { hasError: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70 px-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-white/60 backdrop-blur-sm">
      {!hasError && (
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#8b8aef]" />
      )}
      <span>{hasError ? "Failed to load playable." : "Loading playable..."}</span>
    </div>
  );
}

function GameIcon({
  game,
  className,
}: {
  game: PlayableGame;
  className: string;
}) {
  if (!game.icon) {
    return (
      <div className={`${className} bg-black`} aria-hidden="true" />
    );
  }

  return (
    <div className={className}>
      <Image
        src={publicAssetPath(game.icon)}
        alt={`${game.title} logo`}
        fill
        className="object-cover"
      />
    </div>
  );
}

function PlayableTestFrame({
  game,
  playable,
  playableUrl,
  selectedVariant,
  selectedVariantId,
  onSelectVariant,
  baseRatio,
  orientation,
  setBaseRatio,
  setOrientation,
  onOpenFullscreen,
}: {
  game: PlayableGame | undefined;
  playable: PlayableItem | undefined;
  playableUrl: string;
  selectedVariant: PlayableVariant | undefined;
  selectedVariantId: string | undefined;
  onSelectVariant: (variantId: string) => void;
  baseRatio: BaseRatio;
  orientation: Orientation;
  setBaseRatio: (ratio: BaseRatio) => void;
  setOrientation: (orientation: Orientation) => void;
  onOpenFullscreen: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const variants = getPlayableVariants(playable);
  const resolvedPlayableUrl = playableUrl ? publicAssetPath(playableUrl) : "";

  useEffect(() => {
    if (!resolvedPlayableUrl) {
      setIsLoading(false);
      setHasError(false);
      return;
    }

    setIsLoading(true);
    setHasError(false);
  }, [resolvedPlayableUrl]);

  if (!game || !playable) {
    return (
      <section className="relative">
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 p-6 text-center text-white/30 shadow-2xl md:min-h-[650px]">
          <svg className="mb-4 h-12 w-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0 0 10 9.87v4.263a1 1 0 0 0 1.555.832l3.197-2.132a1 1 0 0 0 0-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
          </svg>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">Select a playable</p>
          <p className="mt-2 max-w-sm text-sm text-white/25">
            Choose an item from the library to load it in the test frame.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl sm:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="flex min-w-0 items-center gap-4">
            <GameIcon
              game={game}
              className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/20"
            />
            <div>
              <h2 className="truncate text-xl font-bold text-white">{game.title}</h2>
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
            <select
              value={baseRatio}
              onChange={(event) => setBaseRatio(event.target.value as BaseRatio)}
              aria-label="Frame ratio"
              className="min-h-10 flex-1 cursor-pointer rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs font-bold text-white/80 outline-none transition-all hover:border-[#8b8aef]/30 hover:bg-white/5 focus:ring-1 focus:ring-[#8b8aef]/50 sm:flex-none"
            >
              {RATIO_OPTIONS.map((ratio) => (
                <option key={ratio} value={ratio} className="bg-zinc-900 text-white">
                  {ratio}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setOrientation(orientation === "Portrait" ? "Landscape" : "Portrait")}
              className="min-h-10 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/70 transition hover:border-[#8b8aef]/30 hover:bg-[#8b8aef]/10 hover:text-white focus:outline-none focus:ring-1 focus:ring-[#8b8aef]/50 sm:flex-none"
            >
              {orientation}
            </button>

            <button
              type="button"
              onClick={onOpenFullscreen}
              disabled={!playable}
              className="min-h-10 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/70 transition hover:border-[#8b8aef]/30 hover:bg-[#8b8aef]/10 hover:text-white focus:outline-none focus:ring-1 focus:ring-[#8b8aef]/50 disabled:cursor-not-allowed disabled:opacity-30 sm:flex-none"
            >
              Fullscreen
            </button>
          </div>
        </div>

        {variants.length > 1 && (
          <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-white/5 pb-6">
            <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              Variants
            </span>
            {variants.map((variant, index) => {
              const active = selectedVariant?.id === variant.id || selectedVariantId === variant.id;

              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => onSelectVariant(variant.id)}
                  className={`
                    flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-xs font-bold uppercase tracking-widest transition focus:outline-none focus:ring-1 focus:ring-[#8b8aef]/50
                    ${active
                      ? "border-[#8b8aef]/50 bg-[#8b8aef]/15 text-white"
                      : "border-white/10 bg-white/5 text-white/45 hover:border-[#8b8aef]/30 hover:bg-[#8b8aef]/10 hover:text-white"}
                  `}
                >
                  {variant.label || index + 1}
                </button>
              );
            })}
          </div>
        )}

        <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-white/5 bg-black/40 p-3 shadow-inner md:min-h-[650px] md:p-6">
          <div
            className="relative max-h-[70vh] max-w-[760px] overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl transition-all duration-500 ease-out"
            style={{
              aspectRatio: getFrameAspect(baseRatio, orientation).css,
              width: getFrameWidthForMaxHeight(baseRatio, orientation, PREVIEW_FRAME_MAX_HEIGHT_VH),
            }}
          >
            <iframe
              className="absolute inset-0 h-full w-full border-0"
              src={resolvedPlayableUrl}
              title={`${game.title} - ${playable.title ?? playable.label}`}
              allow="autoplay; fullscreen; gamepad; clipboard-read; clipboard-write"
              sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms allow-popups allow-modals"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            />

            {(isLoading || hasError) && (
              <PlayableStatusOverlay hasError={hasError} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PlayableFullscreenModal({
  game,
  playable,
  playableUrl,
  selectedVariant,
  selectedVariantId,
  onSelectVariant,
  baseRatio,
  orientation,
  setBaseRatio,
  setOrientation,
  onClose,
}: {
  game: PlayableGame;
  playable: PlayableItem;
  playableUrl: string;
  selectedVariant: PlayableVariant | undefined;
  selectedVariantId: string | undefined;
  onSelectVariant: (variantId: string) => void;
  baseRatio: BaseRatio;
  orientation: Orientation;
  setBaseRatio: (ratio: BaseRatio) => void;
  setOrientation: (orientation: Orientation) => void;
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const variants = getPlayableVariants(playable);
  const resolvedPlayableUrl = publicAssetPath(playableUrl);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [resolvedPlayableUrl]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 font-mono backdrop-blur-md sm:p-4">
      <div className="flex h-[94vh] w-full max-w-7xl flex-col rounded-3xl border border-white/10 bg-[#0a0a0a] p-3 shadow-2xl sm:h-[92vh] sm:p-4 md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex min-w-0 items-center gap-4">
            <GameIcon
              game={game}
              className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-white/20"
            />
            <div className="min-w-0">
              <div className="truncate text-lg font-bold text-white">{game.title}</div>
              <div className="truncate text-xs font-bold uppercase tracking-wider text-[#8b8aef]">
                {playable.title ?? playable.label}
              </div>
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
            <select
              value={baseRatio}
              onChange={(event) => setBaseRatio(event.target.value as BaseRatio)}
              aria-label="Fullscreen frame ratio"
              className="min-h-10 flex-1 cursor-pointer rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs font-bold text-white/80 outline-none transition-all hover:border-[#8b8aef]/30 hover:bg-white/5 focus:ring-1 focus:ring-[#8b8aef]/50 sm:flex-none"
            >
              {RATIO_OPTIONS.map((ratio) => (
                <option key={ratio} value={ratio} className="bg-zinc-900 text-white">
                  {ratio}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setOrientation(orientation === "Portrait" ? "Landscape" : "Portrait")}
              className="min-h-10 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/70 transition hover:border-[#8b8aef]/30 hover:bg-[#8b8aef]/10 hover:text-white focus:outline-none focus:ring-1 focus:ring-[#8b8aef]/50 sm:flex-none"
            >
              {orientation}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="min-h-10 flex-1 rounded-xl border border-[#8b8aef]/30 bg-[#8b8aef]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#8b8aef] transition hover:bg-[#8b8aef]/20 hover:text-white focus:outline-none focus:ring-1 focus:ring-[#8b8aef]/50 sm:flex-none"
            >
              Close
            </button>
          </div>
        </div>

        {variants.length > 1 && (
          <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
            <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              Variants
            </span>
            {variants.map((variant, index) => {
              const active = selectedVariant?.id === variant.id || selectedVariantId === variant.id;

              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => onSelectVariant(variant.id)}
                  className={`
                    flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-xs font-bold uppercase tracking-widest transition focus:outline-none focus:ring-1 focus:ring-[#8b8aef]/50
                    ${active
                      ? "border-[#8b8aef]/50 bg-[#8b8aef]/15 text-white"
                      : "border-white/10 bg-white/5 text-white/45 hover:border-[#8b8aef]/30 hover:bg-[#8b8aef]/10 hover:text-white"}
                  `}
                >
                  {variant.label || index + 1}
                </button>
              );
            })}
          </div>
        )}

        <div className="flex min-h-0 flex-1 items-center justify-center rounded-2xl border border-white/5 bg-black/40 p-3 shadow-inner md:p-6">
          <div
            className="relative max-h-[72vh] max-w-[1120px] overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl transition-all duration-500 ease-out"
            style={{
              aspectRatio: getFrameAspect(baseRatio, orientation).css,
              width: getFrameWidthForMaxHeight(baseRatio, orientation, MODAL_FRAME_MAX_HEIGHT_VH),
            }}
          >
            <iframe
              className="absolute inset-0 h-full w-full border-0"
              src={resolvedPlayableUrl}
              title={`${game.title} - ${playable.title ?? playable.label} fullscreen`}
              allow="autoplay; fullscreen; gamepad; clipboard-read; clipboard-write"
              sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms allow-popups allow-modals"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            />

            {(isLoading || hasError) && (
              <PlayableStatusOverlay hasError={hasError} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WorksPage() {
  const initialGame = playableGames[0];
  const initialPlayable = initialGame?.playables[0];
  const [expandedGameId, setExpandedGameId] = useState<string | null>(initialGame?.id ?? null);
  const [selectedPlayable, setSelectedPlayable] = useState<SelectedPlayableState | null>(
    initialGame && initialPlayable
      ? { gameId: initialGame.id, playableId: initialPlayable.id, variantId: getDefaultVariantId(initialPlayable) }
      : null
  );
  const [baseRatio, setBaseRatio] = useState<BaseRatio>(DEFAULT_RATIO);
  const [orientation, setOrientation] = useState<Orientation>(DEFAULT_ORIENTATION);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [modalBaseRatio, setModalBaseRatio] = useState<BaseRatio>(DEFAULT_RATIO);
  const [modalOrientation, setModalOrientation] = useState<Orientation>(DEFAULT_ORIENTATION);
  const [modalVariantId, setModalVariantId] = useState<string | undefined>(undefined);

  const activeGame = useMemo(
    () => playableGames.find((game) => game.id === selectedPlayable?.gameId),
    [selectedPlayable]
  );

  const activePlayable = useMemo(
    () => activeGame?.playables.find((playable) => playable.id === selectedPlayable?.playableId),
    [activeGame, selectedPlayable]
  );

  const activeVariant = useMemo(
    () => getSelectedVariant(activePlayable, selectedPlayable?.variantId),
    [activePlayable, selectedPlayable]
  );

  const activePlayableUrl = useMemo(
    () => resolvePlayableUrl(activePlayable, selectedPlayable?.variantId),
    [activePlayable, selectedPlayable]
  );

  const modalVariant = useMemo(
    () => getSelectedVariant(activePlayable, modalVariantId),
    [activePlayable, modalVariantId]
  );

  const modalPlayableUrl = useMemo(
    () => resolvePlayableUrl(activePlayable, modalVariantId),
    [activePlayable, modalVariantId]
  );

  function selectGame(game: PlayableGame) {
    setExpandedGameId((current) => (current === game.id ? null : game.id));
  }

  function selectPlayable(game: PlayableGame, playable: PlayableItem) {
    setSelectedPlayable({
      gameId: game.id,
      playableId: playable.id,
      variantId: getDefaultVariantId(playable),
    });
  }

  function selectVariant(variantId: string) {
    setSelectedPlayable((current) => current ? { ...current, variantId } : current);
  }

  function openFullscreen() {
    if (!activePlayable || !activePlayableUrl) return;

    setModalBaseRatio(baseRatio ?? DEFAULT_RATIO);
    setModalOrientation(orientation ?? DEFAULT_ORIENTATION);
    setModalVariantId(selectedPlayable?.variantId ?? getDefaultVariantId(activePlayable));
    setIsFullscreenOpen(true);
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-mono flex flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 min-w-0 md:ml-80">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-[#8b8aef]">
                Playables
              </h1>
              <p className="mt-2 text-lg text-white/50">
                Playable Ads & Interactive Experiences
              </p>
            </div>
          </div>

          <div className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[350px_minmax(0,1fr)]">
            <section className="space-y-4">
              <div className="px-2 text-xs font-bold uppercase tracking-wider text-[#8b8aef]">Library</div>
              <div className="custom-scrollbar grid max-h-[45vh] gap-2 overflow-y-auto pr-2 lg:max-h-[70vh]">
                {playableGames.map((game) => {
                  const isExpanded = expandedGameId === game.id;
                  const isActive = selectedPlayable?.gameId === game.id;

                  return (
                    <div key={game.id} className="flex flex-col">
                      <button
                        onClick={() => selectGame(game)}
                        className={`
                          group flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#8b8aef]/50
                          ${isActive
                            ? "border-[#8b8aef]/50 bg-[#8b8aef]/10 shadow-[0_0_20px_rgba(139,138,239,0.1)]"
                            : "border-white/5 bg-black/40 hover:border-[#8b8aef]/25 hover:bg-white/5"}
                        `}
                      >
                        <GameIcon
                          game={game}
                          className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-inner transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                        />

                        <div className="min-w-0 flex-1">
                          <div className={`truncate text-sm font-bold ${isActive ? "text-white" : "text-white/70"}`}>
                            {game.title}
                          </div>
                          <div className="mt-1 text-[10px] text-white/30">
                            {game.playables.length} playable{game.playables.length > 1 ? "s" : ""}
                          </div>
                        </div>

                        <svg
                          className={`h-4 w-4 shrink-0 text-[#8b8aef] transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {isExpanded && (
                        <div className="ml-4 mt-2 border-l border-white/10 pl-3">
                          {game.playables.length === 0 && (
                            <div className="rounded-xl border border-dashed border-white/10 bg-black/20 px-3 py-3 text-xs font-bold uppercase tracking-widest text-white/25">
                              No playables added yet.
                            </div>
                          )}

                          {game.playables.length > 0 && (
                            <div
                              className="grid justify-center gap-1.5"
                              style={{
                                gridTemplateColumns: `repeat(${getFoldoutColumnCount(game.playables.length)}, minmax(3rem, 3.5rem))`,
                              }}
                            >
                              {game.playables.map((playable, index) => {
                                const playableActive = selectedPlayable?.playableId === playable.id && selectedPlayable?.gameId === game.id;

                                return (
                                  <button
                                    key={playable.id}
                                    onClick={() => selectPlayable(game, playable)}
                                    className={`
                                      flex min-h-12 flex-col items-center justify-center rounded-lg border px-1.5 py-1.5 text-center text-xs font-bold transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#8b8aef]/50
                                      ${playableActive
                                        ? "border-[#8b8aef]/40 bg-[#8b8aef]/15 text-white shadow-[0_0_18px_rgba(139,138,239,0.08)]"
                                        : "border-white/5 bg-black/20 text-white/50 hover:border-[#8b8aef]/25 hover:bg-white/5 hover:text-white/80"}
                                    `}
                                  >
                                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-[10px] ${playableActive ? "border-[#8b8aef]/35 text-[#8b8aef]" : "border-white/10 text-white/35"}`}>
                                      {index + 1}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            <PlayableTestFrame
              game={activeGame}
              playable={activePlayable}
              playableUrl={activePlayableUrl}
              selectedVariant={activeVariant}
              selectedVariantId={selectedPlayable?.variantId}
              onSelectVariant={selectVariant}
              baseRatio={baseRatio}
              orientation={orientation}
              setBaseRatio={setBaseRatio}
              setOrientation={setOrientation}
              onOpenFullscreen={openFullscreen}
            />
          </div>
        </div>
      </div>

      {isFullscreenOpen && activeGame && activePlayable && (
        <PlayableFullscreenModal
          game={activeGame}
          playable={activePlayable}
          playableUrl={modalPlayableUrl}
          selectedVariant={modalVariant}
          selectedVariantId={modalVariantId}
          onSelectVariant={setModalVariantId}
          baseRatio={modalBaseRatio}
          orientation={modalOrientation}
          setBaseRatio={setModalBaseRatio}
          setOrientation={setModalOrientation}
          onClose={() => setIsFullscreenOpen(false)}
        />
      )}
    </main>
  );
}
