import React, { useState } from "react";
import { login } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const res = login(email, password);
    if (res.success) navigate("/");
    else setErr(res.message);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-xl w-full max-w-md border border-indigo-50"
      >
        <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Welcome back</h1>
        <p className="text-gray-500 mb-6">Sign in to continue</p>
        {err && <div className="text-red-500 mb-2">{err}</div>}
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-300" required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-300" required />
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg shadow">Login</button>
        <div className="mt-3 text-sm">
          Don't have an account? <Link to="/signup" className="text-indigo-600">Sign up</Link>
        </div>
      </motion.form>
    </div>
  );
}
