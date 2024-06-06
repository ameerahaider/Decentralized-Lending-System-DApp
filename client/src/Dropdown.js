// src/Dropdown.js
import React from 'react';

const Dropdown = ({ options, onSelect }) => {
  return (
    <div>
      <label>Select an Option:</label>
      <select onChange={(e) => onSelect(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
