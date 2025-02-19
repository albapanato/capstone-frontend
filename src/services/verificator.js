"use server";
// es necesrio poner "use server " porque si no,  el fichero que lo llama al ser "use client" por default renderizara la funcion en el lado del cliente

export async function createVerificator(data) {
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("Falta la variable de entorno NEXT_PUBLIC_BACKEND_URL");
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/verificadores`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        entidad: data.entidad,
        cif: data.cif,
        DNI: data.DNI,
        nombre: data.nombre,
        apellidos: data.apellidos,
        telefono: data.telefono,
        movil: data.movil,
        email: data.email,
        password: data.password,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return { error: error.message };
  }
}

export async function loginVerificator(data) {
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("Falta la variable de entorno NEXT_PUBLIC_BACKEND_URL");
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return { error: error.message };
  }
}

// export async function validateProcess(data) {
//   try {
//     const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/validate`; // Ruta por definir si se quiere usar esto en un futuro
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error("Código de validación incorrecto o expirado.");
//     }

//     const result = await response.json();
//     return result; // Devolvemos la respuesta del backend
//   } catch (error) {
//     console.error("Error validando usuario:", error);
//     throw error; // Lanza el error para manejarlo en el frontend
//   }
// }
