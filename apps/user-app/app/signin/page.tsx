"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signinAuth } from "../lib/action";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isForm, setIsForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  async function handler(event: any) {
    event.preventDefault();
    setError("");
    try {
      const response = await signinAuth(isForm);
      console.log(response);
      if (response?.error) {
        setError("please check your credientials");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error, "error");
    }
  }

  return (
    <div>
      {error && (
        <p className="flex flex-col items-center justify-center bg-red-400">
          {error}
        </p>
      )}
      <form
        onSubmit={(event) => handler(event)}
        className="flex flex-col items-center justify-center gap-2"
      >
        <label className="self-justify-start">Name</label>
        <input
          onChange={(e) => setIsForm({ ...isForm, name: e.target.value })}
          value={isForm.name}
          className="bg-slate-200 p-2"
          type="text"
          name="name"
          placeholder="your name"
          required
        />

        <label className="self-justify-start">Email</label>
        <input
          onChange={(e) => setIsForm({ ...isForm, email: e.target.value })}
          value={isForm.email}
          className="bg-slate-200 p-2"
          type="email"
          name="email"
          placeholder="your email"
          required
        />
        <label className="self-justify-start">phone</label>
        <input
          value={isForm.phone}
          onChange={(e) => setIsForm({ ...isForm, phone: e.target.value })}
          className="bg-slate-200 p-2"
          type="number"
          name="phone"
          placeholder="Phone"
          required
        />
        <label className="self-justify-start">password</label>
        <input
          value={isForm.password}
          onChange={(e) => setIsForm({ ...isForm, password: e.target.value })}
          className="bg-slate-200 p-2"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button
          type="submit"
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
