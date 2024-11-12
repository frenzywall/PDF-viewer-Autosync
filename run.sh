#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'  

clear

echo -e "${BLUE}Starting the application...${NC}"
sleep 1

echo -e "${YELLOW}Installing project dependencies...${NC}"
npm install
echo -e "${GREEN}Dependencies installed successfully!${NC}"
clear
sleep 1

echo -e "\n${YELLOW}Installing backend dependencies...${NC}"
cd backend
npm install
echo -e "${GREEN}Backend initialized successfully!${NC}"
sleep 2
clear

echo -e "\n${YELLOW}Installing frontend dependencies...${NC}"
cd ../frontend
npm install
echo -e "${GREEN}Frontend initialized successfully!${NC}"
sleep 2
clear

echo -e "\n${YELLOW}Starting frontend server...${NC}"
npm start &
echo -e "${GREEN}Frontend started successfully!${NC}"
sleep 1

cd ../backend
echo -e "\n${YELLOW}Starting backend server...${NC}"
npm run dev
echo -e "${GREEN}Backend started successfully!${NC}"
