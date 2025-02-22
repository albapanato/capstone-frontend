"use client";

import Link from "next/link";
import { Button } from "./Button";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "@/constants";

const InitialButtonsBlock = () => (
  <div className="flex gap-4 justify-center">
    <Button asChild>
      <Link href={LOGIN_ROUTE}>Iniciar sesión</Link>
    </Button>
    <Button asChild variant="outline">
      <Link href={REGISTER_ROUTE}>Registrarse</Link>
    </Button>
  </div>
);

export default InitialButtonsBlock;
