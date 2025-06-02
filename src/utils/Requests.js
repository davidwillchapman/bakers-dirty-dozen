export async function getRequest(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`GET request failed with status ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in GET request:', error);
        throw error;
    }
}

export async function postRequest(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`POST request failed with status ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in POST request:', error);
        throw error;
    }
}