import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from 'lucide-react';

// Set the worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  file: File | string;
  onClose: () => void;
}

export default function PDFViewer({ file, onClose }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function changePage(offset: number) {
    if (numPages === null) return;
    
    const newPage = pageNumber + offset;
    if (newPage >= 1 && newPage <= numPages) {
      setPageNumber(newPage);
    }
  }

  function zoomIn() {
    if (scale < 2.0) {
      setScale(prevScale => parseFloat((prevScale + 0.1).toFixed(1)));
    }
  }

  function zoomOut() {
    if (scale > 0.5) {
      setScale(prevScale => parseFloat((prevScale - 0.1).toFixed(1)));
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">LinkedIn Profile PDF</h3>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={zoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm">{(scale * 100).toFixed(0)}%</span>
            <Button variant="outline" size="sm" onClick={zoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            
            {typeof file !== 'string' && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  const url = URL.createObjectURL(file);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = file.name;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            )}
            
            <Button variant="default" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
        
        <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-800 overflow-x-auto">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="text-center p-4">Loading PDF...</div>}
            error={<div className="text-center p-4 text-red-500">Failed to load PDF</div>}
          >
            <Page 
              pageNumber={pageNumber} 
              scale={scale} 
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
        
        {numPages && (
          <div className="flex justify-between items-center mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => changePage(-1)} 
              disabled={pageNumber <= 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            
            <p className="text-sm">
              Page {pageNumber} of {numPages}
            </p>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => changePage(1)} 
              disabled={numPages === null || pageNumber >= numPages}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
