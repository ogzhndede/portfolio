"use client";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
// @ts-ignore
import "react-pdf/dist/Page/AnnotationLayer.css";
// @ts-ignore
import "react-pdf/dist/Page/TextLayer.css";

// Worker ayarını sadece client-side'da yap
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
}

export default function PdfViewer({ url, scale, pageNumber, onDocumentLoadSuccess }: any) {
  return (
    <Document
      file={url}
      onLoadSuccess={onDocumentLoadSuccess}
      loading={<div className="text-white">Loading PDF...</div>}
    >
      <Page
        pageNumber={pageNumber}
        scale={scale}
        renderTextLayer={true}
        renderAnnotationLayer={true}
      />
    </Document>
  );
}