import { useNavigate } from 'react-router-dom';

export default function Home() {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-300">
      <h1 className="text-xl font-bold text-center normal-case text-gray-900 mt-4">Welcome, <span className='font-bold uppercase text-green-900'> {username} </span>   your CRM dashboard! We're thrilled to have you back. <br />Manage your customers with ease, track interactions, and grow your business smarter and faster. <br />Dive in and explore the tools crafted just for you. <br />Here's to productivity, progress, and powerful customer <br /> relationships—right at your fingertips!</h1>
      <button onClick={() => navigate('/customers')} className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600">
        Check Customers List
      </button>
    </div>
  );
}
