function pad(n) {
    return n >= 10
        ? String(n)
        : `0${n}`;
}

export function getMinutesFromTime(time) {
    const [hours, minutes] = time.split(':');
    return hours * 60 + minutes * 1;
}

export function getDateInstanceFromTime(time) {
    return getDateInstanceFromMinutes(getMinutesFromTime(time));
}

export function getDateInstanceFromMinutes(timeInMinutes) {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    return date;
}

export function getTimeFromMinutes(timeInMinutes) {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;

    return `${pad(hours)}:${pad(minutes)}`;
}

export function getMinutesFromDateInstance(date) {
    return date.getHours() * 60 + date.getMinutes() * 1;
}

export function getCurrentEffectiveDate(date, startOfDay) {
    if (typeof startOfDay === 'string') {
        startOfDay = getMinutesFromTime(startOfDay);
    }

    const currentMinutes = getMinutesFromDateInstance(new Date());
    const today = new Date();

    // if the day start at 02:00 and it is 01:00, return yesterday
    if (currentMinutes < startOfDay) {
        today.setDate(today.getDate() - 1);
    }

    return today;
}
