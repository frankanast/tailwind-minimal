export default function cleanUpResponse(data) {
    return data.filter(item => item.amount !== 0 && item.amount !== undefined);
}