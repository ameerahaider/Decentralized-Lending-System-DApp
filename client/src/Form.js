// src/Form.js
import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Form = ({ onSubmit }) => {
  const [msgValue, setMsgValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [accountAddress, setAccountAddress] = useState('');

  const handleSubmit = () => {
    onSubmit({ msgValue, selectedOption, accountAddress });
  };

  return (
    <FormContainer>
      <Label>Options:</Label>
      <Select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="Borrower">Borrower</option>
        <option value="Lender">Lender</option>
      </Select>

      <Label>Message Value:</Label>
      <Input
        type="text"
        value={msgValue}
        onChange={(e) => setMsgValue(e.target.value)}
      />

      <Label>Options:</Label>
      <Select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="option1">Add Funds to Contract (Lender)</option>
        <option value="option2">Request a Loan (Borrower)</option>
        <option value="option3">Fund a Loan (Lender)</option>
        <option value="option4">Repay a Loan (Borrower)</option>
        <option value="option5">View a Loan (Borrower)</option>
      </Select>

      <Label>Account Address:</Label>
      <Input
        type="text"
        value={accountAddress}
        onChange={(e) => setAccountAddress(e.target.value)}
      />

      <Button onClick={handleSubmit}>Submit</Button>
    </FormContainer>
  );
};

export default Form;
