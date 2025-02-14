"use client";

import Link from "next/link";
import { Button } from "./Button";

const InitialButtonsBlock = () => (
  <div className="flex gap-4 justify-center">
    <Button asChild>
      <Link href="/login">Iniciar sesión</Link>
    </Button>
    <Button asChild variant="outline">
      <Link href="/registro">Registrarse</Link>
    </Button>
  </div>
);

export default InitialButtonsBlock;
