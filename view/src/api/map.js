import { request } from "@/utils";

export async function fetchMapData() {
    try {
        const response = await fetch('http://localhost:4000/api/resort');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Send start, end and profile data to backend
export async function sendSelections(bodyData) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        };

        const response = await fetch('http://localhost:4000/api/selection', requestOptions);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}


// Fetch the calculated route data from backend
export async function fetchCalculatedRoute() {
    try {
        const response = await fetch('http://localhost:4000/api/route/calculate/all');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}