import { useEffect, useState } from 'react';
import API from '../../utils/api';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      toast.error('Failed to load user list');
    }
  };

  const togglePassword = (userId) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <div className="p-6 bg-zinc-100 min-h-screen">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">All Users</h2>

      <div className="overflow-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm text-left table-auto">
          <thead className="bg-zinc-100 text-gray-600 uppercase text-xs border-b">
            <tr>
              <th className="px-4 py-3">Profile</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">Age</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Money</th>
              <th className="px-4 py-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b hover:bg-zinc-50">
                <td className="px-4 py-3">
                  <img
                    src={u.profileImage}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-3">{u.username}</td>
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3 capitalize">{u.gender}</td>
                <td className="px-4 py-3">{u.age}</td>
                <td className="px-4 py-3">{u.location}</td>
                <td className="px-4 py-3">{u.email || "-"}</td>
                <td className="px-4 py-3">{u.number || "-"}</td>
                <td className="px-4 py-3 text-blue-600 font-semibold">₹{u.money}</td>
                <td className="px-4 py-3">{moment(u.createdAt).format("DD MMM, YYYY")}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
