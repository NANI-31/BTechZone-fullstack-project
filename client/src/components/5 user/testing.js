import './testing.css';
import React, { useState } from 'react';

const Testing = () => {
  const [value, setValue] = useState(''); // Default state as empty string

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="testing">
      <div className="select">
        <div className="select-name">select an aoption</div>
        <select value={value} onChange={handleChange} defaultValue="select">
          <option value="orange">Orange</option>
          <option value="radish">Radish</option>
          <option value="apple">Apple</option>
        </select>
      </div>
    </div>
  );
};

export default Testing;
