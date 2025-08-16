import { OrganizationList } from "@clerk/nextjs";

export default function OrganizationSelect() {
  return (
    <OrganizationList
      afterCreateOrganizationUrl={"/"}
      afterSelectOrganizationUrl={"/"}
      hidePersonal
      skipInvitationScreen
    />
  );
}
