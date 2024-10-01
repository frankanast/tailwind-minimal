export default function formatDateShort(date) {
    if (!(date instanceof Date) || isNaN(date)) {
        return ''
    }

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
    const year = String(date.getFullYear()).slice(-2)

    return `${day}-${month}-${year}`;
}
