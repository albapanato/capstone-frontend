import ValidationView from '@/components/validation/ValidationView';
import { allIncidentsMock } from '@/data/all-incidents';
// import { cookies } from 'next/headers';
// import "./ValidationPage.css"; // Importamos los estilos

export default async function ValidationPage() {
  // const jwt = await cookies().get('jwt');
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/incidents/all`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${jwt}`,
  //     }
  //   });
  //   const incidents = await response.json();
  const incidents = allIncidentsMock;


  return <ValidationView pendingIncidents={incidents.filter((c) => !c.validado)} validatedIncidents={incidents.filter(
    (c) => c.validado
  )} />
}

