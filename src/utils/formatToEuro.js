export default function formatToEuro(value, criteria= "precise") {
    // Valid input: numeric string or number
    let numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numericValue)) {
        console.warn(`Tried to convert to euro currency an invalid input (${numericValue}). Please provide a valid number or numeric string.`);
        numericValue = 0;
    }

    let fractionDigits;
    if (criteria === 'elegant') {
        fractionDigits = 0;
    } else if (criteria === 'precise') {
        fractionDigits = 2;
    } else {
        fractionDigits = 2;
    }

    // Format that we use: € 1.234,56 (precise) or € 1.234,00 (elegant, for letters)
    return '€ ' + numericValue.toLocaleString('de-DE', {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits
    });
}