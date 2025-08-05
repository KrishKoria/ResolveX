"use client";
import { api } from "@workspace/backend/_generated/api";
import { useQuery } from "convex/react";

export default function Page() {
  const users = useQuery(api.users.getUsers);
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <h1 className="text-2xl font-bold">Hello World from web</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
