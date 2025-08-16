"use client";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-svh">
        <UserButton />
        <OrganizationSwitcher hidePersonal />
        <h1 className="text-2xl font-bold">Hello World from web</h1>
      </div>
    </>
  );
}
