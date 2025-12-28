import type { Pago } from "./pago"

export interface Prestamo {
  id: string
  total: number
  pagos: Pago[]
}


