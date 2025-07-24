import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [editingId, setEditingId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '');

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/customers`, {
        withCredentials: true,
      });
      setCustomers(res.data);
    } catch (err) {
      console.error('Error fetching customers:', err);
      alert('Failed to fetch customers');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/customers/${editingId}`, form, {
          withCredentials: true,
        });
        setEditingId(null);
      } else {
        await axios.post(`${API_URL}/api/customers`, form, {
          withCredentials: true,
        });
      }
      setForm({ name: '', email: '', phone: '' });
      fetchCustomers();
    } catch (err) {
      console.error('Error saving customer:', err);
      alert('Operation failed');
    }
  };

  const handleEdit = (customer) => {
    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    });
    setEditingId(customer._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/customers/${id}`, {
        withCredentials: true,
      });
      fetchCustomers();
    } catch (err) {
      console.error('Error deleting customer:', err);
      alert('Failed to delete');
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="p-8 bg-gray-300 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Customer List</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-x-2 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          required
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border p-2"
        />
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded ${editingId ? 'bg-yellow-500' : 'bg-green-600'}`}
        >
          {editingId ? 'Update' : 'Add'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ name: '', email: '', phone: '' });
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded"
          >
            Cancel
          </button>
        )}
      </form>

      <ul>
        {customers.map((c) => (
          <li key={c._id} className="mb-2 flex justify-between items-center bg-white p-2 rounded shadow">
            <span>
              <strong>{c.name}</strong> | {c.email} | {c.phone}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(c)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(c._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
