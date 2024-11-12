# PDF Viewer with Auto Sync

This project implements a PDF viewer that allows synchronization between two users (admin and regular viewer) through a socket connection. The admin can change the page, and the changes will be reflected on the viewer's side in real time.

## Features

- Real-time page synchronization between admin and viewers.
- Admin can change the page via the UI, and the change is reflected instantly on viewers' pages.
- Built using React (frontend), Express (backend), and Socket.io for real-time communication.

## Getting Started

Add any pdf file in /Pdf-viewer-Autosync/frontend/public/{yourpdf} #The extension should be .pdf, no need add extra .pdf at the end! --------Rename your pdf as "sample.pdf" (!IMP!,witout the commas" ")-------------

To get started, you need to set up both the frontend and backend of the application.

### Easy way to setup and run:
1. Do chmod +x run.sh and also chmod +x start-server.sh
2. ./run.sh
3. Done!
4. When you stop servers and want to run them back, do ./start-servers.sh
5. Make sure you are in the roor folder for doing any of the above commands

### 1. Install Dependencies

1. **Install Dependencies for Backend**
   - Navigate to the backend folder and install the required dependencies.

cd backend
npm install

2. **Install Dependencies for Frontend**
- Navigate to the frontend folder and install the required dependencies.

cd frontend
npm install

### 2. Start the Application

- **Start the Frontend** (React App)
Navigate to the frontend folder and run:

npm start

This will start the React development server on `http://localhost:3000`.

- **Start the Backend** (Express + Socket.io)
Navigate to the backend folder and run:

npm run dev

This will start the Express server on `http://localhost:5000`.

### 3. Testing the Autosync Feature

- Open two different browser windows or tabs.
- **Admin Window**: Go to `http://localhost:3000/?isAdmin=true`.
- **Viewer Window**: Go to `http://localhost:3000/?isAdmin=false`.
- The admin can now change the page of the PDF in the admin window, and the changes will be reflected in the viewer window in real time.

### 4. To sync across several devices on same network:
- wait for the front-end to start and display this:

![alt text](image-1.png)

- In my case, local ip address is http://172.18.113.138:3000
- on the pc that's running the server, http://172.18.113.138:3000/?isAdmin=true
- on devices connected to your network go to http://172.18.113.138:3000/?isAdmin=false
- CORS is setup to automatically fetch your local ip adress and allow traffic and send information between your networks!

### 4. Stop the Servers

- To stop the frontend server, press `Ctrl + C` in the frontend terminal.
- To stop the backend server, press `Ctrl + C` in the backend terminal.

## Technologies Used

### Frontend

- React
- React Hooks (`useState`, `useEffect`, etc.)
- Socket.io client (`socket.io-client`)
- PDF.js for rendering PDFs in the browser

### Backend

- Express.js
- Socket.io for real-time communication

## Folder Structure

![alt text](image.png)