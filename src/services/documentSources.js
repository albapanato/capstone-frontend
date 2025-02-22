export async function createDocumentSource(data) {
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("Falta la variable de entorno NEXT_PUBLIC_BACKEND_URL");
    }
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/fuentes`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        descripcion_medio: data.descripcion_medio,
        autor_medio: data.autor_medio,
        fecha_publicacion: data.fecha_publicacion,
        url: data.url,
      }),
    });
    const result = await response.json();
    if (!result?.ok) {
      return {
        ok: false,
        message: result.error,
      };
    }
    return result;
  } catch (error) {
    // console.error("Error en sendMediaData:", error);
  }
}
