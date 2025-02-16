export async function sendVictimData(data) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/victima`; // REVISA API
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al enviar los datos de la víctima");
    }

    const result = await response.json();
    return result; // Retorna la respuesta del servidor
  } catch (error) {
    console.error("❌ Error enviando los datos:", error);
    throw error; // Lanza el error para manejarlo en el formulario
  }
}
