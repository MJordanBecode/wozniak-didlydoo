export default function modalLog(id, lastDate, newDate, changedElement, newElement) {

    //Appeler le get qui va chercher les données de l'élément
    //fetch(`http://localhost:3000/api/log/${id}`);
    console.log("Données reçues :", id, lastDate, newDate, changedElement, newElement);

    const modal = document.createElement("div");
    modal.classList.add("modal");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // Ajout du contenu dynamique
    const content = document.createElement("div");
    content.innerHTML = `
        <p><strong>ID:</strong> ${id}</p>
        <p><strong>Dernière date:</strong> ${lastDate || "N/A"}</p>
        <p><strong>Nouvelle date:</strong> ${newDate || "N/A"}</p>
        <p><strong>Élément changé:</strong> ${changedElement || "Aucun"}</p>
        <p><strong>Nouveau contenu:</strong> ${newElement || "Aucun"}</p>
    `;

    // Bouton de fermeture
    const closeButton = document.createElement("button");
    closeButton.innerText = "Fermer";
    closeButton.classList.add("close-modal");

    modalContent.appendChild(content);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    return {
        show: () => (modal.style.display = "flex"),
        hide: () => (modal.style.display = "none"),
    };
}
