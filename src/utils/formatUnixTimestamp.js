export default function formatUnixTimestamp(unixTimestamp, locale = 'en-UK', options = {}) {
    // if (typeof unixTimestamp !== 'number' || isNaN(unixTimestamp)) {
    //     return "Unknown."
    // }

    const date = new Date(unixTimestamp * 1000);

    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Use 24-hour format
    };

    const formatter = new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options });
    return formatter.format(date);
}
