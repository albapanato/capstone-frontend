export async function createWitness(data) {
  try {
    console.log(data);
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("Falta la variable de entorno NEXT_PUBLIC_BACKEND_URL");
    }
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/testigos`; // Revisa la API correcta
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apellidos: data.apellidos,
        nombre: data.nombre,
        DNI: data.DNI,
        telefono: data.telefono,
        movil: data.movil,
        sexo: data.sexo,
        email: data.email,
        declaracion: data.declaracion,
      }),
    });

    if (!response?.ok) {
      throw new Error("Error al enviar los datos del testigo");
    }
    const result = await response.json();
    return result; // Retorna la respuesta del servidor
  } catch (error) {
    // console.error("Error enviando los datos:", error);
  }
}
