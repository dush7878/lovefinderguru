import { useEffect, useState } from "react";
import API from "../../utils/api";
import { toast } from "react-toastify";
import { Wallet, UserPlus } from "lucide-react";

const AddMoney = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser || !amount) {
      toast.warning("Please fill in all fields");
      return;
    }

    try {
      await API.put(`/admin/money/${selectedUser}`, { money: parseFloat(amount) });
      toast.success("Money added successfully");
      setAmount("");
      setSelectedUser("");
    } catch (error) {
      toast.error("Failed to add money");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center gap-3 mb-6">
          <Wallet size={28} className="text-blue-600" />
          <h2 className="text-2xl font-bold text-blue-700">Add Money to User</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Select User</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm outline-blue-500"
            >
              <option value="">-- Choose a User --</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} (@{user.username}) — ₹{user.money}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm outline-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded transition"
          >
            Add Money
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMoney;
