import { useState } from "react"
import type { Pago, MetodoPago } from "../domain/pago"
import type { Prestamo } from "../domain/prestamo"

export function usePagos(total: number) {
  const [prestamo, setPrestamo] = useState<Prestamo>(() => ({
    id: crypto.randomUUID(),
    total,
    pagos: [
      {
        id: crypto.randomUUID(),
        titulo: "Anticipo",
        porcentaje: 0,
        monto: 0,
        estado: "pendiente",
      },
    ],
  }))
  // Empiezo siempre con un pago inicial para no tener la lista vacía
  // Esto hace que la UI y la lógica sean más simples desde el inicio

  const porcentajePagado = prestamo.pagos
    .filter(p => p.estado === "pagado")
    .reduce((acc, p) => acc + p.porcentaje, 0)
  // El porcentaje pagado se calcula según los pagos ya realizados
  // Así evito guardar ese dato por separado y que se desincronice

  const porcentajeRestante = 100 - porcentajePagado
  // El restante se calcula automáticamente para no permitir pasar del 100%

  function puedePagar(indice: number) {
    // El primer pago siempre se puede pagar
    if (indice === 0) return true

    // Los siguientes solo si el anterior ya está pagado
    // Esto fuerza que el usuario pague en orden
    return prestamo.pagos[indice - 1].estado === "pagado"
  }

  function pagarPago(
    indice: number,
    porcentaje: number,
    fecha: Date,
    metodoPago: MetodoPago
  ) {
    // Validaciones simples para evitar estados inválidos
    if (!puedePagar(indice)) return
    if (porcentaje <= 0 || porcentaje > porcentajeRestante) return

    setPrestamo(prev => {
      const pagos = [...prev.pagos]
      const pago = pagos[indice]

      // Si ya está pagado no hago nada
      if (pago.estado === "pagado") return prev

      // Marco el pago como pagado y guardo la info necesaria
      pago.estado = "pagado"
      pago.porcentaje = porcentaje
      pago.monto = (prev.total * porcentaje) / 100
      pago.fecha = fecha
      pago.metodoPago = metodoPago

      return { ...prev, pagos }
    })

    // @todo api post: guardar el pago realizado en backend
    // Aquí se enviaría el id del préstamo, el pago y el método usado
  }

  function crearNuevoPago(titulo: string) {
    setPrestamo(prev => {
      // Si ya se llegó al 100%, no tiene sentido crear más pagos
      if (porcentajeRestante <= 0) return prev

      const indicePendiente = prev.pagos.findIndex(
        p => p.estado === "pendiente"
      )

      // Si existe un pago pendiente, lo divido en dos
      // Esto permite que el usuario "parta" un pago sin perder el control
      if (indicePendiente !== -1) {
        const original = prev.pagos[indicePendiente]

        // Si el pago no tiene porcentaje aún, uso el restante
        const base = original.porcentaje || porcentajeRestante
        if (base <= 1) return prev // evito pagos demasiado pequeños

        const mitad = base / 2

        // Actualizo el pago original
        original.porcentaje = mitad
        original.monto = (prev.total * mitad) / 100

        // Creo el nuevo pago con la otra mitad
        const nuevo: Pago = {
          id: crypto.randomUUID(),
          titulo,
          porcentaje: mitad,
          monto: (prev.total * mitad) / 100,
          estado: "pendiente",
        }

        const pagos = [...prev.pagos]
        pagos.splice(indicePendiente + 1, 0, nuevo)

        // @todo api post: crear nuevo pago pendiente en backend

        return { ...prev, pagos }
      }

      // Si todos los pagos están pagados, simplemente agrego uno nuevo
      return {
        ...prev,
        pagos: [
          ...prev.pagos,
          {
            id: crypto.randomUUID(),
            titulo,
            porcentaje: porcentajeRestante,
            monto: (prev.total * porcentajeRestante) / 100,
            estado: "pendiente",
          },
        ],
      }

      // @todo api post: crear pago cuando ya no hay pendientes
    })
  }

  // Solo expongo lo que la UI necesita usar
  return {
    pagos: prestamo.pagos,
    porcentajeRestante,
    puedePagar,
    pagarPago,
    crearNuevoPago,
  }
}
