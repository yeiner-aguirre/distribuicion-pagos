interface BotonAgregarProps {
  onClick: () => void
}

export function BotonAgregar({ onClick }: BotonAgregarProps) {
  return (
    <button
      onClick={onClick}
      className="
        w-9 h-9 rounded-full
        flex items-center justify-center
        bg-[#ff5a5f]/10
        border border-[#ff5a5f]
        text-[#ff5a5f]
        hover:bg-[#ff5a5f]
        hover:text-white
        transition-all
        shadow-sm
      "
      title="Agregar pago"
    >
      +
    </button>
  )
}
