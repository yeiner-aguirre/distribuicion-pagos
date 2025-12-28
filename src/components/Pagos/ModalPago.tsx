import { useState } from "react"
import { MONEDA } from "../../constants/moneda"
import type { MetodoPago } from "../../domain/pago"

interface Props {
  porcentajeMaximo: number
  total: number
  onConfirmar: (
    porcentaje: number,
    fecha: Date,
    metodoPago: MetodoPago
  ) => void
  onCerrar: () => void
}

// Defino los métodos de pago como una constante
// para no dejar valores "quemados" dentro del JSX.
// Así es más fácil cambiar labels o agregar métodos después
// sin tocar la lógica del componente.
const METODOS: { id: MetodoPago; label: string }[] = [
  { id: "efectivo", label: "💵 Efectivo" },
  { id: "transferencia", label: "🏦 Transferencia" },
  { id: "tarjeta", label: "💳 Tarjeta" },
  { id: "nequi", label: "📱 Nequi" },
  { id: "daviplata", label: "📲 Daviplata" },
]

export function ModalPago({
  porcentajeMaximo,
  total,
  onConfirmar,
  onCerrar,
}: Props) {
  // Uso estado local porque este modal solo vive mientras
  // el usuario está registrando el pago.
  // No vale la pena llevar esto a un estado global.
  const [porcentaje, setPorcentaje] = useState(0)
  const [fecha, setFecha] = useState("")
  const [metodoPago, setMetodoPago] = useState<MetodoPago>("efectivo")

  // El monto se calcula en el frontend solo para dar feedback inmediato.
  // La fuente de verdad real debería ser el backend.
  const monto = (total * porcentaje) / 100

  // Limito la fecha mínima a hoy para evitar pagos con fechas pasadas
  // y reducir validaciones innecesarias más adelante.
  const hoy = new Date().toISOString().split("T")[0]

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm space-y-4">
        <h3 className="text-lg font-semibold text-[#ff5a5f]">
          Registrar pago
        </h3>

        <div>
          <label className="text-sm">
            Porcentaje (máx {porcentajeMaximo}%)
          </label>

          {/* Valido el porcentaje desde el input para evitar
              manejar errores más adelante en la lógica */}
          <input
            type="number"
            min={1}
            max={porcentajeMaximo}
            value={porcentaje}
            onChange={(e) => setPorcentaje(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Muestro el monto calculado para que el usuario
            entienda inmediatamente cuánto está pagando */}
        <p className="text-sm">
          Monto: <strong>{monto} {MONEDA}</strong>
        </p>

        <input
          type="date"
          min={hoy}
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        {/* MÉTODO DE PAGO */}
        <div>
          <p className="text-sm mb-2">Método de pago</p>

          {/* Uso botones en vez de un select para que sea más visual
              y rápido de seleccionar en móvil */}
          <div className="grid grid-cols-2 gap-2">
            {METODOS.map((metodo) => (
              <button
                key={metodo.id}
                type="button"
                onClick={() => setMetodoPago(metodo.id)}
                className={`border rounded-lg px-3 py-2 text-sm transition
                  ${
                    metodoPago === metodo.id
                      ? "border-[#ff5a5f] bg-[#ff5a5f]/10 text-[#ff5a5f]"
                      : "border-gray-300 hover:border-[#ff5a5f]"
                  }`}
              >
                {metodo.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          {/* Cerrar el modal no toca estado global,
              solo le delego la acción al componente padre */}
          <button onClick={onCerrar}>Cancelar</button>

          <button
            disabled={
              porcentaje <= 0 ||
              porcentaje > porcentajeMaximo ||
              !fecha
            }
            onClick={() => {
              // Delego la confirmación al padre porque ahí vive
              // la lógica real del pago y la persistencia.
              // @todo: aquí el padre debería hacer un POST a la API
              //        para registrar el pago en backend
              onConfirmar(porcentaje, new Date(fecha), metodoPago)
            }}
            className="bg-[#ff5a5f] text-white px-4 py-2 rounded"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
