import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login Failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form onSubmit={handleLogin} className="bg-gray-300 p-6 rounded-lg shadow-lg w-5/6 h-96">
        <h2 className="text-2xl font-bold mb-4 text-center pt-6">Login Your Account</h2>
        <input
          type="email"
          placeholder="Email"
          required
          className="border p-2 mb-2 w-full"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          required
          className="border p-2 mb-2 w-full"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <br /><br />
        <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
          Login
        </button>
        <p className="text-l mt-2 pt-5 font-bold">
          Not an account?{' '}
          <Link to="/register" className="text-blue-500 hover:text-blue-400">Register here</Link>
        </p>
      </form>
    </div>
  );
}
