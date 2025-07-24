import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/auth/register`, form, {
        withCredentials: true
      });
      alert('Registration successful! Please log in.');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration Failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form onSubmit={handleRegister} className="bg-gray-300 p-6 rounded-lg shadow-lg w-5/6 h-[28rem]">
        <h2 className="text-2xl font-bold mb-4 text-center pt-6">Register Here</h2>

        <input
          type="text"
          placeholder="Username"
          required
          className="border p-2 mb-2 w-full"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          required
          className="border p-2 mb-2 w-full"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="border p-2 mb-4 w-full"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
          Register
        </button>

        <p className="text-center font-bold mt-4">
          Already have an account?{' '}
          <Link to="/" className="text-blue-500 hover:text-blue-400">Login here</Link>
        </p>
      </form>
    </div>
  );
}
