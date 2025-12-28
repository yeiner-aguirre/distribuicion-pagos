export function formatearNumeroVisual(valor: number): string {
  const redondeado = Math.round(valor * 10) / 10

  if (Number.isInteger(redondeado)) {
    return redondeado.toString()
  }

  return redondeado.toFixed(1)
}

