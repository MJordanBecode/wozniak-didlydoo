import { showSnackbar } from "../../frontend/scripts/ui.js";
import deleteApi from "./delete.js";
import { getAllEvent } from "./getDB.js";
import patchApi from "./patch.js";

export async function createCards() {
  const data = await getAllEvent();

  const EVENTS_CONTAINER = document.querySelector(".events");

  for (let i = 0; i < data.length; i++) {
    const CARD_SELECT = document.createElement("div");
    CARD_SELECT.className = "cardEvent";
    EVENTS_CONTAINER.appendChild(CARD_SELECT);
    // create the container for one event

    const CARD_HEADER = document.createElement("div");
    CARD_HEADER.className = "cardHeader";
    CARD_SELECT.appendChild(CARD_HEADER);

    const NAME_EVENT_SELECT = document.createElement("h2");
    NAME_EVENT_SELECT.className = "nameEvent";
    NAME_EVENT_SELECT.innerHTML = `${data[i].name}`;
    CARD_HEADER.appendChild(NAME_EVENT_SELECT);
    //create a H2 who's the title name of the event

    const MENU_ICON_SELECT = document.createElement("img");
    MENU_ICON_SELECT.className = "menuIcon";
    MENU_ICON_SELECT.src = "assets/icons/menu-icon.svg";
    CARD_HEADER.appendChild(MENU_ICON_SELECT);

    const MENU_DROPDOWN = document.createElement("div");
    MENU_DROPDOWN.className = "menuDropdown";

    const MENU_ITEMS = [
      {
        icon: "assets/icons/trash-icon.svg",
        text: "Delete",
        action: () => deleteEvent(data[i].id),
      },
      {
        icon: "assets/icons/edit-icon.svg",
        text: "Edit",
        action: () => editEvent(data[i]),
      },
      {
        icon: "assets/icons/accept-icon.svg",
        text: "Accept",
        action: () => acceptEvent(data[i].id),
      },
      {
        icon: "assets/icons/cross-icon.svg",
        text: "Reject",
        action: () => rejectEvent(data[i].id),
      },
      {
        icon: "assets/icons/info-icon.svg",
        text: "Show Logs",
        action: () => showLogs(data[i].id),
      },
    ];

    MENU_ITEMS.forEach((item) => {
      const MENU_ITEM = document.createElement("div");
      MENU_ITEM.className = "menuDropdownItem";

      const ICON = document.createElement("img");
      ICON.src = item.icon;
      MENU_ITEM.appendChild(ICON);

      const TEXT = document.createElement("span");
      TEXT.textContent = item.text;
      MENU_ITEM.appendChild(TEXT);

      MENU_ITEM.addEventListener("click", item.action);
      MENU_DROPDOWN.appendChild(MENU_ITEM);
    });

    CARD_HEADER.appendChild(MENU_DROPDOWN);

    MENU_ICON_SELECT.addEventListener("click", (event) => {
      event.stopPropagation();
      MENU_DROPDOWN.classList.toggle("show");
    });

    document.addEventListener("click", (event) => {
      if (
        !MENU_DROPDOWN.contains(event.target) &&
        !MENU_ICON_SELECT.contains(event.target)
      ) {
        MENU_DROPDOWN.classList.remove("show");
      }
    });

    const AUTHOR_NAME_SELECT = document.createElement("h3");
    AUTHOR_NAME_SELECT.className = "authorOfEvent";
    AUTHOR_NAME_SELECT.innerHTML = `${data[i].author}`;
    CARD_SELECT.appendChild(AUTHOR_NAME_SELECT);
    //create a h3 who's the author name of the event

    const DESCRIPTION_SELECT = document.createElement("p");
    DESCRIPTION_SELECT.className = "authorOfEvent";
    DESCRIPTION_SELECT.innerHTML = `${data[i].description}`;
    CARD_SELECT.appendChild(DESCRIPTION_SELECT);
    //create a p who's the description of the event

    const SEE_ATTENDEES_BTN = document.createElement("button");
    SEE_ATTENDEES_BTN.className = "event-button";
    SEE_ATTENDEES_BTN.innerText = "See Attendees";
    CARD_SELECT.appendChild(SEE_ATTENDEES_BTN);

    SEE_ATTENDEES_BTN.addEventListener("click", () => {
      openAttendeeModal(data[i].dates);
    });

    const FORM_CONFIRMATION_SELECT = document.createElement("div");
    FORM_CONFIRMATION_SELECT.className = "confirmationFormulaire";
    CARD_SELECT.appendChild(FORM_CONFIRMATION_SELECT);
    //create a div who's gonna contain the form who's check if a atendee is free for a specifique date
  }
}

function openAttendeeModal(dates) {
  const MODAL = document.querySelector("#attendeeModal");
  const MODAL_CONTENT = document.querySelector("#modalContent");

  MODAL_CONTENT.innerHTML = "";

  if (dates.length === 0 || dates[0].attendees.length === 0) {
    MODAL_CONTENT.innerHTML = "<p>No attendees available.</p>";
    MODAL.style.display = "flex";
    return;
  }

  const TABLE = document.createElement("table");
  TABLE.style.width = "100%";
  TABLE.style.borderCollapse = "collapse";

  const HEADER_ROW = document.createElement("tr");

  const DATE_HEADER = document.createElement("th");
  DATE_HEADER.textContent = "Date";
  DATE_HEADER.style.border = "1px solid black";
  DATE_HEADER.style.padding = "10px";
  HEADER_ROW.appendChild(DATE_HEADER);

  dates[0].attendees.forEach((attendee) => {
    const TH = document.createElement("th");
    TH.textContent = attendee.name;
    TH.style.border = "1px solid black";
    TH.style.padding = "10px";
    HEADER_ROW.appendChild(TH);
  });

  TABLE.appendChild(HEADER_ROW);
  let numOfCheck =[];
  dates.forEach((date) => {
    const ROW = document.createElement("tr");

    const DATE_CELL = document.createElement("td");
    DATE_CELL.textContent = date.date;
    DATE_CELL.style.border = "1px solid black";
    DATE_CELL.style.padding = "10px";
    ROW.appendChild(DATE_CELL);

    date.attendees.forEach((attendee) => {
      const CELL = document.createElement("td");
      CELL.style.border = "1px solid black";
      CELL.style.padding = "10px";
      CELL.style.textAlign = "center";

      const ICON = document.createElement("img");
      ICON.style.width = "20px";
      ICON.style.height = "20px";

      if (attendee.available === true) {
        ICON.src = "assets/icons/accept-icon.svg";
        ICON.className = "okCheck";
      } else if (attendee.available === false) {
        ICON.src = "assets/icons/cross-icon.svg";
        ICON.className = "notOK";
      } else {
        ICON.src = "assets/icons/question-icon.svg";
        ICON.className = "notOK";
      }

      CELL.appendChild(ICON);
      ROW.appendChild(CELL);
    });
    let okCheck = ROW.getElementsByClassName("okCheck");
    
    numOfCheck.push(okCheck.length)
    console.log("teeeeeeeeeeeeeeeessssssssssst",numOfCheck)

    TABLE.appendChild(ROW);
  });

  MODAL_CONTENT.appendChild(TABLE);
  MODAL.style.display = "flex";
}

document.querySelector("#closeModal").addEventListener("click", () => {
  document.querySelector("#attendeeModal").style.display = "none";
});

window.addEventListener("click", (event) => {
  const MODAL = document.querySelector("#attendeeModal");
  if (event.target === MODAL) {
    MODAL.style.display = "none";
  }
});

async function deleteEvent(id) {
  const isDeleted = await deleteApi(id);

  if (isDeleted) {
    const eventCard = document.querySelector(`[data-event-id="${id}"]`);
    if (eventCard) {
      eventCard.remove();
    }
    console.log(`Event with ID ${id} deleted successfully.`);
  } else {
    console.error(`Failed to delete event with ID ${id}.`);
  }
}

export const editEvent = async (eventData) => {
  let modal = document.getElementById("editEventModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "editEventModal";
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
          <h2>Edit Event</h2>
          <form id="editEventForm">
           <div id="closeEditModal">
            <img id="closeFormIcon" src="assets/icons/cross-icon.svg" alt="Close Form" class="close-icon">
           </div> 
            <label for="editEventName">Event Name:</label>
            <input type="text" id="editEventName" />
            <span class="error-message" id="editEventNameError"></span>
            
            <label for="editEventAuthor">Author:</label>
            <input type="text" id="editEventAuthor" />
            <span class="error-message" id="editEventAuthorError"></span>
            
            <label for="editEventDescription">Description:</label>
            <input type="text" id="editEventDescription" />
            <span class="error-message" id="editEventDescriptionError"></span>
            
            <label for="editEventDates">Date:</label>
            <input type="date" id="editEventDates" placeholder="Add new date" />
            <button type="button" id="addEditDateBtn">Add Date</button>
            <span class="error-message" id="editEventDatesError"></span>
            
            <ul id="selectedEditDatesList"></ul>
            
            <button type="submit">Update Event</button>
          </form>
        </div>
      `;
    document.body.appendChild(modal);

    document.getElementById("closeEditModal").addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  document.getElementById("editEventName").value = eventData.name;
  document.getElementById("editEventAuthor").value = eventData.author;
  document.getElementById("editEventDescription").value = eventData.description;

  let selectedEditDates = [...eventData.dates];
  const selectedDatesList = document.getElementById("selectedEditDatesList");

  const updateEditDatesList = () => {
    selectedDatesList.innerHTML = "";
    selectedEditDates.sort((a, b) => new Date(getDate(a)) - new Date(getDate(b)));
    selectedEditDates.forEach((date, idx) => {
      const li = document.createElement("li");
      li.textContent = getDate(date);
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "x";
      removeBtn.addEventListener("click", () => {
        selectedEditDates.splice(idx, 1);
        updateEditDatesList();
      });
      li.appendChild(removeBtn);
      selectedDatesList.appendChild(li);
    });
  };
  updateEditDatesList();

  document.getElementById("addEditDateBtn").addEventListener("click", () => {
    const dateInput = document.getElementById("editEventDates");
    const newDate = dateInput.value;
    if (newDate && !selectedEditDates.includes(newDate)) {
      selectedEditDates.push(newDate);
      updateEditDatesList();
    }
    dateInput.value = "";
  });

  const editForm = document.getElementById("editEventForm");
  editForm.onsubmit = async (e) => {
    e.preventDefault();
    const updatedEvent = {
      name: document.getElementById("editEventName").value.trim(),
      author: document.getElementById("editEventAuthor").value.trim(),
      description: document.getElementById("editEventDescription").value.trim(),
    };
    try {
      await patchApi(eventData.id, updatedEvent);
      showSnackbar("Event updated successfully!", "green");
      modal.style.display = "none";
    } catch (error) {
      showSnackbar("Error updating event", "red");
      console.log(error);
    }
  };

  modal.style.display = "flex";
};

function acceptEvent(id) {
  console.log(`Accepting event with ID: ${id}`);
}

function rejectEvent(id) {
  console.log(`Rejecting event with ID: ${id}`);
}

function showLogs(id) {
  console.log(`Showing logs for event ID: ${id}`);
}

const getDate = (dateValue) => {
  return typeof dateValue === "object" && dateValue !== null
    ? dateValue.date
    : dateValue;
};
