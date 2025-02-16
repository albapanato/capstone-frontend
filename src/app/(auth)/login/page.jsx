import LoginForm from "@/components/usuario/LoginForm";
export const metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Bienvenid@</h2>
          <p className="mt-2 text-sm text-gray-600">
            Inicia sesión con tu cuenta
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
