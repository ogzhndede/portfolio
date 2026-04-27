"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigationItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { socialLinks, type SocialLink } from "@/data/socialLinks";
import { publicAssetPath } from "@/lib/paths";

function SocialIcon({ id }: { id: SocialLink["id"] }) {
  if (id === "linkedin") {
    return (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }

  if (id === "email") {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
      </svg>
    );
  }

  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

export default function Sidebar({
  title = profile.name,
  imageSrc = profile.profileImage,
}: {
  title?: string;
  imageSrc?: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <div className="flex flex-col gap-3 mt-8 w-full px-4">
      {navigationItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className={`
              block w-full rounded-2xl border px-6 py-4 text-left text-sm font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#8b8aef]/50
              ${active
                ? "border-[#8b8aef]/50 bg-[#8b8aef]/10 text-white shadow-[0_0_20px_rgba(139,138,239,0.1)] translate-x-1"
                : "border-white/5 bg-transparent text-white/40 hover:border-[#8b8aef]/25 hover:bg-white/5 hover:text-white/80"}
            `}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );

  const SocialLinks = () => (
    <div className="flex items-center justify-center gap-4 py-6">
      {socialLinks.map((social) => (
        <a
          key={social.id}
          href={social.url}
          target={social.url.startsWith("mailto:") ? undefined : "_blank"}
          rel={social.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          className="group relative rounded-xl border border-white/5 bg-white/5 p-3 text-white/40 transition-all duration-300 hover:-translate-y-1 hover:border-[#8b8aef]/40 hover:bg-[#8b8aef]/10 hover:text-[#8b8aef] focus:outline-none focus:ring-1 focus:ring-[#8b8aef]/50"
          aria-label={social.label}
        >
          <SocialIcon id={social.id} />
        </a>
      ))}
    </div>
  );

  const ProfileBlock = () => (
    <div className="flex flex-col items-center text-center px-6">
      <div className="group relative h-32 w-32 overflow-hidden rounded-[2.5rem] border-2 border-[#8b8aef]/20 bg-gradient-to-b from-[#8b8aef]/10 to-transparent p-1 shadow-2xl transition-transform duration-500 hover:scale-105">
        <div className="relative h-full w-full overflow-hidden rounded-[2.3rem]">
          <Image src={publicAssetPath(imageSrc)} alt={title} fill className="object-cover" />
        </div>
      </div>
      <div className="mt-6 text-xl font-bold uppercase tracking-tighter text-white">
        {title}
      </div>
      <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b8aef]">
        {profile.title}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="sticky top-0 z-40 flex w-full items-center justify-between gap-3 border-b border-white/10 bg-[#0a0a0a]/90 font-mono px-4 py-4 backdrop-blur-xl md:hidden">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/20">
            <Image src={publicAssetPath(imageSrc)} alt={title} fill className="object-cover" />
          </div>
          <div className="truncate text-sm font-bold tracking-tighter uppercase text-white">{title}</div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/80 transition-all hover:border-[#8b8aef]/30 hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-[#8b8aef]/50"
        >
          Menu
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:block md:w-80 md:border-r md:border-white/10 md:bg-[#0a0a0a] md:font-mono">
        <div className="flex h-full flex-col items-center justify-between py-12">
          <div className="w-full">
            <ProfileBlock />
            <NavLinks />
          </div>

          <div className="w-full">
            <SocialLinks />
            <div className="text-center text-[10px] font-bold uppercase tracking-widest text-white/20">
              © {new Date().getFullYear()} • {profile.location}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden font-mono">
          <button
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          <div className="absolute left-0 top-0 flex h-full w-[86vw] max-w-80 flex-col overflow-y-auto border-r border-white/10 bg-[#0a0a0a] p-6 animate-in slide-in-from-left duration-300 sm:p-8">
            <div className="flex items-center justify-between mb-12">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b8aef]">Navigation</div>
              <button
                onClick={() => setOpen(false)}
                className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="flex flex-1 flex-col">
              <ProfileBlock />
              <NavLinks onClick={() => setOpen(false)} />
            </div>

            <div className="mt-auto">
              <SocialLinks />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
