# Instrucciones para GitHub Copilot

Estas instrucciones son OBLIGATORIAS para todo el código generado, donde se debe priorizar la seguridad, el cumplimiento regulatorio, la trazabilidad y la mantenibilidad.

---

## 1. Reglas Generales de Codificación
Alineadas a:
- ISO/IEC 25010: define un modelo integral para evaluar la calidad del software y los sistemas
- ISO 27001: estándar internacional líder para gestionar la seguridad de la información

### 1.1 Reglas técnicas de código (obligatorias)

Copilot debe:

- Generar solo código claro, legible y mantenible.
- Dividir funciones complejas en componentes pequeños.
- No duplicar lógica.
- Manejar errores de forma explícita.
- Usar nombres descriptivos.
- Documentar APIs y funciones críticas.
- Evitar código muerto o sin uso.

### 1.2 Reglas de proceso (guía)

Estas reglas orientan el trabajo, **pero NO son un bloqueo**:

- Dividir tareas grandes en pasos pequeños.
- Proponer planes antes de implementar cambios grandes.
- Documentar decisiones técnicas relevantes.
- Indicar riesgos o supuestos antes de continuar.

---

## 2. Manejo de Datos Sensibles
Alineado a:
- ISO 27001: estándar internacional líder para gestionar la seguridad de la información
- PCI DSS (Payment Card Industry Data Security Standard): conjunto de normas de seguridad obligatorias para cualquier entidad que almacene, procese o transmita datos de tarjetas de crédito o débito
- GDPR (General Data Protection Regulation): Establece un control estricto sobre el consentimiento, la seguridad y el tratamiento de datos, con sanciones graves

- NO DEBE:
  - Hardcodear credenciales, tokens, secretos, claves, certificados. Es decir, no permitas ni sugieras este tipo de valores sensibles en el código.
  - Incluir datos personales o financieros en logs.
  - Retornar información sensible en mensajes de error.

- SIEMPRE:
  - Usar variables de entorno o servicios de gestión de secretos.
  - Enmascarar datos sensibles (ej: ****1234).
  - Validar el uso mínimo de datos (data minimization).

Ejemplos de datos sensibles:
- Passwords
- Tokens
- Claves API
- Números de cuenta
- PAN, CVV, PIN
- Identificadores personales

---

## 3. Validación de Entradas y Salidas
Alineadas a:
- OWASP Top 10: documento de los diez riesgos de seguridad más importantes en aplicaciones web según la Fundación OWASP

- Validar TODA entrada externa:
  - APIs
  - Archivos
  - Formularios
  - Mensajes
- Rechazar entradas inválidas explícitamente.
- No confiar en validaciones del cliente.
- Usar listas blancas (allowlists) cuando sea posible.

Prevención obligatoria contra:
- SQL Injection
- Command Injection
- XSS
- Path Traversal
- Deserialización insegura

---

## 4. Autenticación y Autorización
Alineado a:
- NIST SSDF: Secure Software Development Framework, Proporciona un conjunto estructurado de prácticas destinadas a reducir las vulnerabilidades, mejorar la resiliencia y alinear la seguridad del software con los objetivos organizacionales.
- OWASP: Open Web Application Security Project, proyecto dedicado a determinar y combatir las causas que hacen que el software sea inseguro.

- No implementar autenticación propia si existe un mecanismo corporativo.
- Validar autorización en cada operación sensible.
- Aplicar principio de mínimo privilegio.
- No asumir permisos por contexto.
- Separar claramente:
  - Autenticación
  - Autorización
  - Identidad

---

## 5. Manejo de Errores y Excepciones
(Alineado a ISO 27001, OWASP)

- No exponer:
  - Stack traces
  - Mensajes internos
  - Detalles de infraestructura
- Usar mensajes controlados hacia el usuario.
- Registrar errores técnicos SOLO en logs internos.
- Clasificar errores (cliente, negocio, sistema).

---

## 6. Logging y Auditoría
(Alineado a ISO 27001, COBIT)

- Incluir logs estructurados para:
  - Operaciones críticas
  - Cambios de estado
  - Eventos de seguridad
- Los logs deben:
  - Ser trazables
  - Tener identificadores de correlación
  - NO contener datos sensibles
- Facilitar auditoría y análisis forense.

---

## 7. Uso de Criptografía
(Alineado a ISO 27001, PCI DSS)

- No implementar algoritmos criptográficos manualmente.
- Usar librerías estándar aprobadas.
- Usar algoritmos fuertes y actuales.
- No usar:
  - MD5
  - SHA1
  - Cifrados obsoletos
- Proteger claves criptográficas adecuadamente.

---

## 8. Dependencias y Librerías
(Alineado a NIST SSDF, Supply Chain Security)

- No sugerir ni implementar librerías no mantenidas, inseguras u obsoletas.
- Evitar dependencias innecesarias.
- Preferir librerías:
  - Oficiales
  - Bien documentadas
  - Con mantenimiento activo
- No copiar código de fuentes no confiables.

---

## 9. Desarrollos basados en Docker (RECOMENDADO)

**Para proyectos con contenedores, aplica el desarrollo exclusivo para ese fin:**

- **Evitar scripts de desarrollo locales**: cuando el proyecto esté orientado a contenedores, evita usar scripts como start.ps1, stop.ps1, npm run dev.
- **Prioriza Docker Compose**: todos los servicios se deben ejecutar en contenedores.
- **Probar en contenedores**: todas las funciones deben trabajar correctamente en un entorno contenedorizado.
- **Configurar las actualizaciones en caliente**: los contenedores de desarrollo deben admitir actualizaciones en vivo.
- **Documentar el flujo de trabajo de Docker**: instrucciones claras para la gestión de contenedores.

**Ventajas de usar Docker-First:**
- Paridad entre producción y desarrollo (mismo entorno en todas partes).
- Elimina los problemas del tipo "funciona en mi máquina".
- Incorporación más fácil para los nuevos desarrolladores.
- Comportamiento coherente entre los miembros del equipo.
- Aislamiento y gestión de recursos integrados.

**¿Cuándo aplicar Docker-First?:**
- Arquitecturas de microservicios.
- Aplicaciones multiservicio.
- Aplicaciones contenedorizadas implementadas en producción.
- Equipos con entornos locales variables.

**Para proyectos nuevos o productivos con despliegues a contenedores, debes priorizar Docker-First. Todas aquellas EXCEPCIONES deben estar justificadas y documentadas.**

---

## 10. Configuración y Ambientes
(Alineado a ISO 27001, DevSecOps)

- Separar configuración del código por ambiente de ser posible.
- No asumir valores por defecto inseguros.
- Soportar múltiples ambientes (dev, test, prod).
- No incluir configuraciones específicas de producción en el código.
- No es recomendable versionar archivos de configuración, como archivos .env o similares.

---

## 11. Desarrollo basado en pruebas (TDD)
(Alineado a ISO 25010, NIST SSDF)

### 11.1 Reglas OBLIGATORIAS
- No generar código productivo sin al menos una prueba asociada.
- Toda lógica crítica debe tener pruebas, tales como:
  - Autenticación
  - Autorización
  - Pagos
  - Persistencia
  - Cáculos financieros
  - Validación de negocio
- El código debe compilar y ejecutar sin errores.
- Las pruebas deben ejecutarse sin fallos antes de proponer el cambio.

### 11.2 Reglas RECOMENDADAS (opcionales pero como objetivo)
- Mantener una cobertura mínima del 80%.
- Priorizar pruebas unitarias sobre manuales.
- Automatizar pruebas de regresión.

### 11.3 Regla de cero tolerancia

**Siempre que sea técnicamente posible, debes tener como prioridad resolver los errores antes de continuar con las demás tareas y no deberías dejar trabajos incompletos.**

- Cuando un bug sea encontrado, debes PRIORIZAR la corrección antes de continuar.
- Analizar la causa raíz del bug.
- Corregir el error por completo.
- Verificar que la corrección esté completa con pruebas.
- Cuando lo anterior esté verificado y listo, puedes continuar con la siguiente tarea.

### Ciclo obligatorio de corrección

Antes de proponer código, Copilot debe seguir este flujo:

1. Detectar el error
2. Analizar la causa
3. Proponer corrección
4. Proponer prueba
5. Verificar impacto

Si el problema no queda resuelto, debes priorizar seguir los pasos anteriores hasta que el problema quede RESUELTO.

### Cuando te encuentres en un punto muerto

1. **SUGIERE** alternativas basadas en buenas prácticas.
2. **REALIZA** preguntas para aclarar. Pregunta por requisitos, objetivos, límites.
3. **PROPÓN** varios enfoques. Ofrece alternativas para elegir la mejor.
4. **ESPERA** a que el usuario dé su opinión, corrija o elija el camino a seguir.

**Un código sin pruebas es un código INCOMPLETO.**

---

## 12. Restricciones Explícitas
(Alineado a Cumplimiento Regulatorio)

- No sugerir soluciones que violen políticas internas.
- No generar código que eluda controles de seguridad.
- No generar puertas traseras o accesos ocultos.
- No sugerir deshabilitar validaciones de seguridad.

---

## 13. Revisión Asistida de Pull Requests

Cuando se solicite ayuda para revisar un Pull Request, debes:

- Analizar los mensajes de commit y verificar que cumplan el estándar Conventional Commits.
- Indicar claramente qué commits no cumplen y por qué.
- Revisar la descripción del PR y señalar campos faltantes.
- Advertir sobre posibles incumplimientos de:
  - Seguridad
  - Manejo de datos sensibles
  - Validación de entradas
- NO bloquear ni rechazar el Pull Request.
- Proveer recomendaciones claras y accionables para corregir los puntos detectados.

El objetivo es orientar al desarrollador antes de completar el Pull Request.

---

## 14. Documentación

- Cada función o método debería tener documentación, en especial aquellos que son críticos o complejos.
- Toda lógica compleja requiere comentarios en línea.
- Crea archivos README.md para cada componente.
- Mantener actualizado el archivo de manifiesto (manifest.md).

---

## 15. Guardrails obligatorios

Copilot **DEBE EVITAR**:

- Generar credenciales.
- Recibir valores sensibles y procesarlos. Indicar al usuario de la violación en la que ha incurrido.
- Generar datos reales de clientes, siempre deben ser datos aleatorios.
- Usar algoritmos inseguros (MD5, SHA1, ECB)
- Omitir validación de entradas.
- Desactivar controles de seguridad.

---

## 16. Clasificación de la información

Antes de generar código o ejemplos, Copilot debe asumir uno de estos niveles:

- Pública: sin restricciones
- Interna: solo uso corporativo
- Confidencial: datos sensibles
- Regulada: PII, PCI, datos financieros

Regla:
Si el nivel no es indicado, Copilot debe asumir **Confidencial** por defecto.

---

## 17. Seguridad de la cadena de suministro (Supply Chain)

Copilot debe:

- Usar solo dependencias activamente mantenidas.
- Evitar librerías sin licencias claras.
- No usar paquetes con vulnerabilidades críticas.
- Proponer herramientas de escaneo de dependencias.
- Sugerir generación de SBOM.
- Recomendar verificación de firmas cuando aplique.

---

## 18. Principio Final
Ante duda:
- Priorizar seguridad sobre conveniencia.
- Priorizar cumplimiento sobre velocidad.
- Priorizar claridad sobre complejidad.

Cualquier excepción a estas reglas debe:
- Estar documentada
- Ser aprobada
- Tener justificación de riesgo

---

**Versión**: 1.0.0  
**Última actualización**: enero de 2026  
**Nivel de aplicación**: OBLIGATORIO