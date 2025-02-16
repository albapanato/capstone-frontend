export async function sendIncidentData(data) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/caso`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al enviar los datos del caso");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error enviando los datos:", error);
    throw error;
  }
}
