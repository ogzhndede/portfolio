"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { creatives, type CreativeItem } from "@/data/creatives";
import { publicAssetPath } from "@/lib/paths";

function CreativePlaceholder() {
  return (
    <div className="flex aspect-video h-full w-full flex-col items-center justify-center gap-3 bg-black/40 px-4 text-center text-xs font-bold uppercase tracking-widest text-white/25">
      <svg className="h-10 w-10 text-white/15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.55-2.28A1 1 0 0121 8.62v6.76a1 1 0 01-1.45.9L15 14M5 6h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
      </svg>
      Video preview
    </div>
  );
}

function GameGroupHeading({
  title,
  icon,
  count,
}: {
  title: string;
  icon?: string;
  count: number;
}) {
  if (!title && !icon) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4">
      <div className="flex min-w-0 items-center gap-3">
        {icon ? (
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <Image
              src={publicAssetPath(icon)}
              alt={`${title} icon`}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[9px] font-bold uppercase text-white/25">
            Ad
          </div>
        )}
        <h2 className="truncate text-base font-bold uppercase tracking-wider text-[#8b8aef] md:text-lg">
          {title}
        </h2>
      </div>
      <div className="hidden h-px flex-1 bg-white/10 sm:block" />
      <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">
        {count} creative{count === 1 ? "" : "s"}
      </span>
    </div>
  );
}

function CreativeCard({
  creative,
  onSelect,
}: {
  creative: CreativeItem;
  onSelect: (creative: CreativeItem) => void;
}) {
  const [hasVideoError, setHasVideoError] = useState(false);

  return (
    <article
      onClick={() => onSelect(creative)}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/5 bg-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-[#8b8aef]/40 hover:bg-[#8b8aef]/5 hover:shadow-[0_0_30px_rgba(139,138,239,0.08)] focus-within:border-[#8b8aef]/40 focus-within:bg-[#8b8aef]/5"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-white/5">
        {!creative.videoUrl ? (
          <CreativePlaceholder />
        ) : hasVideoError ? (
          <div className="flex h-full w-full items-center justify-center bg-black/50 px-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-white/40">
            Failed to load creative video.
          </div>
        ) : (
          <video
            className="h-full w-full bg-black object-cover"
            src={publicAssetPath(creative.videoUrl)}
            poster={creative.thumbnail ? publicAssetPath(creative.thumbnail) : undefined}
            muted
            playsInline
            preload="metadata"
            controls
            onClick={(event) => event.stopPropagation()}
            onError={() => setHasVideoError(true)}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onSelect(creative);
          }}
          className="mt-auto rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white/60 transition hover:border-[#8b8aef]/40 hover:bg-[#8b8aef]/10 hover:text-[#8b8aef] focus:outline-none focus:ring-1 focus:ring-[#8b8aef]/50"
        >
          View Creative
        </button>
      </div>

      <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#8b8aef]/0 via-[#8b8aef]/60 to-[#8b8aef]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </article>
  );
}

function CreativeModal({
  creative,
  onClose,
}: {
  creative: CreativeItem;
  onClose: () => void;
}) {
  const [hasVideoError, setHasVideoError] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    setHasVideoError(false);
  }, [creative.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 font-mono backdrop-blur-md sm:p-4">
      <div className="flex max-h-[94vh] w-full max-w-6xl flex-col rounded-3xl border border-white/10 bg-[#0a0a0a] p-3 shadow-2xl sm:p-4 md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="min-w-0">
            <div className="truncate text-lg font-bold text-white">{creative.title}</div>
            {creative.gameTitle && (
              <div className="mt-1 truncate text-xs font-bold uppercase tracking-wider text-[#8b8aef]">
                {creative.gameTitle}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#8b8aef]/30 bg-[#8b8aef]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#8b8aef] transition hover:bg-[#8b8aef]/20 hover:text-white focus:outline-none focus:ring-1 focus:ring-[#8b8aef]/50"
          >
            Close
          </button>
        </div>

        <div className="min-h-0 rounded-2xl border border-white/5 bg-black/40 p-3 shadow-inner md:p-6">
          {!creative.videoUrl ? (
            <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-black/60 px-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              Creative video is not configured.
            </div>
          ) : hasVideoError ? (
            <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-black/60 px-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              Failed to load creative video.
            </div>
          ) : (
            <video
              className="max-h-[72vh] w-full rounded-2xl bg-black object-contain"
              src={publicAssetPath(creative.videoUrl)}
              poster={creative.thumbnail ? publicAssetPath(creative.thumbnail) : undefined}
              controls
              autoPlay
              muted
              playsInline
              onError={() => setHasVideoError(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function CreativesPage() {
  const [selectedCreative, setSelectedCreative] = useState<CreativeItem | null>(null);
  const creativeGroups = creatives.reduce<Array<{ title: string; icon?: string; items: CreativeItem[] }>>((groups, creative) => {
    const title = creative.gameTitle || "Ungrouped";
    const existingGroup = groups.find((group) => group.title === title);

    if (existingGroup) {
      existingGroup.items.push(creative);
      if (!existingGroup.icon && creative.gameIcon) existingGroup.icon = creative.gameIcon;
      return groups;
    }

    groups.push({
      title,
      icon: creative.gameIcon,
      items: [creative],
    });

    return groups;
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-mono flex flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 min-w-0 md:ml-80">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          <div className="border-b border-white/10 pb-6 mb-10">
            <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-[#8b8aef]">
              Creatives
            </h1>
            <p className="mt-2 text-lg text-white/50">
              Short ad videos & marketing cuts
            </p>
          </div>

          {creatives.length > 0 ? (
            <div className="space-y-12">
              {creativeGroups.map((group) => (
                <section key={group.title} className="space-y-5">
                  <GameGroupHeading title={group.title} icon={group.icon} count={group.items.length} />
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {group.items.map((creative) => (
                      <CreativeCard
                        key={creative.id}
                        creative={creative}
                        onSelect={setSelectedCreative}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-black/30 p-8 text-center">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/35">
                No creatives added yet.
              </div>
              <p className="mt-2 text-sm text-white/25">
                Add MP4 files under public/videos/creatives and register them in the creatives data file.
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedCreative && (
        <CreativeModal
          creative={selectedCreative}
          onClose={() => setSelectedCreative(null)}
        />
      )}
    </main>
  );
}
