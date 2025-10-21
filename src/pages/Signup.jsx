import React, { useState } from "react";
import { signup } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const res = signup({ name, email, password, role: "user" });
    if (res.success) navigate("/login");
    else setErr(res.message);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        {err && <div className="text-red-500 mb-2">{err}</div>}
        <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3" required />
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3" required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4" required />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Sign up</button>
      </form>
    </div>
  );
}
