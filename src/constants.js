export const DATA_COOKIES_KEY = "additional-incident-data"
export const HAS_WITNESSES = "hasWitnesses"
export const HAS_VICTIMS = "hasVictims"
export const HAS_DOCUMENTAL_SOURCES = "hasDocumentalSources"

// rutas
export const HOME_ROUTE = "/"
export const ADD_INCIDENT_ROUTE = "/agregar-suceso"
export const ADD_DOCUMENTAL_SOURCE_ROUTE = "/agregar-fuente"
export const ADD_WITNESS_ROUTE = "/agregar-testigo"
export const ADD_VICTIM_ROUTE = "/agregar-victima"
export const VALIDATOR_ROUTE = "/validacion"
export const LOGIN_ROUTE = "/login"


export const ROUTE_BY_TYPE = {
  [HAS_DOCUMENTAL_SOURCES]: ADD_DOCUMENTAL_SOURCE_ROUTE,
  [HAS_WITNESSES]: ADD_WITNESS_ROUTE,
  [HAS_VICTIMS]: ADD_VICTIM_ROUTE,
}

