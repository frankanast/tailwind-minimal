/**
 * Returns the initials (up to 3 characters) of a full name string.
 * - Up to 3 letters, in order of the words in the name.
 * - Always uppercase.
 * - If the input yields no valid words, returns "?".
 *
 * @param {string} fullName
 * @returns {string}
 */

export default function getInitials(fullName) {
    if (typeof fullName !== 'string') return '?';

    const parts = fullName
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (parts.length === 0) {
        // No words → fallback
        return '?';
    }

    return parts
        .slice(0, 3)
        .map(part => part.charAt(0).toUpperCase())
        .join('');
}