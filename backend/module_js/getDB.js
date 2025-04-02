

export async function getAllEvent(){
// fecth obj from local DataBase 
    try{
        let response = await fetch(`http://localhost:3000/api/events`,{
            method: "GET",
        });
        const data = await response.json()
        console.log(data)
        return data

    }catch(error){
        console.log('Error : ',error);
        alert(`Error : can't retrieve DataBase.`)
    }

}


export async function getEventByID(id) {
    
    try{
        let response = await fetch(`http://localhost:3000/api/events/${id}`,{
            method: "GET",
        });
        const data = await response.json()
        console.log(data)
        return data

    }catch(error){
        console.log('Error : ',error);
        alert(`Error : can't retrieve DataBase.`)
    }
}

export async function getAllAttendees(){

    try{
        let response = await fetch(`http://localhost:3000/api/attendees`,{
            method: "GET",
        });
        const data = await response.json()
        console.log(data)
        return data

    }catch(error){
        console.log('Error : ',error);
        alert(`Error : can't retrieve DataBase.`)
    }
}

export async function getAttendeesByName(attendeeName) {
    
    try{
        let response = await fetch(`http://localhost:3000/api/attendees/${attendeeName}`,{
            method: "GET",
        });
        const data = await response.json()
        console.log(data)
        return data

    }catch(error){
        console.log('Error : ',error);
        alert(`Error : can't retrieve DataBase.`)
    }
}