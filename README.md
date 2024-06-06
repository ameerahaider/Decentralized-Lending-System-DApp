# Decentralized Lending System DApp

## Overview
The Lending System DApp is designed to facilitate lending and borrowing transactions using smart contracts on the Ethereum blockchain. This project demonstrates the functionality of a decentralized lending platform with a fixed interest model.

## Features
- Transparent and secure transactions recorded on the blockchain
- Automated lending processes with smart contracts
- Fixed interest rate for predictable repayments
- Applications in peer-to-peer lending, microfinance, and community funding

## Smart Contract
The smart contract, written in Solidity, includes functionalities for:
- Adding funds to the contract
- Requesting loans
- Funding loans
- Repaying loans
- Retrieving loan details

## Technical Specifications
- **Solidity version**: 0.8.19
- **Dependencies**: SafeMath library for secure arithmetic operations
- **Gas Efficiency**: Optimized code to reduce transaction costs
- **Deployment**: Tested on a local Ethereum network

## DApp Architecture
### Frontend
- **Technologies**: React, Web3.js
- **State Management**: React state for managing web3, contract instance, accounts, and messages
- **Web3 Connection**: Connects to a local Ethereum node using the Web3 library
- **User Interface**: Provides a user-friendly interface for interacting with the smart contract

## Running the DApp
### Prerequisites
Make sure you have the following installed:
- Node.js
- Ganache

### Installation
1. Install dependencies:
   ```bash
   npm install
   npm install web3
2. Start Ganache and ensure it is running on HTTP://127.0.0.1:7545.

3. Compile and deploy the smart contract:
   ```bash
   truffle compile
   truffle migrate --reset

4. Run the React app:
   ```bash
   npm start
   
5. Access the React app at http://localhost:3000/.

### Interacting with the DApp
- Select a borrower account from the dropdown.
- Choose an option (e.g., Lender: Add Balance to Contract or Borrower: Request Loan).
- Enter the desired value in the "Enter MsgValue" field.
- Click "Submit" to execute the selected option.
- View messages and status updates on the app, and check loan details in the console (Control + Shift + J)
- Transactions can also be viewed on Ganache.

### Conclusion
The Lending System DApp aims to demonstrate a decentralized lending platform's functionality using Ethereum smart contracts. Future enhancements may include additional features, security audits, and deployment on the Ethereum mainnet.
