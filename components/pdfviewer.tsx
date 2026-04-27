"use client";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type PdfViewerProps = {
  url: string;
  scale: number;
  pageNumber: number;
  onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
  onLoadError: () => void;
  loadingComponent?: React.ReactNode;
};

export default function PdfViewer({
  url,
  scale,
  pageNumber,
  onDocumentLoadSuccess,
  onLoadError,
  loadingComponent,
}: PdfViewerProps) {
  return (
    <Document
      file={url}
      onLoadSuccess={onDocumentLoadSuccess}
      onLoadError={onLoadError}
      loading={loadingComponent ?? <div className="text-white">Loading PDF...</div>}
      error={<div className="text-white/70">Failed to load PDF file.</div>}
    >
      <Page
        pageNumber={pageNumber}
        scale={scale}
        renderTextLayer
        renderAnnotationLayer
      />
    </Document>
  );
}
