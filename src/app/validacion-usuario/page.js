import ValidationForm from "../components/usuario/UserValidator.jsx";

export default function ValidationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <ValidationForm />
      </div>
    </div>
  );
}
