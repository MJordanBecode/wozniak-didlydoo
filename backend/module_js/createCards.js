import { getAllEvent } from "./getDB.js";

export async function createCards(){
const data = await getAllEvent();

const EVENTS_CONTAINER = document.querySelector(".events");
    
for(let i = 0; i < data.length; i++){
  
        const CARD_SELECT = document.createElement("div");
        CARD_SELECT.className = "cardEvent";
        EVENTS_CONTAINER.appendChild(CARD_SELECT);
        // create the container for one event
        
        const NAME_EVENT_SELECT = document.createElement("h2");
        NAME_EVENT_SELECT.className = "nameEvent";
        NAME_EVENT_SELECT.innerHTML = `${data[i].name}`;
        CARD_SELECT.appendChild(NAME_EVENT_SELECT);
        //create a H2 who's the title name of the event
        
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

        const FORM_CONFIRMATION_SELECT = document.createElement("div");
        FORM_CONFIRMATION_SELECT.className = "confirmationFormulaire"
        CARD_SELECT.appendChild(FORM_CONFIRMATION_SELECT);
        //create a div who's gonna contain the form who's check if a atendee is free for a specifique date

        const CONTAINER_TABLE_SELECT = document.createElement("div");
        CONTAINER_TABLE_SELECT.className = "tableau";
        CARD_SELECT.appendChild(CONTAINER_TABLE_SELECT);
        //create a container who's the array whit the name of all attendees and all the dates to check if the attendee is availible 
        
        for(let j = 0; j < data[i].dates.length; j++){ 
            // create the axe X of the array with all the date 
            const DATE_TABLE_SELECT = document.createElement("div");
            DATE_TABLE_SELECT.className = "dateTableau";
            DATE_TABLE_SELECT.innerHTML = `${data[i].dates[j].date}`
            CONTAINER_TABLE_SELECT.appendChild(DATE_TABLE_SELECT);
            //create a container for the date in the array
            
            for(let k = 0; k < data[i].dates[j].attendees.length ; k++){ 
                //create the body of the array with each confirmartion link to a name and a date 
                
            const CONFIRMATION_TABLE_SELECT = document.createElement("div");
            CONFIRMATION_TABLE_SELECT.className = "confirmationTableau";
            CONFIRMATION_TABLE_SELECT.innerHTML = `${data[i].dates[j].attendees[k].available}`
            CONTAINER_TABLE_SELECT.appendChild(CONFIRMATION_TABLE_SELECT);
            //create a container who's display if the attendee is free for a specifique date ine the array



            //create the axe Y of the array with all the name of the attendee
            const NAME_TABLE_SELECT = document.createElement("div");
            NAME_TABLE_SELECT.className = "nameTableau";
            NAME_TABLE_SELECT.innerHTML = `${data[i].dates[j].attendees[k].name}`
            CONTAINER_TABLE_SELECT.appendChild(NAME_TABLE_SELECT);
            //create a container for the name of the attendee in the array 
            }
        }
        

        const IMG_MENU_SELECT = document.createElement("img");
        IMG_MENU_SELECT.className = "menuIcon";
        IMG_MENU_SELECT.src = "../frontend/assets/icons/menu-icon.svg";
        CARD_SELECT.appendChild(IMG_MENU_SELECT);
        //create a image who gonna give acces ton a menu whit the button delete the event and the log of the event 

        const DELETE_SELECT = document.createElement("p");
        DELETE_SELECT.className = "deleteButton";
        IMG_MENU_SELECT.appendChild(DELETE_SELECT);
        //create a p who's can be use to delete the event

        
        const CONTAINER_LOG_SELECT = document.createElement("div");
        CONTAINER_LOG_SELECT.className = 'logContainer';
        IMG_MENU_SELECT.appendChild(CONTAINER_LOG_SELECT);
        //create a container for all the log of the event (creation date, number of modification and last modification)

        const CREATE_DATE_SELECT = document.createElement("p");
        CREATE_DATE_SELECT.className = "createDateLog";
        CREATE_DATE_SELECT.innerHTML = `${data[i].created_at}`;
        CONTAINER_LOG_SELECT.appendChild(CREATE_DATE_SELECT);
        // create a p who's says the create date of the event

        const NUM_MODIF_SELECT = document.createElement("p");
        NUM_MODIF_SELECT.className = "numModifLog";
        NUM_MODIF_SELECT.innerHTML = `${data[i].num_modification}`;
        CONTAINER_LOG_SELECT.appendChild(NUM_MODIF_SELECT);
        // create a p who's says the number of modification of the event

        const LAST_MODIF_SELECT = document.createElement("p");
        LAST_MODIF_SELECT.className = "lastModifLog"
        LAST_MODIF_SELECT.innerHTML = `${data[i].last_modification}`;
        CONTAINER_LOG_SELECT.appendChild(LAST_MODIF_SELECT)
        // create a p who's says the last modification of the event
    }
}

