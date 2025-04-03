

export async function getAllEvent(){
    // fecth all data from all evengt from local DataBase 
    try{
        let response = await fetch(`http://localhost:3000/api/events`,{
            method: "GET",
        });
        const data = await response.json()
        return data

    }catch(error){
        console.log('Error : ',error);
        alert(`Error : can't retrieve DataBase.`)
    }

}


export async function getEventByID(id) {
    // fecht only the data from a event with a unique ID from local DataBase
    try{
        let response = await fetch(`http://localhost:3000/api/events/${id}`,{
            method: "GET",
        });
        const data = await response.json()
        return data

    }catch(error){
        console.log('Error : ',error);
        alert(`Error : can't retrieve DataBase.`)
    }
}

export async function getAllAttendees(){
    //fetch the id of a event and all disponibility from all attendees
    try{
        let response = await fetch(`http://localhost:3000/api/attendees`,{
            method: "GET",
        });
        const data = await response.json()
        return data

    }catch(error){
        console.log('Error : ',error);
        alert(`Error : can't retrieve DataBase.`)
    }
}

export async function getAttendeesByName(attendeeName) {
    //fetch the id of a event and all disponibility from one attendee
    try{
        let response = await fetch(`http://localhost:3000/api/attendees/${attendeeName}`,{
            method: "GET",
        });
        const data = await response.json()
        return data

    }catch(error){
        console.log('Error : ',error);
        alert(`Error : can't retrieve DataBase.`)
    }
}