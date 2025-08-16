"use client";
import { useOrganization } from "@clerk/nextjs";
import { AuthLayout } from "./ui/auth-layout";
import OrganizationSelect from "./ui/org-select";

export default function OrganizationGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { organization } = useOrganization();
  if (!organization) {
    return (
      <AuthLayout>
        <OrganizationSelect />
      </AuthLayout>
    );
  }
  return <>{children}</>;
}
