// ESTE COMPONENTE ESTÁ PREPARADO SI SE QUISIERA AGREGAR UNA CAPA MAS DE SEGURIDAD AL CREAR UNA NUEVA ORGANIZACION

// "use client";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { validateProcess } from "@/services/verificator";
// import { FormInput } from "@/components/form-components/FormInput";
// import { Button } from "@/components/form-components/Button";
// import { HOME_ROUTE } from "@/constants";

// export default function ValidationForm() {
//   const router = useRouter();
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm();

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     setError("");

//     try {
//       const res = await validateProcess(data);

//       if (res.success) {
//         router.push(HOME_ROUTE);
//       } else {
//         throw new Error("Código de validación incorrecto o expirado.");
//       }
//     } catch (e) {
//       console.error(e);
//       setError(e.message || "No se pudo validar el usuario.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-4 max-w-md mx-auto"
//     >
//       <h2 className="text-2xl font-bold text-center">Validación de Usuario</h2>
//       <p className="text-sm text-gray-600 text-center">
//         Introduzca el código de validación enviado a su correo.
//       </p>

//       <FormInput
//         label="Código de validación"
//         type="text"
//         {...register("validationCode", {
//           required: "Campo obligatorio",
//           minLength: { value: 6, message: "Debe tener al menos 6 caracteres" },
//         })}
//         error={errors.validationCode?.message}
//       />

//       {error && <p className="text-sm text-red-500">{error}</p>}

//       <Button type="submit" className="w-full" disabled={isSubmitting}>
//         {isSubmitting ? "Validando..." : "Validar Cuenta"}
//       </Button>
//     </form>
//   );
// }
