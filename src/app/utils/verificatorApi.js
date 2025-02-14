export async function sendVerificatorData(data) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/verificador`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        fk_usuario: Number(data.fk_usuario), // Asegura que fk_usuario sea un número
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al registrar la entidad");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error en sendVerificatorData:", error);
    return { error: error.message };
  }
}
