document.addEventListener('DOMContentLoaded', () => {
    // Obtener parámetro de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const grado = urlParams.get('grado') || '1A';

    const gradeSelect = document.getElementById('grade-select');
    const scheduleTable = document.getElementById('schedule-table');

    // Establecer el valor del select
    gradeSelect.value = grado;

    // Cargar horario inicial
    loadSchedule(grado);

    // Event listener para cambiar de grado
    gradeSelect.addEventListener('change', (e) => {
        loadSchedule(e.target.value);
        // Actualizar URL sin recargar
        window.history.pushState(null, '', `horarios.html?grado=${e.target.value}`);
    });

    function loadSchedule(grade) {
        if (scheduleData[grade]) {
            // Agrupar por día
            const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
            const now = new Date();
            const currentDay = now.getDay() - 1; // 0=Lunes, 1=Martes...
            const currentHour = now.getHours() + (now.getMinutes() / 60);

            let tableHTML = `
                <thead>
                    <tr>
                        <th>Hora</th>
                        ${days.map((dia, index) =>
                `<th class="${index === currentDay ? 'current-day' : ''}">${dia}</th>`
            ).join('')}
                    </tr>
                </thead>
                <tbody>
            `;

            // Suponemos que las horas son las mismas para todos los días
            const hours = [...new Set(scheduleData[grade].map(item => item.hora))].sort();

            hours.forEach(hora => {
                const [start, end] = hora.split('-').map(time => {
                    const [h, m] = time.split(':');
                    return parseInt(h) + (parseInt(m) / 60);
                });

                tableHTML += `<tr>`;
                tableHTML += `<td>${hora}</td>`;

                days.forEach((dia, diaIndex) => {
                    const clase = scheduleData[grade].find(item =>
                        item.dia === dia && item.hora === hora
                    );

                    let cellClass = '';
                    if (diaIndex === currentDay && currentHour >= start && currentHour <= end) {
                        cellClass = 'current-class';
                    }

                    tableHTML += `<td class="${cellClass}">`;
                    if (clase) {
                        tableHTML += `
                            <div class="course-name">${clase.curso}</div>
                            <div class="course-teacher">${clase.docente}</div>
                        `;
                    }
                    tableHTML += `</td>`;
                });

                tableHTML += `</tr>`;
            });

            tableHTML += `</tbody>`;
            scheduleTable.innerHTML = tableHTML;
        } else {
            scheduleTable.innerHTML = `
                <tr>
                    <td colspan="6">No hay horario disponible para este grado.</td>
                </tr>
            `;
        }
    }
});