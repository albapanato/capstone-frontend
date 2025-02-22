import { TOKEN_COOKIES_KEY } from "@/constants";
import { getPersistedDataFromCookies } from "@/utils/cookies";

export async function getIncidents() {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casos/all`;
    const response = await fetch(url);

    if (!response) {
      throw new Error("Error al obtener los datos de los casos");
    }
    return await response.json();
  } catch {}
}

export async function getOneIncident(id) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casos/${id}`;
    const response = await fetch(url);
    if (!response?.ok) {
      throw new Error("Error al obtener los datos del caso");
    }
    return await response.json();
  } catch {}
}

export async function getIncidentsVerified() {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casos/verificados`;
    const response = await fetch(url);
    if (!response?.ok) {
      throw new Error("Error al obtener los datos del caso");
    }
    return await response.json();
  } catch {}
}

export async function getIncidentNoVerified() {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casos/no-verificados`;
    const response = await fetch(url);
    if (!response?.ok) {
      throw new Error("Error al obtener los datos del caso");
    }
    return await response.json();
  } catch {}
}

export async function getOwnIncidentVerified(id_verificator) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casos/mis-verificados/${id_verificator}`;
    const response = await fetch(url);
    if (!response?.ok) {
      throw new Error("Error al obtener los datos del caso");
    }
    return await response.json();
  } catch {}
}

export async function createIncident(data) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casos`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre_caso: data.name,
        fecha: data.date,
        hora: data.time,
        descripcion_caso: data.description,
        nombre_ubicacion: data.locationName,
        coordenadas: `${data.coordinates.lat},${data.coordinates.lng}`,
        descripcion_coordenadas: data.locationDescription,
        valoracion_daños: data.valoration,
        testigos: data.hasWitnesses,
        victimas: data.hasVictims,
        fuentes_documentales: data.hasDocumentalSources,
      }),
    });
    if (!response?.ok) {
      throw new Error("Error al enviar los datos del caso");
    }
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

// Metodo PUT preparado
export async function updateIncident(id, data) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casos/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre_caso: data.name,
        fecha: data.date,
        hora: data.time,
        descripcion_caso: data.description,
        nombre_ubicacion: data.locationName,
        coordenadas: `${data.coordinates.lat},${data.coordinates.lng}`,
        descripcion_coordenadas: data.locationDescription,
        valoracion_daños: data.valoration,
        testigos: data.hasWitnesses,
        victimas: data.hasVictims,
        fuentes_documentales: data.hasDocumentalSources,
      }),
    });
    if (!response?.ok) {
      throw new Error("Error al actualizar los datos del caso");
    }
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

export async function validateIncident(id, data) {
  try {
    const token = getPersistedDataFromCookies(TOKEN_COOKIES_KEY);
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casos/validar/${id}`;
    const responseJson = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        validar: data.validar,
        fk_verificador: data.fk_verificador,
      }),
    });
    const response = await responseJson.json();
    if (!response?.ok) {
      return {
        ok: false,
        message:
          response.status === 403
            ? "No estás autorizado. Inicia sesión"
            : "Error al modificar validacion del caso",
      };
    }
    return response;
  } catch (e) {
    console.error(e);
  }
}
