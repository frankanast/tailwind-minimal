const dateFormats = {
    Datetime_Short: 'dt_short',
    Datetime_Elegant: 'dt_elegant',
    Date_Short: 'd_short',
    Date_Elegant: 'd_elegant',
    Time_Short: 't_short',
    Time_Elegant: 't_elegant'
};

const supportedLanguages = {
    Italian: "it-IT",
    English: "en-US"
};

export default function formatDate(timestamp, language, format) {
    const date = new Date(timestamp);

    const monthShort = date.toLocaleString(supportedLanguages[language], { month: '2-digit', timeZone: 'UTC' });
    const monthLong = date.toLocaleString(supportedLanguages[language], { month: 'long', timeZone: 'UTC' });
    const day = date.getUTCDate().toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes().toString().padStart(2, '0');
    const hour12 = hour % 12 || 12;

    const isPM = hour >= 12;
    const amPm = isPM ? 'p.m.' : 'a.m.';
    const ordinalSuffix = (day) => {
        if (language === "en-US") {
            const suffixes = ['th', 'st', 'nd', 'rd'];
            const v = day % 100;
            return day + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
        }
        return day;
    };

    switch(format) {
        case dateFormats.Datetime_Short:
            return `${day}-${monthShort}-${year}, ${hour}:${minute}${language === "en-US" ? amPm : ''}`;

        case dateFormats.Datetime_Elegant:
            return `${monthLong} ${ordinalSuffix(day)}, ${year} at ${hour12}:${minute}${amPm}`;

        case dateFormats.Date_Short:
            return `${day}-${monthShort}-${year}`;

        case dateFormats.Date_Elegant:
            if (language === "it-IT") {
                return `${day} ${monthLong} ${year}`;
            } else {
                return `${monthLong} ${ordinalSuffix(day)}, ${year}`;
            }

        case dateFormats.Time_Short:
            return `${hour}:${minute}`;

        case dateFormats.Time_Elegant:
            return `${hour12}:${minute}${amPm}`;

        default:
            return "";
    }
}
