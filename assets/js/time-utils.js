// utils/time-utils.js

const TimeUtils = (() => {
    const TIME_ZONE = 'America/Lima';

    // Obtener la hora actual como objeto Date ajustado a Lima
    function getNowInLima() {
        const ahora = new Date();
        const options = {
            timeZone: TIME_ZONE,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        const formatter = new Intl.DateTimeFormat('en-CA', options); // YYYY-MM-DD, HH:MM:SS
        const [fecha, hora] = formatter.format(ahora).split(', ');
        return new Date(`${fecha}T${hora}`);
    }

    function getCurrentTime() {
        const now = getNowInLima();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    }

    function getDayName(date = null) {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const limaDate = date ? new Date(date.toLocaleString('en-US', { timeZone: 'America/Lima' })) : getNowInLima();
        return days[limaDate.getDay()];
    }

    function timeToMinutes(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    }

    function formatCountdown(minutes) {
        if (minutes <= 0) return '';

        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        let parts = [];
        if (hours > 0) parts.push(`${hours}h`);
        if (mins > 0) parts.push(`${mins}m`);

        return parts.join(' ');
    }

    // Función para formatear fechas en español
    function formatDate(dateString, options = {}) {
        // Opciones por defecto
        const defaultOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            timeZone: TIME_ZONE
        };

        // Combinar con opciones personalizadas
        const formatOptions = { ...defaultOptions, ...options };

        // Parsear y formatear la fecha
        const date = parseDateForLima(dateString);
        let formattedDate = date.toLocaleDateString('es-PE', formatOptions);

        // Capitalizar la primera letra del día de la semana
        formattedDate = capitalizeFirstLetter(formattedDate);

        return formattedDate;
    }

    function parseDateForLima(dateString) {
        const dateWithTime = `${dateString}T12:00:00-05:00`;
        const date = new Date(dateWithTime);
        return new Date(date.toLocaleString('en-US', { timeZone: TIME_ZONE }));
    }

    // Función auxiliar para capitalizar la primera letra
    function capitalizeFirstLetter(str) {
        return str.replace(/^\w/, (firstLetter) => firstLetter.toUpperCase());
    }

    return {
        getNowInLima,
        getCurrentTime,
        getDayName,
        timeToMinutes,
        formatCountdown,
        formatDate
    };
})();