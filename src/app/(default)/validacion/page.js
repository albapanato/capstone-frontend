import ValidationView from "@/components/validation/ValidationView";
import { cookies } from "next/headers";
import {
  getIncidents,
  getIncidentsVerified,
  getIncidentNoVerified,
  getOwnIncidentVerified,
} from "@/services/incidents";
import { ID_COOKIES_KEY, TOKEN_COOKIES_KEY } from "@/constants";

export default async function ValidationPage() {
  const cookiesStore = await cookies();
  const idVerificador = cookiesStore.get(ID_COOKIES_KEY)?.value;
  const token = cookiesStore.get(TOKEN_COOKIES_KEY)?.value;

  if (!idVerificador || !token) return <div>No tienes acceso</div>;

  const incidentsAll = (await getIncidents()) || [];
  const verified = (await getIncidentsVerified()) || [];
  const noVerified = (await getIncidentNoVerified()) || [];
  const ownVerified = (await getOwnIncidentVerified(idVerificador)) || [];

  return (
    <ValidationView
      allIncidents={incidentsAll}
      pendingIncidents={noVerified}
      validatedIncidents={verified}
      ownValidatedIncidents={ownVerified}
      idVerificador={idVerificador}
    />
  );
}
