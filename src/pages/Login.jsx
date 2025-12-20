import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useHotel();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login logic
    if (email && password) {
      login({ name: 'Guest User', email: email, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxbiipzYCeoT4E7jYoun--DG4O2X73OxYverGywcMT4wKf5DCJXZZdY3nLhyZQZxtW90zZa-ErPfnGB3WTiyjyZY92_AYwkr6ty9Cu9EfoyysTrCXQrb62Az5e_b7McSRgtRMRaOMPcpAhtn3I0onj00cnXy3-_KjND6hsf5YbyF09pX02KIGXdUVedG6hs_zcCTThaZqk2unlvg7tfiVrZbxrXkqGgFsRrxqxMLNAx5WsdQmUbFQ2aohZJtQWUo1fqK3BPBrCwtnK' });
      navigate('/');
    } else {
        alert('Please enter valid credentials');
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 dark:bg-background-dark font-display items-center justify-center py-10">
      <div className="flex flex-col w-full max-w-[512px] p-6 bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-[#cfdbe7] dark:border-border-dark">
        <h2 className="text-[#0d141b] dark:text-white tracking-light text-[28px] font-bold leading-tight text-center pb-6">Log in</h2>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <label className="flex flex-col">
            <p className="text-[#0d141b] dark:text-gray-300 text-base font-medium leading-normal pb-2">Email or phone number</p>
            <input
              type="text"
              required
              placeholder="Enter your email"
              className="form-input w-full rounded-lg border border-[#cfdbe7] dark:border-gray-600 bg-slate-50 dark:bg-gray-800 text-[#0d141b] dark:text-white h-14 px-4 focus:ring-primary focus:border-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          
          <label className="flex flex-col">
            <p className="text-[#0d141b] dark:text-gray-300 text-base font-medium leading-normal pb-2">Password</p>
            <input
              type="password"
              required
              placeholder="Enter your password"
              className="form-input w-full rounded-lg border border-[#cfdbe7] dark:border-gray-600 bg-slate-50 dark:bg-gray-800 text-[#0d141b] dark:text-white h-14 px-4 focus:ring-primary focus:border-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <a href="#" className="text-[#4c739a] text-sm font-medium underline text-right">Forgot password?</a>

          <button
            type="submit"
            className="w-full h-12 rounded-lg bg-primary text-white text-base font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30"
          >
            Log in
          </button>
        </form>

        <p className="text-[#4c739a] text-sm font-normal text-center mt-6">
          Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Sign up</Link>
        </p>
        <Link to="/" className="text-text-secondary text-sm text-center mt-2 hover:text-primary">Back to Home</Link>
      </div>
    </div>
  );
};

export default Login;
