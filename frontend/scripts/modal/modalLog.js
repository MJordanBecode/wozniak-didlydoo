
export default function modalLog(id,  lastDate, newDate, changedElement, newElement) {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const closeButton = document.createElement("button");
    closeButton.innerText = "Fermer";
    closeButton.classList.add("close-modal");

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