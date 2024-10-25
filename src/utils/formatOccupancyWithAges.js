function parseOccupancies(arr) {
    if (!Array.isArray(arr)) {
        return [];
    }

    return arr.map(({ adults, children }) => ({
        adults: parseInt(adults, 10),
        children: parseInt(children, 10)
    }));
}

export default function formatOccupancyWithAges(occupancies) {
    // Expected input: [{"key":"e65JbTqYxD3g4XbP0qk_J", "adults":"2", "children":1}, ...]
    // {adults: 2, children: 1} ===> {ages: [99, 99, 1], min_age: 4, pets: 0}
    const parsedOccupancies = parseOccupancies(occupancies);
    const roomsArray = parsedOccupancies.map(o => {
        const { adults, children } = o;
        const ages = Array(adults).fill(99).concat(Array(children).fill(1));

        return {
            ages: ages,
            min_age: 4,
            pets: 0
        };
    });

    return `${JSON.stringify(roomsArray)}`;
}
