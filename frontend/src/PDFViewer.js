import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const PDFViewer = ({ page }) => {
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);
  const [renderTask, setRenderTask] = useState(null);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const pdf = await pdfjsLib.getDocument('/sample.pdf').promise;
        const pageObj = await pdf.getPage(page);

        const scale = 1.5;
        const viewport = pageObj.getViewport({ scale });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const context = canvas.getContext('2d');
        if (!context) {
          throw new Error('Cannot get canvas context');
        }

        const task = pageObj.render({ canvasContext: context, viewport });
        setRenderTask(task);
        await task.promise;
        setRenderTask(null);
      } catch (err) {
        setError('Error loading PDF: ' + err.message);
      }
    };

    loadPDF();

    return () => {
      if (renderTask) {
        renderTask.cancel();
        setRenderTask(null);
      }
      setError(null);
    };
  }, [page]);

  if (error) {
    return <div>{error}</div>;
  }

  return <canvas ref={canvasRef}></canvas>;
};

export default PDFViewer;