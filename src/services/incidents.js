export async function getIncident(id) {
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("Falta la variable de entorno NEXT_PUBLIC_BACKEND_URL");
    }
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casos/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener los datos del caso");
    }
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

export async function getIncidents({ getAll = false }) {
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("Falta la variable de entorno NEXT_PUBLIC_BACKEND_URL");
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casos${getAll ? "/all" : ""}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener los datos de los casos");
    }
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

export async function createIncident(data) {
  try {
    //if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
    // throw new Error("Falta la variable de entorno NEXT_PUBLIC_BACKEND_URL");
    //}
    // const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casos`;
    // const response = await fetch(url, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });

    // if (!response.ok) {
    //   throw new Error("Error al enviar los datos del caso");
    // }
    //return await response.json();
    return { id: 10 };
  } catch (e) {
    console.error(e);
  }
}

export async function updateIncident(id, data) {
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("Falta la variable de entorno NEXT_PUBLIC_BACKEND_URL");
    }
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casos/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar los datos del caso");
    }
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}
