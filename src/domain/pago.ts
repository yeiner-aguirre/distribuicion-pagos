import type { EstadoPago } from "./estadoPago"

export type MetodoPago =
  | "efectivo"
  | "transferencia"
  | "tarjeta"
  | "nequi"
  | "daviplata"

export interface Pago {
  id: string
  titulo: string
  porcentaje: number
  monto: number
  fecha?: Date
  estado: EstadoPago
  metodoPago?: MetodoPago
}
