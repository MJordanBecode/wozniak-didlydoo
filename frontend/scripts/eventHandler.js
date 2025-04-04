import { showSnackbar } from './ui.js';


export const submitNewEvent = async (newEvent) => {
    try {
        const response = await fetch("http://localhost:3000/api/events/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEvent),
        });

        if (!response.ok) throw new Error("Failed to add event");

        showSnackbar("Event added!", "green");
    } catch (error) {
        showSnackbar("Error adding event", "red");
        console.error(error);
    }
};
