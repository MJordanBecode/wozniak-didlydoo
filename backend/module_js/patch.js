
export default async function patchApi(id){

    try {

        const response = await fetch(`http://localhost:3000/api/events/${id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json', // Indiquer qu'on envoie du JSON
            },
            body: JSON.stringify(data), // Transformer l'objet `data` en JSON
        });

        if(!response.ok){
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();

    } catch (error) {
        console.error('error 500 : ', error);
    }
}