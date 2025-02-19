import ValidationView from "@/components/validation/ValidationView";
import { getIncidents } from "@/services/incidents";

export default async function ValidationPage() {
  const incidents = (await getIncidents()) || [];

  return (
    <ValidationView
      pendingIncidents={incidents.filter((c) => !c.validado)}
      validatedIncidents={incidents.filter((c) => c.validado)}
    />
  );
}
