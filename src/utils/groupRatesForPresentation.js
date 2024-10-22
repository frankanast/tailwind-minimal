export default function groupRatesForPresentation(response) {
    // This function groups singular rate entities from the response first by occupancy, then by room
    /*
    * Example output:
    *
    *
    *
    *
    * */
    return response.reduce((acc, item) => {
        const occupancyId = item.occupancy.id;
        const roomId = item.room_id.id;

        const roomShortName = item.room_id.data.short_name.en;
        const adults = item.occupancy.ages.filter(age => age >= item.occupancy.min_age).length;
        const children = item.occupancy.ages.filter(age => age < item.occupancy.min_age).length;

        if (!acc[occupancyId]) {
            acc[occupancyId] = {
                occupancyId,
                adults,
                children,
                rooms: []
            };
        }

        let room = acc[occupancyId].rooms.find(r => r.roomId === roomId);
        if (!room) {
            room = {
                roomId,
                roomShortName,
                rates: []
            };
            acc[occupancyId].rooms.push(room);
        }

        room.rates.push(item);

        return acc;
    }, {});
}