import { getAllEvent } from "./getDB.js";

export async function createCards(){

    
    const BODY_SELECT = document.querySelector("body");
    
    const CARD_SELECT = document.createElement("div");
    CARD_SELECT.className = "cardEvent";
    BODY_SELECT.appendChild(CARD_SELECT);
    
    const NAME_EVENT_SELECT = document.createElement("h2");
    NAME_EVENT_SELECT.className = "nameEvent";
    CARD_SELECT.appendChild(NAME_EVENT_SELECT);
    
    const AUTHOR_NAME_SELECT = document.createElement("h3");
    AUTHOR_NAME_SELECT.className = "authorOfEvent";
    CARD_SELECT.appendChild(AUTHOR_NAME_SELECT);


    const DESCRIPTION_SELECT = document.createElement("p");
    DESCRIPTION_SELECT.className = "desciptionEvent";
    CARD_SELECT.appendChild(DESCRIPTION_SELECT);

    const CONTAINER_TABLE_SELECT = document.createElement("div");
    CONTAINER_TABLE_SELECT.className = "tableau";
    CARD_SELECT.appendChild(CONTAINER_TABLE_SELECT);

    const FORM_CONFIRMATION_SELECT = document.createElement("div");
    FORM_CONFIRMATION_SELECT.className = "confirmationFormulaire"
    CARD_SELECT.appendChild(FORM_CONFIRMATION_SELECT);

        const DATE_TABLE_SELECT = document.createElement("div");
        DATE_TABLE_SELECT.className = "dateTableau";
        CONTAINER_TABLE_SELECT.appendChild(DATE_TABLE_SELECT);

        const NAME_TABLE_SELECT = document.createElement("div");
        NAME_TABLE_SELECT.className = "nameTableau";
        CONTAINER_TABLE_SELECT.appendChild(NAME_TABLE_SELECT);

        const CONFIRMATION_TABLE_SELECT = document.createElement("div");
        CONFIRMATION_TABLE_SELECT.className = "confirmationTableau";
        CONTAINER_TABLE_SELECT.appendChild(CONFIRMATION_TABLE_SELECT);
    
    const CONTAINER_LOG_SELECT = document.createElement("div");
    CONTAINER_LOG_SELECT.className = 'logContainer';
    CARD_SELECT.appendChild(CONTAINER_LOG_SELECT);

    const CREATE_DATE_SELECT = document.createElement("p");
    CREATE_DATE_SELECT.className = "createDateLog";
    CONTAINER_LOG_SELECT.appendChild(CREATE_DATE_SELECT);

    const NUM_MODIF_SELECT = document.createElement("p");
    NUM_MODIF_SELECT.className = "numModifLog";
    CONTAINER_LOG_SELECT.appendChild(NUM_MODIF_SELECT);

    const LAST_MODIF_SELECT = document.createElement("p");
    LAST_MODIF_SELECT.className = "lastModifLog"
    CONTAINER_LOG_SELECT.appendChild(LAST_MODIF_SELECT)


    
    const data = await getAllEvent();
    
    

}

