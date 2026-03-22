import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    try {
    e.preventDefault();
    const { data } = await API.post("/auth/login", form);
    login(data);
    toast.success("Logged in successfully", {
      autoClose: 1000, // 1 second
      onClose: () => {
        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      },
    });
    setForm({email: "", password: ""});

  } catch (error) {
    console.error(error);
    toast.error("Incorrect email or password", {autoClose: 1000});
  }
  };

  return (
    <Layout>
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            Login
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-400 cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </Layout>
  );
}
