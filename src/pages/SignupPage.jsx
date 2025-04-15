import React, { useState } from 'react';
import './SignupPage.css';
import { signup } from '../mockApi';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !password || !repeatPassword) {
      setError('All fields are required.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== repeatPassword) {
      setError('Passwords do not match.');
      return;
    }
    const mediumRiskRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!mediumRiskRegex.test(password)) {
      setError('Password must include at least one uppercase letter, one lowercase letter, and one number.');
      return;
    }
    const response = signup(email, password);
    if (!response.success) {
      setError(response.message);
      return;
    }
    setError('');
    localStorage.setItem('user', JSON.stringify({ email }));
    alert(response.message);
  };

  return (
    <div className="signup-page">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignupPage;