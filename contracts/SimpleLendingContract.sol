// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import './SafeMath.sol';

contract SimpleLendingContract {

    using SafeMath for uint;

    // Enum to represent the state of the loan
    enum LoanState { Requested, Funded, Repaid, Defaulted }

    // Struct to represent the loan details
    struct Loan {
        address borrower;
        uint requestedAmount;
        uint repayAmount;
        uint interestRate; // in percentage
        LoanState state;
        uint requestedDate;
    }

    // Mapping to store loans by borrower address
    mapping(address => Loan) public loans;

    // Variable to store the available balance in the contract
    uint public availableBalance;

    // Function to add funds to the contract
    function addFunds() public payable {
        availableBalance = availableBalance.add(msg.value);
    }

    // Function to request a loan
    function requestLoan(uint amount) public {
        require(amount > 0, "Loan amount must be greater than 0");

        // Calculate repay amount based on the loan details
        uint repayAmount = calculateRepayAmount(amount);

        // Create a new loan
        loans[msg.sender] = Loan({
            borrower: msg.sender,
            requestedAmount: amount,
            repayAmount: repayAmount,
            interestRate: 2,
            state: LoanState.Requested,
            requestedDate: block.timestamp
        });
    }

    // Function to get loan details in a more readable format
    function getLoanDetails(address borrower) external view returns (Loan memory) {
        Loan storage loan = loans[borrower];
        return Loan({
            borrower: loan.borrower,
            requestedAmount: loan.requestedAmount,
            repayAmount: loan.repayAmount,
            interestRate: loan.interestRate,
            state: loan.state,
            requestedDate: loan.requestedDate
        });
    }

    // Function to fund a loan
    function fundLoan(address borrower) public {
        // Get the loan details
        Loan storage loan = loans[borrower];

        // Check if the loan is in the requested state
        require(loan.state == LoanState.Requested, "Loan is not in the requested state");

        // Check if there are sufficient funds to fund the loan
        require(availableBalance >= loan.requestedAmount, "Insufficient funds to fund the loan");

        // Transfer funds from contract to borrower
        payable(loan.borrower).transfer(loan.requestedAmount);

        // Update loan state to funded
        loan.state = LoanState.Funded;

        // Deduct the funded amount from available balance
        availableBalance = availableBalance.sub(loan.requestedAmount);
    }

    // Function to get the repay amount for a loan
    function getRepayAmount(address borrower) external view returns (uint) {
        Loan storage loan = loans[borrower];
        return loan.repayAmount;
    }

    // Function to repay a loan
    function repayLoan() public payable {
        // Get the loan details
        Loan storage loan = loans[msg.sender];

        // Check if the loan is in the funded state
        require(loan.state == LoanState.Funded, "Loan is not in the funded state");

        // Check if the repayment amount is sufficient
        require(msg.value == loan.repayAmount, "Incorrect repayment amount");

        //Return msg.value to contract
        addFunds();

        // Update loan state to repaid
        loan.state = LoanState.Repaid;
    }

    // Function to calculate the repay amount based on loan details
    function calculateRepayAmount(uint amount) internal pure returns (uint) {
        // Add the amount and a constant interest of 2 ethers
        return amount + 2 ether;
    }
}
