// Method to transform occupancy object into the required format
const transformOccupancy = (occupancy) => {
    const { adults, children = [], pets = 0, min_age = 0 } = occupancy; // Default children to an empty array
    const adultAges = Array(adults).fill(99);  // Assuming 99 for adults
    const childrenAges = children.map(childAge => childAge); // Children ages are provided directly

    return {
        ages: [...adultAges, ...childrenAges],
        pets,
        min_age
    };
};

// Method to perform the API request using fetch
export const fetchAvailability = async (checkInDate, checkOutDate, occupancy) => {
    const baseUrl = 'https://programmino-be.onrender.com/avail/loose/occasc/';

    // Format dates to yyyy-mm-dd
    const checkIn = checkInDate.toISOString().split('T')[0];
    const checkOut = checkOutDate.toISOString().split('T')[0];

    // Transform occupancy into the expected structure
    const transformedOccupancy = transformOccupancy(occupancy);

    // Encode occupancy into URL format
    const encodedOccupancy = encodeURIComponent(JSON.stringify([transformedOccupancy]));

    // Create the request URL
    const url = `${baseUrl}?check_in=${checkIn}&check_out=${checkOut}&rooms=${encodedOccupancy}`;

    try {
        const response = await fetch(url);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching availability:", error);
        throw error;
    }
};
