export const authenticate = async (input) => {
    try {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                "password": input,
            }
        });

        return response.status === 200;
    } catch (error) {
        console.error('Error authenticating:', error);
        return false;
    }
};

export const getSeatingData = async () => {
    try {
        const response = await fetch('/api/get_seating_data', {
            method: 'POST',
        });
        const response_body = await response.json();
        if (response.status === 200) {
            console.log("Response from getSeatingData: ", response_body);
            return JSON.parse(response_body);
        }
    } catch (error) {
        console.error('Error getting seating data:', error);
        return [];
    }
};

export const createOrUpdateSeatingData = async (tableData) => {
    try {
        const response = await fetch('/api/save_seating_data', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "connection": "keep-alive",
            },
            body: JSON.stringify({ data: tableData })
        });

        return response.status === 200;
    } catch (error) {
        console.error('Error creating or updating seating data:', error);
    }
};