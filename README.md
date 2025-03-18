# Blockchain-Based Task Manager

## Overview
The Blockchain-Based Task Manager is a decentralized application (dApp) that allows users to create, manage, and track tasks on the Ethereum blockchain. Tasks are stored in a smart contract, ensuring transparency, immutability, and security. The frontend is built with React and interacts with the smart contract using Ethers.js.

**Backend Repository**: The backend code for this project (smart contract) is available [here](https://github.com/nagpalagam/BlockchainTaskManager).

## Features
- **Add Tasks**: Users can add tasks with a title and description.
- **Edit Tasks**: Task owners can update task details.
- **Mark Tasks as Completed**: Task owners can mark tasks as completed.
- **Delete Tasks**: Task owners can delete their tasks.
- **View All Tasks**: Users can view all tasks stored on the blockchain.
- **Access Control**: Only the task owner can modify or delete their tasks.

## Technologies Used
- **Smart Contract**: Solidity, Ethereum, OpenZeppelin
- **Frontend**: React, Ethers.js
- **Development Tools**: Hardhat, MetaMask
- **Deployment**: Sepolia Testnet, Vercel/Netlify (for frontend)

## Project Structure
task-manager/ ├── contracts/ │ └── TaskManager.sol # Smart contract code ├── scripts/ │ └── deploy.js # Deployment script ├── test/ │ └── TaskManager.test.js # Smart contract tests ├── task-manager-frontend/ # React frontend │ ├── src/ │ │ ├── App.js # Main React component │ │ ├── index.js # Entry point │ │ └── artifacts/ # ABI and contract artifacts │ ├── package.json # Frontend dependencies │ └── public/ # Static assets ├── hardhat.config.js # Hardhat configuration ├── .env # Environment variables ├── .gitignore # Git ignore rules └── README.md # Project documentation

## Prerequisites
Before running the project, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MetaMask** (browser extension)
- **Git**

## Setup Instructions

## 2. Install Dependencies

### Backend (Smart Contract)
Setup Instructions
1. **Clone the Repository**

git clone https://github.com/nagpalagam/BlockchainTaskManager.git

cd BlockchainTaskManager


2. **Install Dependencies**

Backend (Smart Contract)

Navigate to the project root:

cd BlockchainTaskManager


Install dependencies:

npm install

Frontend

Navigate to the frontend folder:

cd task-manager-frontend

Install dependencies:

npm install

3. **Configure Environment Variables**

Create a .env file in the project root:

touch .env

Add the following variables:

SEPOLIA_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID

PRIVATE_KEY=YOUR_PRIVATE_KEY
Replace YOUR_INFURA_PROJECT_ID with your Infura project ID.


Replace YOUR_PRIVATE_KEY with your wallet’s private key.

4. **Compile the Smart Contract**

Run the following command to compile the smart contract:


npx hardhat compile

5. **Deploy the Smart Contract**

Deploy the contract to the Sepolia Testnet:

npx hardhat run scripts/deploy.js --network sepolia

Save the contract address from the console output for the frontend.

6. **Run the Frontend**

Navigate to the frontend folder:

cd task-manager-frontend

Update the contract address in App.js:


const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

Start the React app:

npm start

Usage

Connect MetaMask:

Open the app in your browser.

Connect your MetaMask wallet to the Sepolia Testnet.

Add a Task:

Enter a title and description, then click "Add Task."

Edit a Task:

Click the "Edit" button next to a task and update the details.

Mark a Task as Completed:

Click the "Complete" button next to a task.

Delete a Task:

Click the "Delete" button next to a task.

View All Tasks:

All tasks will be displayed on the homepage.

Testing

To run the smart contract tests

npx hardhat test

Deployment

Smart Contract

The contract is deployed on the Sepolia Testnet. Verify it on 

Sepolia Etherscan.

Frontend

Deploy to Vercel:

npm install -g vercel

vercel

Or drag-and-drop the task-manager-frontend folder to Netlify.


Create a branch:



git checkout -b feature/your-feature

Commit changes:


git commit -m "Add your feature"

Push and open a pull request.

License

MIT License. See LICENSE.


**Contact**

**Name: Agam Nagpal**

Email: nagpalagam2003@gmail.com

GitHub: nagpalagam


**Acknowledgments**
OpenZeppelin, Hardhat, and Ethers.js for tools and libraries.



