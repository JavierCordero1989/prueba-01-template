---
name: Crear mensaje de commit
agent: copilot-chat
description: Genera mensajes de commit siguiendo las reglas de commits convencionales
command: /crear-mensaje-commit
---
Lee y aplica OBLIGATORIAMENTE las reglas definidas en:

.github/instructions/copilot-standards.instructions.md

Instrucciones:

1. Analiza los cambios pendientes (git diff).
2. Clasifica los cambios por tipo.
3. Genera mensajes de commit completos usando las reglas del archivo de instrucciones.
4. Prioriza cambios de tipo security.
5. Si hay riesgos, muéstralos antes del mensaje.
6. Devuelve solo los mensajes finales listos para copiar.
7. Detecta y alerta sobre posibles riesgos:
  * Datos sensibles
  * Credenciales o tokens
  * Violaciones de seguridad corporativa.
8. Genera mensajes separados por tipo de cambio, con seguridad primero.
9. Si algún cambio es ambiguo, formula preguntas de aclaración antes de generar el commit.
10. Genera solo los mensajes de commit completos, listos para usar, nada más.
11. Muestra estas alertas antes de generar los mensajes.

Si alguna regla es violada, debes indicarlo al usuario para que proceda a realizar las correcciones pertinentes antes de hacer el commit.
