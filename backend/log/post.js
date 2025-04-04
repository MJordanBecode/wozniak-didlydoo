export default async function postLog(eventId, updatedEvent) {
    try {
        const response = await fetch("http://localhost:3000/api/logs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                eventId, // 🔥 Ajout de eventId
                name: updatedEvent.name,
                author: updatedEvent.author,
                description: updatedEvent.description
            })
        });

        if (!response.ok) throw new Error("Failed to log event update");

        return await response.json();
    } catch (error) {
        console.error("Error logging event:", error);
    }
}
