export async function copyHTMLToClipboard({ content }) {
    try {
        const container = document.createElement('div');
        container.innerHTML = content;

        // Ensure the container is not visible on the page
        container.style.position = 'fixed';
        container.style.pointerEvents = 'none';
        container.style.opacity = 0;

        document.body.appendChild(container);

        // Select the container's content
        const range = document.createRange();
        range.selectNode(container);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        // Use execCommand to copy as rich text
        const successful = document.execCommand('copy');
        if (!successful) {
            throw new Error('Failed to copy HTML content as rich text');
        }

        console.log('HTML copied to clipboard successfully!');
        document.body.removeChild(container);
    } catch (error) {
        console.error('Failed to copy HTML to clipboard:', error);
    }
}

export async function copyTextToClipboard({ content }) {
    try {
        const tempDivElement = document.createElement("div");
        tempDivElement.innerHTML = content;
        const plainText = tempDivElement.textContent || tempDivElement.innerText || "";

        await navigator.clipboard.writeText(plainText);

    } catch (error) {
        console.warn("Failed to copy plain text to clipboard:", error);
    }
}
