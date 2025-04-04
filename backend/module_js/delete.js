export default async function deleteApi(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/events/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        let result = response.status === 204 ? null : await response.json();
        console.log("Event deleted successfully:", result);
        
        return true;
    } catch (error) {
        console.error("Error deleting event:", error);
        return false;
    }
}
