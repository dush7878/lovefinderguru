import { useEffect, useState } from "react";
import API from "../../utils/api";
import { toast } from "react-toastify";

const AddMoney = () => {
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [amount, setAmount] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    if (!selectedId || !amount || isNaN(amount)) {
      toast.error("Select user and valid amount");
      return;
    }

    try {
      await API.put(
        `/admin/money/${selectedId}`,
        { money: Number(amount) },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      toast.success("Money added successfully");
      setAmount("");
      setSelectedId("");
    } catch (error) {
      toast.error("Failed to add money");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Add Money to User</h2>

      <div className="mb-4">
        <label className="block mb-1">Select User</label>
        <select
          className="w-full border px-3 py-2 rounded"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value="">-- Choose a User --</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.username})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Amount</label>
        <input
          type="number"
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Add Money
      </button>
    </div>
  );
};

export default AddMoney;
