import React, { useState } from "react";
import { login } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {err && <div className="text-red-500 mb-2">{err}</div>}
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3" required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4" required />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        <div className="mt-3 text-sm">
          Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
