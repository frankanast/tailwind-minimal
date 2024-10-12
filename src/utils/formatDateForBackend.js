const formatDateForBackend = (date) => {
    if (date instanceof Date) {
        return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
    }
    return '';
};

export default formatDateForBackend;