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
export function sentPathAPI() {
    return request({
        url: '/api/path',
        method: 'POST',
    })
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