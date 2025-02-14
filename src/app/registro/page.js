import RegisterForm from "../components/usuario/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Crea una cuenta</h2>
          <p className="mt-2 text-sm text-gray-600">Regístrate para comenzar</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
