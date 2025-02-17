export async function createWitness(data) {
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("Falta la variable de entorno NEXT_PUBLIC_BACKEND_URL");
    }
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/testigos`; // Revisa la API correcta
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
