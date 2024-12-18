"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const { data: session, status } = useSession();

  if (status === "unauthenticated") return router.push("/signin");

  if (status === "loading") return <p>..Loading</p>;

  return (
    <div className="flex justify-between bg-slate-600 text-xl">
      <button>Sigin</button>
      <div className="text-purple-300">{session?.user?.email}</div>
      <button onClick={() => signOut()}>signOut</button>
    </div>
  );
}
