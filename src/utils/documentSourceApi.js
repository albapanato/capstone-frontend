export async function sendDocumentSourceData(data) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/media`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al registrar el medio");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error en sendMediaData:", error);
    return { error: error.message };
  }
}
