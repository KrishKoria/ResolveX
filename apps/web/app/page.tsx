"use client";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { api } from "@workspace/backend/_generated/api";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";

export default function Page() {
  const users = useQuery(api.users.getUsers);
  return (
    <>
      <Authenticated>
        <div className="flex flex-col items-center justify-center min-h-svh">
          <UserButton />
          <h1 className="text-2xl font-bold">Hello World from web</h1>
          <pre>{JSON.stringify(users, null, 2)}</pre>
        </div>
      </Authenticated>
      <Unauthenticated>
        <p>Must be Authenticated</p>
        <SignInButton>Sign In</SignInButton>
      </Unauthenticated>
    </>
  );
}
