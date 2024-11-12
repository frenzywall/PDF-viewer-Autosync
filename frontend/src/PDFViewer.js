import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry'; 


pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const PDFViewer = ({ page }) => {
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPDF = async () => {
      try {

        const pdf = await pdfjsLib.getDocument('/sample.pdf').promise;

        const pageObj = await pdf.getPage(page);

        const scale = 1.5;
        const viewport = pageObj.getViewport({ scale });

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await pageObj.render({ canvasContext: context, viewport }).promise;
      } catch (err) {
     
        setError('Error loading PDF: ' + err.message);
      }
    };

    loadPDF();
  }, [page]); 

  if (error) {
    return <div>{error}</div>; 
  }

  return <canvas ref={canvasRef}></canvas>;
};

export default PDFViewer;
