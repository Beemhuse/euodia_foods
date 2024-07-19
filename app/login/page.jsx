'use client';

import React, { useState } from 'react';

// import { InputField } from 'react-input-library ';

export default function Login() {
  const [name, setName] = useState('');

  const handleChange = (value) => {
    setName(value);
  };
  return (
    <div>
      {/* <InputField
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={handleChange}
      /> */}
    </div>
  );
}
