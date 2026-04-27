"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import { publicAssetPath } from "@/lib/paths";

const RESUME_PATH = "/files/Oguz_Han_Dede_Resume.pdf";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-20 font-mono">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-[#8b8aef]" />
    <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#8b8aef]">Loading PDF...</p>
  </div>
);

const PdfViewer = dynamic(() => import("../../components/pdfviewer"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function CvPage() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [isClient, setIsClient] = useState(false);
  const [pdfFailed, setPdfFailed] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const pdfUrl = publicAssetPath(RESUME_PATH);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setPdfFailed(false);
    setNumPages(numPages);
    setPageNumber(1);
  }

  function downloadPDF() {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Oguz_Han_Dede_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-mono flex flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 min-w-0 md:ml-80">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-6 mb-8 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-[#8b8aef]">
                Resume
              </h1>
              <p className="mt-2 text-lg text-white/50">Professional Experience & Skills</p>
            </div>

            <button
              onClick={downloadPDF}
              className="group flex w-full items-center justify-center gap-3 rounded-xl border border-[#8b8aef]/40 bg-[#8b8aef] px-6 py-3 font-bold text-white shadow-lg shadow-[#8b8aef]/10 transition-all hover:-translate-y-0.5 hover:bg-[#7776df] focus:outline-none focus:ring-2 focus:ring-[#8b8aef]/50 active:translate-y-0 sm:w-auto"
            >
              Download Resume
            </button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-2xl sm:p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 p-1">
                  <button
                    onClick={() => setScale((current) => Math.max(0.6, current - 0.2))}
                    disabled={scale <= 0.6}
                    className="rounded-md px-3 py-1.5 text-white/70 transition hover:bg-white/10 disabled:opacity-30"
                    aria-label="Zoom out"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="min-w-[60px] text-center text-sm font-bold text-[#8b8aef]">{Math.round(scale * 100)}%</span>
                  <button
                    onClick={() => setScale((current) => Math.min(2, current + 0.2))}
                    disabled={scale >= 2}
                    className="rounded-md px-3 py-1.5 text-white/70 transition hover:bg-white/10 disabled:opacity-30"
                    aria-label="Zoom in"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPageNumber((current) => Math.max(1, current - 1))}
                    disabled={pageNumber <= 1 || pdfFailed}
                    className="rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-sm transition hover:text-[#8b8aef] disabled:opacity-30"
                    aria-label="Previous page"
                  >
                    ←
                  </button>
                  <span className="text-sm text-white/50 font-bold"><span className="text-white">{pageNumber}</span> / {numPages || "?"}</span>
                  <button
                    onClick={() => setPageNumber((current) => Math.min(numPages || current, current + 1))}
                    disabled={pageNumber >= (numPages || 0) || pdfFailed}
                    className="rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-sm transition hover:text-[#8b8aef] disabled:opacity-30"
                    aria-label="Next page"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            <div className="flex min-h-[420px] max-w-full justify-start overflow-auto rounded-xl bg-black/40 p-3 border border-white/5 shadow-inner sm:justify-center sm:p-4 md:min-h-[500px]">
              {pdfFailed ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center px-4 text-center">
                  <div className="text-sm font-bold uppercase tracking-widest text-white/50">
                    Failed to load PDF file.
                  </div>
                  <p className="mt-3 max-w-sm text-sm text-white/30">
                    The download button remains available above.
                  </p>
                </div>
              ) : (
                isClient && (
                  <PdfViewer
                    url={pdfUrl}
                    scale={scale}
                    pageNumber={pageNumber}
                    onDocumentLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={() => setPdfFailed(true)}
                    loadingComponent={<LoadingSpinner />}
                  />
                )
              )}
            </div>

            {numPages && numPages > 1 && !pdfFailed && (
              <div className="mt-6">
                <div className="flex gap-3 overflow-auto pb-2">
                  {Array.from(new Array(numPages), (_, index) => (
                    <button
                      key={`page-${index + 1}`}
                      onClick={() => setPageNumber(index + 1)}
                      className={`relative h-16 w-12 shrink-0 overflow-hidden rounded-lg border-2 transition ${pageNumber === index + 1 ? "border-[#8b8aef] bg-[#8b8aef]/20" : "border-white/10 bg-black/40"}`}
                    >
                      <span className="flex h-full w-full items-center justify-center text-xs font-bold text-white">{index + 1}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
