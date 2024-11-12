import React, { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import PDFViewer from './PDFViewer';


const socket = io('http://localhost:5000'); 

const App = () => {
  const [page, setPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isAdminFromUrl = urlParams.get('isAdmin') === 'true';
    setIsAdmin(isAdminFromUrl);
  }, []);


  useEffect(() => {
    socket.on('sync-page', (newPage) => {
      setPage(newPage);
    });

    return () => {
      socket.off('sync-page'); 
    };
  }, []);

  const changePage = (newPage) => {
    if (isAdmin) {
      socket.emit('change-page', newPage);  
    }
    setPage(newPage);
  };

  return (
    <div className="App">
      <h1>PDF Co-Viewer</h1>
      <button onClick={() => changePage(page - 1)}>Previous</button>
      <button onClick={() => changePage(page + 1)}>Next</button>
      <PDFViewer page={page} />
    </div>
  );
};

export default App;
