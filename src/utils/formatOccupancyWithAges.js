export default function formatOccupancyWithAges(occupancies) {
    // {adults: 2, children: 1} ===> {ages: [99, 99, 1], min_age: 4, pets: 0}
    const roomsArray = occupancies.map(o => {
        const { adults, children } = o;
        const ages = Array(adults).fill(99).concat(Array(children).fill(1));

        return {
            ages: ages,
            min_age: 4,
            pets: 0
        };
    });

    // Return the query string, combining all occupancy objects as an array
    return `${JSON.stringify(roomsArray)}`;
}


// function convertOccupanciesToQueryString(occupancies) {
