import { getAllEvent } from "./getDB.js";

export async function createCards(){

    const data = await getAllEvent();

    const BODY_SELECT = document.querySelector("body");

    const CARD_SELECT = document.createElement("div");
    CARD_SELECT.className = "cardEvent";
    BODY_SELECT.appendChild(CARD_SELECT);

    const H2_SELECT = document.createElement("h2");
    H2_SELECT.className = "nameEvent";
    CARD_SELECT.appendChild(H2_SELECT);

    
    

}

