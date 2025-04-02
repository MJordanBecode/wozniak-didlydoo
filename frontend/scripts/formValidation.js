export const validateInputs = (eventName, eventAuthor, eventDescription, selectedDates) => {
    let isValid = true;
    clearErrorMessages();

    if (!eventName) {
        showError("eventName", "Event name is required");
        isValid = false;
    } else if (eventName.length > 256) {
        showError("eventName", "Max 256 characters allowed");
        isValid = false;
    }

    if (!eventAuthor) {
        showError("eventAuthor", "Author is required");
        isValid = false;
    } else if (eventAuthor.length > 256) {
        showError("eventAuthor", "Max 256 characters allowed");
        isValid = false;
    }

    if (!eventDescription) {
        showError("eventDescription", "Description is required");
        isValid = false;
    } else if (eventDescription.length > 256) {
        showError("eventDescription", "Max 256 characters allowed");
        isValid = false;
    }

    if (selectedDates.length === 0) {
        showError("eventDates", "At least one date is required");
        isValid = false;
    }

    return isValid;
};

const clearErrorMessages = () => {
    document.querySelectorAll(".error-message").forEach(el => el.textContent = "");
};

const showError = (inputId, message) => {
    const errorSpan = document.getElementById(inputId + "Error");
    errorSpan.textContent = message;
};

export const validateField = (inputElement, inputId) => {
    const inputValue = inputElement.value.trim();
    const isValid = inputValue && inputValue.length <= 256;

    if (isValid) {
        clearErrorMessagesForInput(inputId); 
    } else if (!inputValue) {
        showError(inputId, `${inputId.replace(/([A-Z])/g, ' $1').toUpperCase()} is required`);
    } else if (inputValue.length > 256) {
        showError(inputId, `Max 256 characters allowed`);
    }
};

export const clearErrorMessagesForInput = (inputId) => {
    const errorSpan = document.getElementById(inputId + "Error");
    errorSpan.textContent = ""; 
};