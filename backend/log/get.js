
export default async function getLog(eventId) {

    try {
        const response = await fetch(`http://localhost:3000/api/logs/${eventId}`,{
            method: "GET",
            headers: { "Content-Type": "application/json" },    
        });
    
        if (!response.ok) throw new Error("Failed to fetch log");
    
        
        const data = await response.json();
        console.log("Log data:", data);
        return data;
    } catch (error) {
        throw new Error("Failed to fetch log");
        console.error(error);
    }
}