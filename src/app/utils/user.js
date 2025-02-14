"use server";
// es necesrio poner "use server " porque si no,  el fichero que lo llama al ser "use client" por default renderizara la funcion en el lado del cliente

// cambiar logica cuando sepa a donde se van a mandar los datos del usuario --> agregar dominio a archivo .env y definir terminacion de la ruta
export async function createUser(data) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/register`; // Revisa la API correcta
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al registrar usuario");
    }

    return await response.json(); // Retorna la respuesta del servidor
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error);
    return { error: error.message };
  }
}

export async function loginUser(data) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al iniciar sesión");
    }

    return await response.json(); // Retorna la respuesta del servidor
  } catch (error) {
    console.error("❌ Error en loginUser:", error);
    return { error: error.message };
  }
}

export async function validateUser(data) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/validate`; // Ruta API de validación
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Código de validación incorrecto o expirado.");
    }

    const result = await response.json();
    return result; // Devolvemos la respuesta del backend
  } catch (error) {
    console.error("❌ Error validando usuario:", error);
    throw error; // Lanza el error para manejarlo en el frontend
  }
}
