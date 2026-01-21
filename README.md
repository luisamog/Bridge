# Bridge Project Health Tracker

Este proyecto es un dashboard interactivo diseñado para el seguimiento y control de la salud de los proyectos de **Bridge** y **CloudOps**. Permite visualizar indicadores clave de desempeño (KPIs), gráficos de ciclo de tiempo y una gestión detallada de cada servicio.

## 🚀 Características Principales

### 1. Tablero de Control (KPIs)
Visualización rápida de 6 indicadores estratégicos:
- **SLA Promedio**: Duración promedio de los proyectos (Inicio a Fin).
- **Total en Backlog**: Cantidad de proyectos en espera.
- **Levantamiento**: Proyectos en fase de definición.
- **En Ejecución**: Proyectos activos.
- **Cerrados**: Total de proyectos finalizados.
- **Tasa de Conversión**: Porcentaje de proyectos cerrados que generaron nuevo negocio.

### 2. Gráficos de Análisis
- **Ciclo de Tiempo Estándar (Histograma)**: Muestra la duración promedio (en semanas) por cada fase:
  - *Backlog*: Tiempo desde creación hasta inicio.
  - *Levantamiento, Ejecución, Cierre*: Duración propia de la fase.
- **Distribución por Fase (Torta)**: Porcentaje de proyectos en cada estado actual.

### 3. Detalle de Servicios (Data Grid)
Tabla detallada con capacidad de edición en línea para:
- Asignación de Tipo de Servicio (Bridge/CloudOps).
- Gestión de Fechas (Inicio/Fin).
- Control de Horas (Asignadas fijas en 30h / Consumidas).
- Cambio de Etapas y Estados Financieros.
- **Semáforo de Estado SLA**: Indicador visual automático.

---

## 📋 Reglas de Negocio

### Definiciones de SLA
1. **SLA Promedio Global**: Se calcula como el promedio de días transcurridos entre la `Fecha Inicio` y la `Fecha Fin` de todos los proyectos.
2. **Meta Backlog**: Un proyecto no debe permanecer más de **5 días** en estado de Backlog.
3. **Meta Ejecución**: La duración máxima esperada para la ejecución es de **3 meses**.

### Semáforo de Estado SLA (Columna "Estado SLA")
Este indicador evalúa la agilidad en el inicio del proyecto. Se calcula midiendo el tiempo transcurrido entre la **Fecha de Creación** (entrada al Backlog) y la **Fecha de Inicio** (paso a Levantamiento).

| Estado | Regla (Días Transcurridos) | Color |
| :--- | :--- | :--- |
| **On Track** | Menor a 5 días | 🟢 Verde |
| **Atención** | Entre 5 y 10 días | 🟠 Naranja |
| **Crítico** | Mayor a 10 días | 🔴 Rojo |

### Ciclo de Tiempo (Gráfico)
- **Barra Backlog**: Representa el tiempo promedio que los proyectos esperan antes de ser atendidos (Fecha Inicio - Fecha Creación).

---

## 🛠️ Tecnologías
- **HTML5**: Estructura semántica.
- **CSS3**: Diseño responsivo, variables CSS para theming (Brand ARKHO) y estilos de "Data Grid".
- **JavaScript (Vanilla)**: Lógica de negocio, manipulación del DOM y renderizado de gráficos (Canvas API).

## 📦 Instalación y Uso
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/luisamog/Bridge.git
   ```
2. Abrir el archivo `index.html` en cualquier navegador web moderno.

---
**ARKHO Bridge** - Herramienta de Gestión de Proyectos.
