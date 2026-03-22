import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

export default function Signup() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/signup", form);
      login(data);
     toast.success("Signed up successfully", {
        autoClose: 1000, // 1 second
        onClose: () => {
          navigate("/dashboard"); 
        },
      });
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error.message);
    }
  };

  return (
    <Layout>
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 rounded bg-gray-800 border border-gray-700"
            placeholder="Name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="w-full p-3 rounded bg-gray-800 border border-gray-700"
            placeholder="Email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700"
            placeholder="Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="w-full bg-indigo-500 hover:bg-indigo-600 p-3 rounded">
            Sign Up
          </button>
        </form>

        {/* Link to Login */}
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-400 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </Layout>
  );
}
