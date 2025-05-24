import RoleGuard from "@/components/custom/RoleGaurd";
import CreateElectionForm from "@/components/general/CreateElection/CreateElection";

export default async function CreateElectionPage() {
  return (
    <RoleGuard
      allowedRoles={["admin"]}
      redirect={true}
      message="You do not have permission to create an election."
    >
      <CreateElectionForm />
    </RoleGuard>
  );
}
