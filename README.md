# 💳 Módulo de Pagos – Frontend

Este proyecto es un módulo de pagos construido en **React + TypeScript**, enfocado en manejar pagos parciales de un préstamo de forma clara, ordenada y fácil de entender.

Es un proyecto sencillo, pero hecho con cariño, buenas prácticas y pensando desde el inicio en cómo podría crecer a futuro.

---

## 🚀 ¿Qué hace la aplicación?

La aplicación permite:

- Ver un préstamo con un **total a pagar**
- Dividir ese total en **pagos parciales**
- Registrar pagos por **porcentaje**
- Elegir **método de pago** (efectivo, transferencia, tarjeta, etc.)
- Ver cuánto **porcentaje y dinero queda pendiente**
- Agregar nuevos pagos de forma progresiva
- Evitar errores comunes (pagar más de lo permitido, pagar fuera de orden, etc.)

Todo se maneja de forma visual, clara y guiada para el usuario.

---

## 🧠 ¿Cómo funciona?

- El préstamo siempre empieza con un **anticipo**
- Cada pago depende del anterior (no se puede pagar el siguiente si el anterior no está pagado)
- El sistema controla que nunca se supere el **100% del total**
- Los pagos se pueden dividir si el usuario quiere más control
- La UI responde rápido porque todo se maneja primero en el frontend

---

## 🧱 ¿Por qué usé Clean Code y una arquitectura ordenada?

Desde el inicio quise que el código fuera:

- Fácil de leer
- Fácil de mantener
- Fácil de explicar en una entrevista

Por eso:

- Separé la **lógica** en hooks (`usePagos`)
- Dejé los **componentes** solo para la interfaz
- Usé una carpeta `domain` para los tipos y reglas del negocio
- Evité mezclar lógica con JSX
- Usé nombres claros y estados simples

No es un proyecto grande, pero está pensado como si fuera a crecer.

---

## ✨ ¿Qué hace especial este proyecto?

- Está pensado desde el punto de vista del usuario
- Tiene reglas reales (no solo botones bonitos)
- El código es fácil de seguir, incluso para alguien nuevo
- No intenta impresionar con cosas innecesarias
- Refleja cómo pienso y cómo organizo mi trabajo

---

## 🙌 Agradecimientos

Gracias a **Iprocess** por la oportunidad de mostrar este proyecto.  
Fue desarrollado con mucho aprendizaje, dedicación y ganas de mejorar como desarrollador.

---

## ❤️ Hecho con amor

Este proyecto fue hecho con mucho cuidado y atención al detalle por:

**Yeiner Estiven Aguirre Quirama**  
Frontend Developer (en crecimiento 🚀)

Gracias por tomarse el tiempo de revisarlo.
