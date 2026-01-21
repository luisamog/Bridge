// Data Model - Section 1: Bridge Service Details
const projects = [
    {
        client: "Banco Futuro",
        project: "Migración Cloud",
        serviceType: "CloudOps",
        region: "SOLA",
        creationDate: "2025-01-20",
        startDate: "2025-01-28", // 8 days -> Attention
        endDate: "2025-04-20",
        assignedHours: 30,
        consumedHours: 12,
        stage: "Ejecución",
        fundsPaid: true,
        newBusiness: true
    },
    {
        client: "Seguros Alianza",
        project: "Portal de Clientes",
        serviceType: "Bridge",
        region: "NOLA",
        creationDate: "2025-03-01",
        startDate: "", // Backlog -> Calc from Today
        endDate: "",
        assignedHours: 30,
        consumedHours: 0,
        stage: "Backlog",
        fundsPaid: false,
        newBusiness: false
    },
    {
        client: "Retail Express",
        project: "App Logística",
        serviceType: "CloudOps",
        region: "SOLA",
        creationDate: "2024-09-01",
        startDate: "2024-09-07", // 6 days -> Attention
        endDate: "2024-11-30",
        assignedHours: 30,
        consumedHours: 28,
        stage: "Cierre",
        fundsPaid: true,
        newBusiness: true
    },
    {
        client: "Fintech Nova",
        project: "Integración API",
        serviceType: "Bridge",
        region: "NOLA",
        creationDate: "2025-02-20",
        startDate: "2025-02-23", // 3 days -> On Track
        endDate: "2025-04-30",
        assignedHours: 30,
        consumedHours: 5,
        stage: "Levantamiento",
        fundsPaid: false,
        newBusiness: true
    },
    {
        client: "Constructora Global",
        project: "ERP Interno",
        serviceType: "CloudOps",
        region: "SOLA",
        creationDate: "2024-11-01",
        startDate: "2024-11-05", // 4 days -> On Track
        endDate: "2025-01-20",
        assignedHours: 30,
        consumedHours: 15,
        stage: "Ejecución",
        fundsPaid: true,
        newBusiness: false
    },
    {
        client: "EduTech",
        project: "Plataforma LMS",
        serviceType: "Bridge",
        region: "NOLA",
        creationDate: "2024-06-01",
        startDate: "2024-06-15", // 14 days -> Critical
        endDate: "2024-08-30",
        assignedHours: 30,
        consumedHours: 30,
        stage: "Cierre",
        fundsPaid: true,
        newBusiness: false
    },
    {
        client: "Salud Plus",
        project: "Telemedicina",
        serviceType: "Bridge",
        region: "SOLA",
        creationDate: "2025-01-01",
        startDate: "",
        endDate: "",
        assignedHours: 30,
        consumedHours: 0,
        stage: "Suspendido",
        fundsPaid: false,
        newBusiness: false
    },
    {
        client: "Logistica Fast",
        project: "Tracking App",
        serviceType: "CloudOps",
        region: "SOLA",
        creationDate: "2025-01-15",
        startDate: "2025-01-22", // 7 days -> Attention
        endDate: "2025-03-30",
        assignedHours: 30,
        consumedHours: 10,
        stage: "Ejecución",
        fundsPaid: true,
        newBusiness: true
    }
];

// Options for Select Fields
const REGIONS = ['NOLA', 'SOLA'];
const STAGES = ['Backlog', 'Levantamiento', 'Ejecución', 'Cierre', 'Suspendido'];
const SERVICE_TYPES = ['Bridge', 'CloudOps'];

// --- HELPER FUNCTIONS ---
const calculateDaysDiff = (d1, d2) => {
    if (!d1) return 0;
    const date1 = new Date(d1);
    const date2 = d2 ? new Date(d2) : new Date();
    const diff = Math.abs(date2 - date1);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const calculateWeeksDiff = (d1, d2) => {
    const days = calculateDaysDiff(d1, d2);
    return (days / 7).toFixed(1);
};

// --- RENDER FUNCTIONS ---

function renderApp() {
    renderKPIs();
    renderCharts();
    renderTable();
}

function renderKPIs() {
    // 1. SLA Promedio (Start Date -> End Date)
    let totalDuration = 0;
    let countDuration = 0;
    projects.forEach(p => {
        if (p.startDate && p.endDate) {
            totalDuration += calculateDaysDiff(p.startDate, p.endDate);
            countDuration++;
        }
    });
    const avgSLA = countDuration ? (totalDuration / countDuration).toFixed(0) : 0;

    // 2. Total en Backlog
    const backlogCount = projects.filter(p => p.stage === 'Backlog').length;

    // 3. Levantamiento
    const levantamientoCount = projects.filter(p => p.stage === 'Levantamiento').length;

    // 4. En Ejecución
    const ejecucionCount = projects.filter(p => p.stage === 'Ejecución').length;

    // 5. Cerrados
    const cerradosCount = projects.filter(p => p.stage === 'Cierre').length;

    // 6. Tasa de Conversión
    const newBusinessCount = projects.filter(p => p.stage === 'Cierre' && p.newBusiness).length;
    const conversionRate = cerradosCount
        ? Math.round((newBusinessCount / cerradosCount) * 100)
        : 0;

    // Update DOM
    document.getElementById('kpi-sla').textContent = `${avgSLA} días`;
    document.getElementById('kpi-backlog').textContent = backlogCount;
    document.getElementById('kpi-levantamiento').textContent = levantamientoCount;
    document.getElementById('kpi-ejecucion').textContent = ejecucionCount;
    document.getElementById('kpi-cerrados').textContent = cerradosCount;
    document.getElementById('kpi-conversion').textContent = `${conversionRate}%`;

    document.getElementById('kpi-sla').style.color = '#2E3D53';
}

function renderCharts() {
    // 1. Cycle Time Histogram (Bar Chart)
    // Added 'Backlog' stage
    const stagesForChart = ['Backlog', 'Levantamiento', 'Ejecución', 'Cierre'];

    const avgWeeksPerStage = stagesForChart.map(stage => {
        let totalWeeks = 0;
        let count = 0;

        if (stage === 'Backlog') {
            // Backlog Duration: Creation -> Start
            projects.forEach(p => {
                if (p.startDate && p.creationDate) {
                    totalWeeks += parseFloat(calculateWeeksDiff(p.creationDate, p.startDate));
                    count++;
                }
            });
        } else {
            // Other Stages: Duration within stage (simplified to Start->End for now as per previous logic)
            // Note: Ideally this should be stage-specific duration, but keeping consistent with previous "Start->End" logic for active stages
            // or refining if needed. For now, we'll keep the previous logic for non-backlog but filter by stage.
            // Actually, the previous logic was:
            // const projs = projects.filter(p => p.stage === stage);
            // totalWeeks = projs.reduce... calculateWeeksDiff(p.startDate, p.endDate)
            // This calculates the *Project Duration* for projects *currently in that stage*.
            // Let's stick to that for consistency, or improve if the user meant "Time spent IN that stage".
            // Given "Ciclo de Tiempo Estándar", it usually means total cycle time.
            // But the request specifically asked for "Backlog: Tiempo transcurrido entre backlog y levantamiento".

            const projs = projects.filter(p => p.stage === stage);
            if (projs.length > 0) {
                totalWeeks = projs.reduce((acc, p) => {
                    return acc + parseFloat(calculateWeeksDiff(p.startDate, p.endDate));
                }, 0);
                count = projs.length;
            }
        }

        return count ? (totalWeeks / count).toFixed(1) : 0;
    });

    const ctxCycle = document.getElementById('cycleTimeChart');
    if (ctxCycle) {
        drawBarChart(ctxCycle, stagesForChart, avgWeeksPerStage, '#38E0A8', 'Semanas Promedio');
    }

    const distributionCounts = STAGES.map(s => projects.filter(p => p.stage === s).length);
    const ctxDist = document.getElementById('distributionChart');
    if (ctxDist) {
        drawPieChart(ctxDist, distributionCounts, STAGES);
    }
}

function renderTable() {
    const tbody = document.getElementById('bridge-table-body');
    tbody.innerHTML = '';

    projects.forEach((p, index) => {
        // SLA Status Logic
        const slaDays = calculateDaysDiff(p.creationDate, p.startDate || new Date());
        let slaLabel = 'On Track';
        let slaClass = 'badge-sla-track';

        if (slaDays > 10) {
            slaLabel = 'Crítico';
            slaClass = 'badge-sla-critical';
        } else if (slaDays >= 5) {
            slaLabel = 'Atención';
            slaClass = 'badge-sla-attention';
        }

        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td class="col-client">${p.client}</td>
            <td class="col-project">${p.project}</td>
            <td>
                <select class="editable-select" onchange="updateProject(${index}, 'serviceType', this.value)">
                    ${SERVICE_TYPES.map(t => `<option value="${t}" ${p.serviceType === t ? 'selected' : ''}>${t}</option>`).join('')}
                </select>
            </td>
            <td style="text-align: center;">
                <span class="badge-sla ${slaClass}">${slaLabel}</span>
            </td>
            <td>
                <select class="editable-select" onchange="updateProject(${index}, 'region', this.value)">
                    ${REGIONS.map(r => `<option value="${r}" ${p.region === r ? 'selected' : ''}>${r}</option>`).join('')}
                </select>
            </td>
            <td>
                <input type="date" class="editable-input col-date" value="${p.startDate || ''}" 
                       onchange="updateProject(${index}, 'startDate', this.value)">
            </td>
            <td>
                <input type="date" class="editable-input col-date" value="${p.endDate || ''}" 
                       onchange="updateProject(${index}, 'endDate', this.value)">
            </td>
            <td>
                <input type="number" class="editable-input col-number" value="30" readonly title="Fixed at 30h">
            </td>
            <td>
                <input type="number" class="editable-input col-number" value="${p.consumedHours}" 
                       onchange="updateProject(${index}, 'consumedHours', this.value)">
            </td>
            <td>
                <select class="editable-select" data-value="${p.stage}" onchange="updateProject(${index}, 'stage', this.value); this.dataset.value=this.value;">
                    ${STAGES.map(s => `<option value="${s}" ${p.stage === s ? 'selected' : ''}>${s}</option>`).join('')}
                </select>
            </td>
            <td>
                <select class="editable-select col-select" onchange="updateProject(${index}, 'fundsPaid', this.value === 'true')">
                    <option value="true" ${p.fundsPaid ? 'selected' : ''}>Si</option>
                    <option value="false" ${!p.fundsPaid ? 'selected' : ''}>No</option>
                </select>
            </td>
            <td>
                <select class="editable-select col-select" onchange="updateProject(${index}, 'newBusiness', this.value === 'true')">
                    <option value="true" ${p.newBusiness ? 'selected' : ''}>Si</option>
                    <option value="false" ${!p.newBusiness ? 'selected' : ''}>No</option>
                </select>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.updateProject = (index, field, value) => {
    if (field === 'consumedHours') value = Number(value);
    projects[index][field] = value;
    renderKPIs();
    renderCharts();
    renderTable(); // Re-render table to update SLA status if dates change
};

function drawBarChart(canvas, labels, data, color, yLabel) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const padding = 40;
    const chartHeight = rect.height - padding * 2;
    const chartWidth = rect.width - padding * 2;
    const barWidth = 50;
    const gap = (chartWidth - (barWidth * data.length)) / (data.length + 1);
    const maxVal = Math.max(...data, 1) * 1.2;

    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, rect.height - padding);
    ctx.lineTo(rect.width - padding, rect.height - padding);
    ctx.strokeStyle = '#eee';
    ctx.stroke();

    data.forEach((val, i) => {
        const x = padding + gap + i * (barWidth + gap);
        const h = (val / maxVal) * chartHeight;
        const y = rect.height - padding - h;

        ctx.fillStyle = color;
        ctx.fillRect(x, y, barWidth, h);

        ctx.fillStyle = '#5F7993';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], x + barWidth / 2, rect.height - 15);

        ctx.fillStyle = '#2E3D53';
        ctx.font = 'bold 12px Inter';
        ctx.fillText(val, x + barWidth / 2, y - 5);
    });
}

function drawPieChart(canvas, data, labels) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const colors = ['#5F7993', '#1976D2', '#38E0A8', '#F57F17', '#C62828'];
    const total = data.reduce((a, b) => a + b, 0);
    let startAngle = 0;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const radius = Math.min(cx, cy) - 40;

    if (total === 0) return;

    data.forEach((val, i) => {
        if (val === 0) return;
        const sliceAngle = (val / total) * 2 * Math.PI;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();

        const midAngle = startAngle + sliceAngle / 2;
        const lx = cx + Math.cos(midAngle) * (radius + 20);
        const ly = cy + Math.sin(midAngle) * (radius + 20);

        ctx.fillStyle = '#2E3D53';
        ctx.font = '10px Inter';
        ctx.textAlign = lx > cx ? 'left' : 'right';
        ctx.fillText(`${labels[i]} (${Math.round(val / total * 100)}%)`, lx, ly);

        startAngle += sliceAngle;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderApp();
});
