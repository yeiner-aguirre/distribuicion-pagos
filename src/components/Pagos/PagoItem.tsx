import type { Pago } from "../../domain/pago"

interface Props {
  pago: Pago
  indice: number
  puedePagar: boolean
  onPagar: () => void
}

const metodoLabel: Record<string, string> = {
  efectivo: "Efectivo",
  transferencia: "Transferencia",
  tarjeta: "Tarjeta",
  nequi: "Nequi",
  daviplata: "Daviplata",
}

export function PagoItem({
  pago,
  indice,
  puedePagar,
  onPagar,
}: Props) {
  return (
    <div className="flex flex-col items-center min-w-[150px]">
      {/* CÍRCULO */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold
          ${
            pago.estado === "pagado"
              ? "bg-green-500 border-green-500 text-white"
              : "border-[#ff5a5f] text-[#ff5a5f]"
          }`}
      >
        {indice + 1}
      </div>

      {/* INFO */}
      <div className="mt-3 text-center space-y-1">
        <p className="text-sm font-medium">{pago.titulo}</p>
        <p className="text-xs text-gray-500">{pago.porcentaje}%</p>
        <p className="text-xs text-gray-700">{pago.monto}</p>

        {/* MÉTODO DE PAGO */}
        {pago.estado === "pagado" && pago.metodoPago && (
          <span className="inline-block mt-1 px-2 py-0.5 text-[11px] rounded-full bg-green-100 text-green-700">
            {metodoLabel[pago.metodoPago]}
          </span>
        )}
      </div>

      {/* BOTÓN PAGAR */}
      {pago.estado === "pendiente" && puedePagar && (
        <button
          onClick={onPagar}
          className="mt-3 px-3 py-1 text-xs rounded-md
                     bg-[#ff5a5f] text-white hover:bg-[#e14b50]"
        >
          Pagar
        </button>
      )}
    </div>
  )
}
