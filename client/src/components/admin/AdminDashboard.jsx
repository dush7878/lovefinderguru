import { useEffect, useState } from 'react';
import API from '../../utils/api';
import { toast } from 'react-toastify';
import { Users, UserCheck, UserX } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, male: 0, female: 0 });
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchPendingUsers();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get('/admin/dashboard-stats');
      setStats(res.data);
    } catch {
      toast.error('Failed to load stats');
    }
  };

  const fetchPendingUsers = async () => {
    try {
      const res = await API.get('/admin/pending-users');
      setPendingUsers(res.data);
    } catch {
      toast.error('Failed to load pending users');
    }
  };

  const handleAccept = async (userId) => {
    try {
      await API.put(`/admin/accept/${userId}`);
      toast.success('User accepted');
      fetchPendingUsers();
      fetchDashboard();
    } catch {
      toast.error('Error accepting user');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-zinc-100 text-zinc-800">
      <h2 className="text-3xl font-bold text-blue-700 mb-8">📊 Admin Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4">
          <Users size={32} className="text-blue-600" />
          <div>
            <p className="text-gray-600 font-semibold">Total Users</p>
            <p className="text-2xl font-bold text-zinc-900">{stats.totalUsers}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4">
          <UserCheck size={32} className="text-green-600" />
          <div>
            <p className="text-gray-600 font-semibold">Male Users</p>
            <p className="text-2xl font-bold text-zinc-900">{stats.male}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4">
          <UserX size={32} className="text-pink-500" />
          <div>
            <p className="text-gray-600 font-semibold">Female Users</p>
            <p className="text-2xl font-bold text-zinc-900">{stats.female}</p>
          </div>
        </div>
      </div>

      {/* Pending Users */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold text-gray-700 mb-4">⏳ Pending Users</h3>

        {pendingUsers.length === 0 ? (
          <p className="text-gray-500 italic">No pending users at the moment.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm text-left">
              <thead className="bg-zinc-100 text-zinc-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Username</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Gender</th>
                  <th className="px-4 py-3">Age</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.map((user, idx) => (
                  <tr
                    key={user._id}
                    className={`border-b hover:bg-zinc-50 transition ${idx % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}`}
                  >
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.gender}</td>
                    <td className="px-4 py-2">{user.age}</td>
                    <td className="px-4 py-2">{user.location}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleAccept(user._id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md transition"
                      >
                        Accept
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
