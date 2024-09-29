function cartesianProduct(...arrays) {
    return arrays.reduce((acc, curr) => {
        return acc.flatMap(a => curr.map(c => [...a, c]));
    }, [[]]);
}

export default function autocompleteStayDate(inputDateString) {
    // The logic used here is: get all possible combinations of the given parameters via a classic cartesian products,
    // and choose the future date closest to today. WIth this algorithm we should cover all the cases.

    //There shouldn't be any non-digits here because InputMask blocks them, but just to be sure...
    const sanitized = inputDateString.replace(/[^\d-]/g, '')
    const dayInput = sanitized.split('-')[0] || today.getDate()
    const monthInput = sanitized.split('-')[1] || undefined
    const yearInput = sanitized.split('-')[2] || undefined

    // Today's time should be 0 as it affects comparisons (and could lead to unexpected results on same-day input)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const possibleDays = [dayInput];
    const possibleMonths = monthInput ? [monthInput - 1] : [currentMonth, currentMonth + 1];
    const possibleYears = yearInput ? [yearInput] : [currentYear, currentYear + 1];

    // Cartesian product to generate all possible date combinations
    const possibleDates = cartesianProduct(possibleDays, possibleMonths, possibleYears)
        .map(([day, month, year]) => new Date(year, month, day));

    const futureDates = possibleDates.filter(date => date >= today);
    futureDates.sort((a, b) => a - b);

    const closestDate = futureDates.length > 0 ? futureDates[0] : null

    return closestDate.toLocaleDateString('en-GB').replace(/(\d{4})$/, year => year.slice(-2))

}