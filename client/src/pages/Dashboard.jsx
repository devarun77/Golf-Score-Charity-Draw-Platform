import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);
  const [value, setValue] = useState("");
  const [charities, setCharities] = useState([]);
  const [selected, setSelected] = useState("");
  const [percentage, setPercentage] = useState(10);

  const fetchScores = async () => {
    const { data } = await API.get("/scores");
    setScores(data.scores);
  };

  const fetchCharities = async () => {
    const { data } = await API.get("/charities");
    setCharities(data.charities);
  };

  useEffect(() => {
    fetchScores();
    fetchCharities();
  }, []);

  useEffect(() => {
    fetchScores();
  }, []);

  const addScore = async () => {
    try {
    await API.post("/scores/add", {
      value: Number(value),
      date: new Date(),
    });
    setValue("");
    fetchScores();
     toast.success("Score successfully added", {
            autoClose: 1000, // 1 second
          });
  } catch (error) {
    console.error(error)
  }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
  <h2 className="text-3xl font-bold">Dashboard</h2>

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

      {/* Add Score Card */}
      <div className="bg-gray-900 p-6 rounded-2xl mb-6">
        <h3 className="mb-4 text-lg">Add Score</h3>

        <div className="flex gap-3">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 p-3 rounded bg-gray-800"
          />
          <button onClick={addScore} className="bg-indigo-500 px-5 rounded">
            Add
          </button>
        </div>
      </div>

      {/* Scores List */}
      <div className="bg-gray-900 p-6 rounded-2xl">
        <h3 className="mb-4 text-lg">Your Last 5 Scores</h3>

        <div className="space-y-3">
          {scores.map((s, i) => (
            <div
              key={i}
              className="flex justify-between bg-gray-800 p-3 rounded"
            >
              <span>{s.value}</span>
              <span className="text-gray-400">
                {new Date(s.date).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Charity Section */}
      <div className="bg-gray-900 p-6 rounded-2xl mt-6">
        <h3 className="mb-4 text-lg">Support a Charity</h3>

        <select
          className="w-full p-3 mb-3 bg-gray-800 rounded"
          onChange={(e) => setSelected(e.target.value)}
        >
          <option>Select Charity</option>
          {charities.map((c, i) => (
            <option key={i} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="10"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
          className="w-full p-3 mb-3 bg-gray-800 rounded"
          placeholder="Contribution % (min 10)"
        />

        <button
          onClick={async () => {
            await API.post("/charities/select", {
              name: selected,
              percentage: Number(percentage),
            });
            alert("Charity selected!");
          }}
          className="bg-indigo-500 px-5 py-2 rounded"
        >
          Save
        </button>
        <p className="text-gray-400 mt-2">
          Selected: {selected} ({percentage}%)
        </p>
      </div>
    </Layout>
  );
}
