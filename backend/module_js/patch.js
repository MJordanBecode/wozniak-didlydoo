
export default async function patchApi(id, data){

    try {

        const response = await fetch(`http://localhost:3000/api/events/${id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json', // Indiquer qu'on envoie du JSON
            },
            body: JSON.stringify(data), // Transformer l'objet `data` en JSON
        });

        if(!response.ok){
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();
    } catch (error) {
        console.error('error 500 : ', error);
    }
}

export async function attendEventApi(eventId, name, selectedDates, allEventDates) {
    const apiUrl = `http://localhost:3000/api/events/${eventId}/attend`;

    const requestBody = {
        name,
        dates: allEventDates.map(date => ({
            date,
            available: selectedDates.includes(date)
        }))
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            console.warn("POST failed, trying PATCH...");
            await fetch(apiUrl, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });
        }
    } catch (error) {
        console.error("Error submitting attendance:", error);
    }
}