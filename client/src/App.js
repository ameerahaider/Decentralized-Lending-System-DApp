import './App.css';
import {useState,useEffect} from "react";
import Web3 from 'web3';
import LendingSystem from './contracts/SimpleLendingContract.json'

function App() {

  const[state,setState]=useState({
    web3:null,
    contract:null,
    accounts:[],
    lenderAddress:null,
    borrowerAddress:null,
  });

  const [message, setMessage] = useState(""); // New state variable for messages
  

  useEffect ( () =>{
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    async function template (){
      const web3 = new Web3(provider);
      //console.log(web3);

      //to intereact with contract need ABI and contract path
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = LendingSystem.networks[networkId];
      //console.log(deployedNetwork.address);

      const contract = new web3.eth.Contract(LendingSystem.abi, deployedNetwork.address);
      //console.log(contract); //Instance to contract to interact with

      //Get lender and Borrower Address
      const accounts = await web3.eth.getAccounts();
      const lender = accounts[0];
      let borrower = accounts[1]; //Default Borrower is account 1

      setState({web3:web3, contract:contract, lenderAddress:lender, borrowerAddress:borrower, accounts:accounts});
    }

    provider && template();
  },[] );

console.log(state);

const handleFormSubmit = async ({ msgValue, selectedOption, accIndex }) => {
  // Add logic to handle form submission
  console.log('Submitted:', { msgValue, selectedOption, accIndex });
  // Add logic to interact with your contract based on the selected option

  try {

    const web3 = state.web3;
    const contract = state.contract;
    const lender = state.lenderAddress;
    const accounts = state.accounts;
    let borrower = accounts[accIndex];
    console.log(lender)

    console.log(borrower)
    
    switch (selectedOption) {
      case 'lenderOption1':
        // Lender Option 1: Add funds to the contract
        await contract.methods.addFunds().send({ from: lender, value: web3.utils.toWei(msgValue, 'ether') });
        console.log('Funds added to the contract:', msgValue, 'ether');
        setMessage('Funds added to the contract');
        break;

      case 'lenderOption2':
        // Lender Option 2: Fund the loan
        await contract.methods.fundLoan(borrower).send({ from: lender });
        console.log('Loan funded');
        setMessage('Loan funded');
        break;

      case 'borrowerOption1':
        // Borrower Option 1: Request a loan

        console.log('borrower:', borrower);
        console.log('Loan:', msgValue, 'ether');

        const gasEstimate = await contract.methods.requestLoan(
          web3.utils.toWei(msgValue, 'ether')
        ).estimateGas({ from: borrower });
        
        await contract.methods.requestLoan(
          web3.utils.toWei(msgValue, 'ether')
        ).send({
          from: borrower,
          gas: gasEstimate,
        });

        console.log('Loan requested:', msgValue, 'ether');
        setMessage('Loan requested');
        break;

      case 'borrowerOption2':
        // Borrower Option 2: Repay the loan
        await contract.methods.repayLoan().send({ from: borrower, value: web3.utils.toWei(msgValue, 'ether') });
        console.log('Loan repaid:', msgValue, 'ether');
        setMessage('Loan repaid');
        break;

      case 'borrowerOption3':
          // Borrower: View Loan
          const loanStatus = await contract.methods.getLoanDetails(borrower).call();
          console.log('Lender Function 3 called. Loan Status:', loanStatus);
          setMessage('Viewed Loan on Console');
          break;

      default:
        console.error('Invalid option selected.');
    }
  } catch (error) {
    console.error('Error:', error);
  }

};

  return (
    <div className="App">
      <h1>Lending System</h1>

      <h2>Instructions:</h2>
      <p>- Fixed 2 ethers interest has to be paid on each loan</p>
      <p>- Select correct borrower account</p>

      <form onSubmit={(e) => {

        e.preventDefault();

        handleFormSubmit({
          msgValue: e.target.elements.msgValue.value,
          selectedOption: e.target.elements.selectedOption.value,
          accIndex: e.target.elements.index.value,
        });
      
      }}>
        <label>
        Select Borrower:
        <select name="index">
          {state.accounts.slice(1).map((account, index) => (
            <option key={index} value={index + 1}>{account}</option>
          ))}
        </select>
        <br />
          Select an option:
          <select name="selectedOption">
              <>
              <option value="lenderOption1">Lender: Add Balance to Contract</option>
              <option value="lenderOption2">Lender: Approve Loan</option>
            </>
              <>
              <option value="borrowerOption1">Borrower: Request Loan </option>
              <option value="borrowerOption2">Borrower: Repay Loan </option>
              <option value="borrowerOption3">Borrower: View Loan Status</option>

              </>
          </select>
        </label>
        <br />
       <label>
          Enter MsgValue:
          <input type="number" name="msgValue" />
        </label>
        <br />

        {/* Display the message on successful completion */}
        {message && <div style={{ color: 'green' }}>{message}</div>}
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
