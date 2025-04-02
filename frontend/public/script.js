import { toggleForm, clearErrorMessagesForDate, updateDatesList } from '../scripts/ui.js';
import { validateField, validateInputs } from '../scripts/formValidation.js';
import { submitNewEvent } from '../scripts/eventHandler.js';

const showFormBtn = document.getElementById("showFormBtn");
const eventForm = document.getElementById("eventForm");
const eventNameInput = document.getElementById("eventName");
const eventAuthorInput = document.getElementById("eventAuthor");
const eventDescriptionInput = document.getElementById("eventDescription");

let selectedDates = [];

showFormBtn.addEventListener("click", () => toggleForm(true));
document.getElementById("addDateBtn").addEventListener("click", () => addDateToList());
document.getElementById("eventForm").addEventListener("submit", (e) => handleFormSubmit(e));
eventNameInput.addEventListener("input", () => validateField(eventNameInput, "eventName"));
eventAuthorInput.addEventListener("input", () => validateField(eventAuthorInput, "eventAuthor"));
eventDescriptionInput.addEventListener("input", () => validateField(eventDescriptionInput, "eventDescription"));

const addDateToList = () => {
    const eventDatesInput = document.getElementById("eventDates");
    const selectedDate = eventDatesInput.value;
    const selectedDatesList = document.getElementById("selectedDatesList");

    if (selectedDate && !selectedDates.includes(selectedDate)) {
        selectedDates.push(selectedDate);
        updateDatesList(selectedDatesList, selectedDates);
        clearErrorMessagesForDate();
    }

    eventDatesInput.value = "";
};

const handleFormSubmit = async (e) => {
    e.preventDefault();

    const eventName = document.getElementById("eventName").value.trim();
    const eventAuthor = document.getElementById("eventAuthor").value.trim();
    const eventDescription = document.getElementById("eventDescription").value.trim();

    let isValid = validateInputs(eventName, eventAuthor, eventDescription, selectedDates);

    if (!isValid) return;

    const newEvent = {
        name: eventName,
        author: eventAuthor,
        description: eventDescription,
        dates: selectedDates,
    };

    await submitNewEvent(newEvent);
};