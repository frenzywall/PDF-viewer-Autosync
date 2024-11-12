#!/bin/bash

GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'  


clear


echo -e "${YELLOW}Starting frontend server...${NC}"
cd frontend
npm start &
echo -e "${GREEN}Frontend server started successfully!${NC}"


cd ../backend
echo -e "${YELLOW}Starting backend server...${NC}"
npm run dev &
echo -e "${GREEN}Backend server started successfully!${NC}"


wait

