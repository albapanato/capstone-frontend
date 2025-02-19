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
        nombre: data.nombre,
        apellidos: data.apellidos,
        DNI: data.DNI,
        telefono: data.telefono,
        movil: data.movil,
        email: data.email,
        sexo: data.sexo,
      }),
    });

    if (!response?.ok) {
      throw new Error("Error al enviar los datos de la víctima");
    }

    const result = await response.json();
    return result; // Retorna la respuesta del servidor
  } catch (error) {
    // console.error("Error enviando los datos:", error);
  }
}
