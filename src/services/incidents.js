// Metodo GET preparado,---> por testear desde el front

export async function getIncidents() {
  // funciona
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("Falta la variable de entorno NEXT_PUBLIC_BACKEND_URL");
    }
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casos/all`;
    const response = await fetch(url);

    if (!response) {
      throw new Error("Error al obtener los datos de los casos");
    }
    return await response.json();
  } catch {}
}

// Metodo GET preparado,---> por testear desde el front

export async function getOneIncident(id) {
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("Falta la variable de entorno NEXT_PUBLIC_BACKEND_URL");
    }
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casos/${id}`;
    const response = await fetch(url);
    if (!response?.ok) {
      throw new Error("Error al obtener los datos del caso");
    }
    return await response.json();
  } catch {}
}

// Metodo GET preparado,---> por testear desde el front

export async function getIncidentVerified() {
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("Falta la variable de entorno NEXT_PUBLIC_BACKEND_URL");
    }
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casos/verificados`;
    const response = await fetch(url);
    if (!response?.ok) {
      throw new Error("Error al obtener los datos del caso");
    }
    return await response.json();
  } catch {}
}

// Metodo GET preparado,---> por testear desde el front

export async function getIncidentNoVerified() {
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("Falta la variable de entorno NEXT_PUBLIC_BACKEND_URL");
    }
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casos/no-verificados`;
    const response = await fetch(url);
    if (!response?.ok) {
      throw new Error("Error al obtener los datos del caso");
    }
    return await response.json();
  } catch {}
}

// Metodo GET preparado,---> por testear desde el front

export async function getOwnIncidentVerified(id_verificator) {
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("Falta la variable de entorno NEXT_PUBLIC_BACKEND_URL");
    }
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casos/mis-verificados/${id_verificator}`;
    const response = await fetch(url);
    if (!response?.ok) {
      throw new Error("Error al obtener los datos del caso");
    }
    return await response.json();
  } catch {}
}

export async function createIncident(data) {
  // funciona

  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("Falta la variable de entorno NEXT_PUBLIC_BACKEND_URL");
    }
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

// Metodo PUT preparado,---> por testear

export async function updateIncident(id, data) {
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("Falta la variable de entorno NEXT_PUBLIC_BACKEND_URL");
    }
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
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("Falta la variable de entorno NEXT_PUBLIC_BACKEND_URL");
    }
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casos/validar/${id}`;
    const responseJson = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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
