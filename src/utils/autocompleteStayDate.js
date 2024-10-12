function cartesianProduct(...arrays) {
    return arrays.reduce((acc, curr) => {
        return acc.flatMap(a => curr.map(c => [...a, c]));
    }, [[]]);
}

export default function autocompleteStayDate(inputDateString) {
    // Sanitize input
    const sanitized = inputDateString.replace(/[^\d-]/g, '')
    const [dayInput, monthInput, yearInput] = sanitized.split('-');

    // Get today's date in UTC
    const today = new Date();
    const utcToday = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());

    const currentMonth = today.getUTCMonth();
    const currentYear = today.getUTCFullYear();

    const possibleDays = [parseInt(dayInput) || today.getUTCDate()];
    const possibleMonths = monthInput ? [parseInt(monthInput) - 1] : [currentMonth, currentMonth + 1];
    const possibleYears = yearInput ? [2000 + parseInt(yearInput)] : [currentYear, currentYear + 1];

    // Generate all possible date combinations using UTC
    const possibleDates = cartesianProduct(possibleDays, possibleMonths, possibleYears)
        .map(([day, month, year]) => Date.UTC(year, month, day));

    const futureDates = possibleDates.filter(date => date >= utcToday);
    futureDates.sort((a, b) => a - b);

    // Return the closest future date, or null if no valid dates
    return futureDates.length > 0 ? new Date(futureDates[0]) : null;
}