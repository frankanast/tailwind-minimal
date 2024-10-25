import { nanoid } from 'nanoid';

export default function groupRatesForPresentation(elements, metadata) {
    // "element" ==> a Rate() instance from our API, json formatted. Basically, our data.
    const groupedData = {};

    elements.forEach(entry => {
        const occupancyKey = entry.occupancy.id;
        const roomId = entry.room;
        const rateId = entry.rate;
        const amount = entry.amount;

        // Extract adults and children from occupancy ages
        const adults = entry.occupancy.ages.filter(age => age >= entry.occupancy.min_age).length;
        const children = entry.occupancy.ages.filter(age => age < entry.occupancy.min_age).length;

        if (!groupedData[occupancyKey]) {
            groupedData[occupancyKey] = {
                occ_id: occupancyKey,
                adults: adults,
                children: children,
                rooms: {}
            };
        }

        if (!groupedData[occupancyKey].rooms[roomId]) {
            groupedData[occupancyKey].rooms[roomId] = {
                entity_id: nanoid(),
                entity_position: "",
                id: roomId,
                data: metadata.rooms[roomId] || {},
                rates: []
            };
        }

        if (amount !== 0) {
            groupedData[occupancyKey].rooms[roomId].rates.push({
                id: rateId,
                data: metadata.rates[rateId] || [],
                amount: amount
            });
        }
    });

    return Object.values(groupedData).map(occupancy => ({
        occ_id: occupancy.occ_id,
        adults: occupancy.adults,
        children: occupancy.children,
        rooms: Object.values(occupancy.rooms)
    }));
}
