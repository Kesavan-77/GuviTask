// src/components/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/signup', formData);
      console.log(response.data.message);

      // Redirect to the home page after successful registration
      navigate('/'); // You can navigate to the specific user's home if needed
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" onChange={handleChange} />

        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} />

        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
