export default function daysBetweenDates(date1, date2) {
    const diffInMilliseconds = Math.abs(date2 - date1);
    return Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
}