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
        const limaDate = date ? new Date(getNowInLima().setTime(date.getTime())) : getNowInLima();
        return days[limaDate.getDay()];
    }

    function timeToMinutes(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    }

    function formatCountdown(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours > 0 ? `${hours}h ` : ''}${mins}m`;
    }

    return {
        getNowInLima,
        getCurrentTime,
        getDayName,
        timeToMinutes,
        formatCountdown
    };
})();
