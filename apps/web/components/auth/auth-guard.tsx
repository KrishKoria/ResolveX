"use client";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { AuthLayout } from "./ui/auth-layout";
import SignInView from "./ui/sign-in";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthLoading>
        <AuthLayout>
          <p>Loading...</p>
        </AuthLayout>
      </AuthLoading>
      <Authenticated>{children}</Authenticated>
      <Unauthenticated>
        <SignInView />
      </Unauthenticated>
    </>
  );
}
