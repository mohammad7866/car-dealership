import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.scss';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      await axios.post('https://localhost:7193/api/Auth/register', {
        username,
        password,
      });

      setError(null);
      setSuccess(true);
    } catch (error: any) { // Explicitly typing error as 'any'
      if (error.response && error.response.status === 409) {
        // Username already taken
        const suggestedUsername = `${username}_${Math.floor(Math.random() * 1000)}`;
        setError(`Username already taken. Try "${suggestedUsername}"`);
      } else {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && (
        <div className="success-message">
          <p>Congratulations! You have created an account.</p>
          <Link to="/">Go to Login Page</Link>
        </div>
      )}
      <Link to="/">Already have an account? Login</Link>
    </div>
  );
};

export default Register;
