export const ID_COOKIES_KEY = "id";
export const TOKEN_COOKIES_KEY = "token";
export const HAS_WITNESSES = "hasWitnesses";
export const HAS_VICTIMS = "hasVictims";
export const HAS_DOCUMENTAL_SOURCES = "hasDocumentalSources";

// rutas
export const HOME_ROUTE = "/";
export const ADD_INCIDENT_ROUTE = "/agregar-suceso";
export const ADD_DOCUMENTAL_SOURCE_ROUTE = "/agregar-fuente";
export const ADD_WITNESS_ROUTE = "/agregar-testigo";
export const ADD_VICTIM_ROUTE = "/agregar-victima";
export const VALIDATOR_ROUTE = "/validacion";
export const LOGIN_ROUTE = "/login";

export const TITLE_BY_STEP = {
  [HAS_DOCUMENTAL_SOURCES]: "Agregar fuente",
  [HAS_WITNESSES]: "Agregar testigo",
  [HAS_VICTIMS]: "Agregar víctima",
};
