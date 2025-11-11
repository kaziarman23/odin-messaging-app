"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation"; // Next.js App Router
import axios from "axios";
import { AuthContext } from "./context/AuthContext"; // adjust path if needed
import { Button } from "@shadcn/ui"; // example if using shadcn components

export default function Page() {
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      login(res.data.user, res.data.token); // update context and localStorage
      router.push("/profile"); // redirect after login
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="p-6 bg-white rounded shadow-md flex flex-col gap-4 w-96"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="bg-blue-500 text-white">
          Login
        </Button>
        <p className="text-sm text-center">
          Don&#39;t have an account?{" "}
          <a href="/signup" className="text-blue-500 underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
