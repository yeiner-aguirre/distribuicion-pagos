import { useState } from "react"

interface Props {
  onCrear: (titulo: string) => void
  onCerrar: () => void
}

export function ModalCrearPago({ onCrear, onCerrar }: Props) {
  const [titulo, setTitulo] = useState("")

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm space-y-4">
        <h3 className="text-lg font-semibold text-[#ff5a5f]">
          Nuevo pago
        </h3>

        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ej: Segunda cuota"
          className="w-full border rounded px-3 py-2"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onCerrar}>Cancelar</button>

          <button
            disabled={!titulo.trim()}
            onClick={() => onCrear(titulo.trim())}
            className="bg-[#ff5a5f] text-white px-4 py-2 rounded"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  )
}
