"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // Yeni eklendi
import Sidebar from "@/components/Sidebar";

// PDF Viewer'ı SSR kapalı (sadece client-side) olarak çağırıyoruz
const PdfViewer = dynamic(() => import("../../components/pdfviewer"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-20 font-mono">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-[#8b8aef]" />
    <p className="mt-4 text-[#8b8aef] uppercase tracking-widest text-xs font-bold">Loading PDF...</p>
  </div>
);

export default function CvPage() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const pdfUrl = "/cv/CV.pdf";

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openInNewTab = () => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-mono flex">
      <Sidebar title="Oğuz Han Dede" imageSrc="/ben.png" />

      <div className="flex-1 md:ml-80">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          
          <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-6 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-[#8b8aef]">
                Resume
              </h1>
              <p className="mt-2 text-lg text-white/50">Professional Experience & Skills</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">
            {/* PDF Kontrolleri */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 p-1">
                  <button onClick={() => setScale(scale - 0.2)} disabled={scale <= 0.6} className="rounded-md px-3 py-1.5 text-white/70 transition hover:bg-white/10 disabled:opacity-30">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                  </button>
                  <span className="min-w-[60px] text-center text-sm font-bold text-[#8b8aef]">{Math.round(scale * 100)}%</span>
                  <button onClick={() => setScale(scale + 0.2)} disabled={scale >= 2} className="rounded-md px-3 py-1.5 text-white/70 transition hover:bg-white/10 disabled:opacity-30">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1} className="rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-sm transition hover:text-[#8b8aef] disabled:opacity-30">←</button>
                  <span className="text-sm text-white/50 font-bold"><span className="text-white">{pageNumber}</span> / {numPages || '?'}</span>
                  <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= (numPages || 0)} className="rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-sm transition hover:text-[#8b8aef] disabled:opacity-30">→</button>
                </div>
              </div>
            </div>

            {/* PDF Render Alanı */}
            <div className="flex justify-center overflow-auto rounded-xl bg-black/40 p-4 border border-white/5 shadow-inner">
              {isClient && (
                <PdfViewer
                  url={pdfUrl}
                  scale={scale}
                  pageNumber={pageNumber}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loadingComponent={<LoadingSpinner />}
                />
              )}
            </div>

            {/* Thumbnail Navigasyonu */}
            {numPages && numPages > 1 && (
              <div className="mt-6">
                <div className="flex gap-3 overflow-auto pb-2">
                  {Array.from(new Array(numPages), (_, index) => (
                    <button
                      key={`page-${index + 1}`}
                      onClick={() => setPageNumber(index + 1)}
                      className={`relative h-16 w-12 shrink-0 overflow-hidden rounded-lg border-2 transition ${pageNumber === index + 1 ? 'border-[#8b8aef] bg-[#8b8aef]/20' : 'border-white/10 bg-black/40'}`}
                    >
                      <span className="flex h-full w-full items-center justify-center text-xs font-bold text-white">{index + 1}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* İndirme Butonu */}
          <div className="mt-12 flex justify-center relative">
            <div className="relative flex flex-col items-center">
              {showDownloadMenu && (
                <div className="absolute bottom-full mb-4 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl z-50">
                  <button onClick={() => { downloadPDF(); setShowDownloadMenu(false); }} className="flex w-full items-center gap-3 px-4 py-3 text-left text-xs font-bold hover:bg-[#8b8aef]/10 text-white/70 hover:text-[#8b8aef]">
                    Download as PDF
                  </button>
                  <button onClick={() => { openInNewTab(); setShowDownloadMenu(false); }} className="flex w-full items-center gap-3 px-4 py-3 text-left text-xs font-bold hover:bg-[#8b8aef]/10 text-white/70 hover:text-[#8b8aef] border-t border-white/5">
                    Open in New Tab
                  </button>
                </div>
              )}
              <button onClick={() => setShowDownloadMenu(!showDownloadMenu)} className="group flex items-center gap-3 rounded-xl bg-[#8b8aef] px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95">
                DOWNLOAD RESUME
                <svg className={`h-4 w-4 transition-transform ${showDownloadMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}