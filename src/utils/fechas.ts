export function esFechaValida(fecha: Date): boolean {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)

  return fecha >= hoy
}

/*
La validación se hace en una utilidad
para que:
- No dependa del componente
- Sea reutilizable
- Se pueda testear fácilmente
*/
