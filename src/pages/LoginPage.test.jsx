import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  test('renders the login form', () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('shows error message when fields are empty', () => {
    render(<LoginPage />);
    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByText('Both fields are required.')).toBeInTheDocument();
  });

  test('shows error message for invalid email', () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'invalidemail' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  test('logs in successfully with valid credentials', () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByText('Login'));
    expect(screen.queryByText('Both fields are required.')).not.toBeInTheDocument();
    expect(screen.queryByText('Please enter a valid email address.')).not.toBeInTheDocument();
  });
});