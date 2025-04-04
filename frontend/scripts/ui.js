export const toggleForm = (show) => {
    const showFormBtn = document.getElementById("showFormBtn");
    const eventForm = document.getElementById("eventForm");

    if (show) {
        showFormBtn.style.display = "none";
        eventForm.classList.remove("hidden");
    } else {
        showFormBtn.style.display = "inline-block";
        eventForm.classList.add("hidden");
    }
};

export const showError = (inputId, message) => {
    const errorSpan = document.getElementById(inputId + "Error");
    errorSpan.textContent = message;
};

export const clearErrorMessages = () => {
    document.querySelectorAll(".error-message").forEach(el => el.textContent = "");
};

export const clearErrorMessagesForDate = () => {
    const eventDatesError = document.getElementById("eventDatesError");
    eventDatesError.textContent = "";
};

export const updateDatesList = (selectedDatesList, selectedDates) => {
    selectedDates.sort((a, b) => new Date(a) - new Date(b));
    selectedDatesList.innerHTML = "";
    
    selectedDates.forEach(date => {
        const dateItem = document.createElement("li");
        dateItem.textContent = date;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "x";
        removeBtn.onclick = () => removeDate(date, selectedDates, selectedDatesList);
        dateItem.appendChild(removeBtn);

        selectedDatesList.appendChild(dateItem);
    });
};

export const showSnackbar = (message, color) => {
    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;
    snackbar.style.backgroundColor = color;
    snackbar.className = "show";
    setTimeout(() => { snackbar.className = ""; }, 4000);
};

const removeDate = (date, selectedDates, selectedDatesList) => {
    selectedDates = selectedDates.filter(d => d !== date);
    updateDatesList(selectedDatesList, selectedDates);
};
