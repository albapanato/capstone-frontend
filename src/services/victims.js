export async function createVictim(data) {
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("Falta la variable de entorno NEXT_PUBLIC_BACKEND_URL");
    }
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/victimas`; // REVISA API
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        estado: data.estado,
        apellidos: data.apellidos,
        nombre: data.nombre,
        DNI: data.DNI,
        sexo: data.sexo,
        telefono: data.telefono,
        movil: data.movil,
        email: data.email,
      }),
    });
    const result = await response.json();
    if (!result?.ok) {
      return {
        ok: false,
        message: result.error,
      };
    }
    return result; // Retorna la respuesta del servidor
  } catch (error) {
    // console.error("Error enviando los datos:", error);
  }
}
