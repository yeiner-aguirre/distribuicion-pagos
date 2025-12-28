import { useState } from "react"
import { usePagos } from "../../hooks/usePagos"
import { PagoItem } from "./PagoItem"
import { BotonAgregar } from "./BotonAgregar"
import { ModalPago } from "./ModalPago"
import { ModalCrearPago } from "./ModalCrearPago"
import { MONEDA } from "../../constants/moneda"

interface Props {
  total: number
}

export function Pagos({ total }: Props) {
  /**
   * Uso un custom hook para manejar toda la lógica de pagos.
   * La idea es que este componente solo se encargue de la UI
   * y de coordinar acciones, no de reglas de negocio.
   */
  const {
    pagos,
    porcentajeRestante,
    puedePagar,
    pagarPago,
    crearNuevoPago,
  } = usePagos(total)

  /**
   * Guardo el índice del pago que el usuario quiere pagar.
   * Uso un índice y no el objeto completo para mantener
   * una referencia simple y evitar estados duplicados.
   */
  const [indicePago, setIndicePago] = useState<number | null>(null)

  /**
   * Este estado solo controla si se muestra o no el modal
   * para crear un nuevo pago. Prefiero manejarlo acá
   * para que el modal sea lo más tonto posible.
   */
  const [mostrarCrear, setMostrarCrear] = useState(false)

  return (
    <section className="max-w-5xl bg-white rounded-xl shadow p-6">
      <header className="flex justify-between mb-8">
        <h2 className="text-lg font-semibold text-[#ff5a5f]">Pagos</h2>

        {/* 
          Muestro el porcentaje y el monto restante aquí
          porque es información global del préstamo,
          no de un pago específico.
        */}
        <p>
          Restante:{" "}
          <strong>
            {porcentajeRestante}% (
            {(total * porcentajeRestante) / 100} {MONEDA})
          </strong>
        </p>
      </header>

      {/* 
        Renderizo los pagos en horizontal porque normalmente
        representan un flujo o una secuencia.
        El scroll horizontal evita que se rompa el diseño
        cuando hay muchos pagos.
      */}
      <div className="flex items-center gap-6 overflow-x-auto pb-4">
        {pagos.map((pago, i) => (
          <div key={pago.id} className="flex items-center gap-4">
            <PagoItem
              pago={pago}
              indice={i}
              puedePagar={puedePagar(i)}
              /**
               * No pago directamente aquí.
               * Solo guardo qué pago quiere pagar el usuario
               * y dejo que el modal maneje el resto.
               */
              onPagar={() => setIndicePago(i)}
            />

            {/*
              El botón para agregar un nuevo pago solo aparece
              si aún queda porcentaje por pagar.
              Esto evita que el usuario cree pagos innecesarios.
            */}
            {porcentajeRestante > 0 && (
              <BotonAgregar onClick={() => setMostrarCrear(true)} />
            )}
          </div>
        ))}
      </div>

      {/*
        Modal para registrar un pago.
        Se abre solo cuando hay un índice seleccionado.
      */}
      {indicePago !== null && (
        <ModalPago
          porcentajeMaximo={porcentajeRestante}
          total={total}
          onCerrar={() => setIndicePago(null)}
          onConfirmar={(porcentaje, fecha, metodoPago) => {
            /**
             * Primero actualizo el estado local para que la UI
             * responda rápido.
             *
             * //@todo: api POST /pagos
             * Aquí se enviaría al backend el pago realizado
             * (id del préstamo, porcentaje, fecha y método de pago).
             */
            pagarPago(indicePago, porcentaje, fecha, metodoPago)

            // Cierro el modal después de confirmar
            setIndicePago(null)
          }}
        />
      )}

      {/*
        Modal para crear un nuevo pago con un nombre personalizado.
        Separarlo en otro modal hace el código más fácil de leer
        y mantener.
      */}
      {mostrarCrear && (
        <ModalCrearPago
          onCerrar={() => setMostrarCrear(false)}
          onCrear={(titulo) => {
            /**
             * Creo el nuevo pago primero en el frontend
             * para mantener una experiencia fluida.
             *
             * //@todo: api POST /pagos/crear
             * Aquí se debería crear el pago en backend
             * asociado al préstamo.
             */
            crearNuevoPago(titulo)

            setMostrarCrear(false)
          }}
        />
      )}
    </section>
  )
}
