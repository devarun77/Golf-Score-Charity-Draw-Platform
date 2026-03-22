import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [winners, setWinners] = useState([]);
  const [drawResults, setDrawResults] = useState();

  const fetchData = async () => {
    const usersRes = await API.get("/admin/users");
    const winnersRes = await API.get("/admin/winners");

    setUsers(usersRes.data.users);
    setWinners(winnersRes.data.winners);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const runDraw = async () => {
    try {
      const { data } = await API.post("/draws/run");

      fetchData(); // refresh list

      setDrawResults(data.draw); //
      console.log(winners);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Panel</h2>

        <button
          onClick={() => {
            logout();
            toast.success("Logged out successfully", {
              autoClose: 1000, // 1 second
              onClose: () => {
                navigate("/");
              },
            });
          }}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <button
        onClick={runDraw}
        className="bg-indigo-500 px-6 py-3 rounded mb-6"
      >
        Run Monthly Draw
      </button>
      {/* Draw Result */}
      {drawResults && (
        <div className="bg-gray-900 p-6 rounded-2xl mb-6">
          <h3 className="mb-4 text-lg font-semibold">Latest Draw Result</h3>

          <p className="mb-2">
            <strong>Date:</strong>{" "}
            {new Date(drawResults.drawDate).toLocaleString()}
          </p>

          <div className="mb-2">
            <strong>Numbers:</strong>
            <div className="flex gap-2 mt-2">
              {drawResults.numbers?.map((num, index) => (
                <span
                  key={index}
                  className="bg-indigo-500 px-3 py-1 rounded-full"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>

          <p>
            <strong>Winners:</strong> {drawResults.winners?.length || 0}
          </p>
        </div>
      )}

      {/* Users */}
      <div className="bg-gray-900 p-6 rounded-2xl mb-6">
        <h3 className="mb-4 text-lg">Users</h3>
        {users.map((u) => (
          <div key={u._id} className="border-b border-gray-700 py-3">
            <p className="font-medium">
              {u.name} ({u.email})
            </p>

            {/* Subscription Button */}
            <button
              onClick={async () => {
                await API.post("/admin/subscription", {
                  userId: u._id,
                  status: "active",
                  plan: "monthly",
                });
                fetchData();
                 toast.success("Subscription activated successfully", {
                              autoClose: 1000, // 1 second
                            });
              }}
              className="bg-green-500 px-3 py-1 rounded mt-2"
            >
              Activate Subscription
            </button>

            {/* Edit Scores Button */}
            <button
              onClick={async () => {
                await API.post("/admin/scores", {
                  userId: u._id,
                  scores: [{ value: 30, date: new Date() }],
                });
                 toast.success("Scores Updated successfully", {
                              autoClose: 1000, // 1 second
                            });
              }}
              className="bg-yellow-500 px-3 py-1 rounded ml-2"
            >
              Edit Scores
            </button>
          </div>
        ))}
      </div>

      {/* Winners */}
      <div className="bg-gray-900 p-6 rounded-2xl">
        <h3 className="mb-4 text-lg font-semibold text-white">Winners</h3>

        {winners.length === 0 ? (
          <p className="text-gray-400">No winners yet</p>
        ) : (
          <div className="space-y-4">
            {winners.map((w, i) => (
              <div
                key={i}
                className="bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-indigo-500 transition"
              >
                {/* Top Row: Name, Email, Match Count */}
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold text-white">{w.user?.name}</p>
                    <p className="text-sm text-gray-400">{w.user?.email}</p>
                  </div>

                  <span className="bg-indigo-500 px-3 py-1 rounded-full text-sm font-semibold">
                    {w.matchCount} {w.matchCount > 1 ? "matches" : "match"}
                  </span>
                </div>

                {/* Draw Date */}
                <p className="text-sm text-gray-400 mb-2">
                  Draw Date: {new Date(w.drawDate).toLocaleDateString()}
                </p>

                {/* Numbers */}
                <div className="flex gap-2 flex-wrap">
                  {w.numbers?.map((num, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-700 px-3 py-1 rounded-full text-sm font-mono"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
