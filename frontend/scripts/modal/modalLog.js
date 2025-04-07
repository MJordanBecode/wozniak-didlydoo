import getLog from "../../../backend/log/get";

async function getDataGetLogs(eventId) {
    try {
        const data = await getLog(eventId);
        console.log("Logs récupérés :", data);
        return data; 
    } catch (error) {
        console.error("Erreur lors de la récupération des logs :", error);
        return null;
    }
}

export default async function modalLog(eventId) {
    console.log("test modalLog avec eventId:", eventId);
    
    const logs = await getDataGetLogs(eventId);

    // Create modal container
    const modal = document.createElement("div");
    modal.classList.add("modal-log");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content-log");

    // Create header
    const header = document.createElement("div");
    header.classList.add("modal-header-log");
    
    const title = document.createElement("h2");
    title.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9 9 0 0 0-9 9"></path><polyline points="12 3 12 9 16 9"></polyline></svg> Change History';
    title.classList.add("modal-title-log");
    
    const actionButtons = document.createElement("div");
    actionButtons.classList.add("action-buttons-log");
    
    const filterButton = document.createElement("button");
    filterButton.classList.add("btn-log", "btn-filter-log");
    filterButton.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg> Filter';
    
    const exportButton = document.createElement("button");
    exportButton.classList.add("btn-log", "btn-export-log");
    exportButton.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Export';
    
    const refreshButton = document.createElement("button");
    refreshButton.classList.add("btn-log", "btn-refresh-log");
    refreshButton.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path></svg> Refresh';
    
    actionButtons.appendChild(filterButton);
    actionButtons.appendChild(exportButton);
    actionButtons.appendChild(refreshButton);
    
    header.appendChild(title);
    header.appendChild(actionButtons);

    // Create table
    const table = document.createElement("table");
    table.classList.add("logs-table-log");
    
    // Table header
    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
            <th>ID</th>
            <th>PREVIOUS DATE</th>
            <th>NEW DATE</th>
            <th>CHANGED ELEMENTS</th>
            <th>NEW ELEMENT</th>
        </tr>
    `;
    
    // Table body
    const tbody = document.createElement("tbody");
    
    if (logs && logs.length > 0) {
        logs.forEach((log, index) => {
            const tr = document.createElement("tr");
            if (index % 2 === 0) {
                tr.classList.add("even-row");
            }
            
            // Format timestamp to match the design
            const timestamp = new Date(log.timestamp);
            const formattedDate = `${timestamp.toLocaleDateString('en-US', { 
                month: 'short', 
                day: '2-digit', 
                year: 'numeric' 
            })}`;
            
            const formattedTime = `${timestamp.getHours().toString().padStart(2, '0')}:${timestamp.getMinutes().toString().padStart(2, '0')}`;
            
            // Create a JSON-like representation for changed elements
            const changedElements = `{"${log.name}": "${log.description.substring(0, 20)}..."}`;
            
            tr.innerHTML = `
                <td><a href="#" class="log-id-log">#${log.id || index + 1000}</a></td>
                <td>${formattedDate} <span class="time-badge-log">${formattedTime}</span></td>
                <td>${formattedDate} <span class="time-badge-log">${formattedTime}</span></td>
                <td><div class="code-block-log">${changedElements}</div></td>
                <td>${log.author.charAt(0).toUpperCase() + log.author.slice(1, 3)}...</td>
            `;
            
            tbody.appendChild(tr);
        });
    } else {
        const tr = document.createElement("tr");
        tr.innerHTML = '<td colspan="5" class="no-data-log">Aucun log trouvé.</td>';
        tbody.appendChild(tr);
    }
    
    table.appendChild(thead);
    table.appendChild(tbody);
    
    // Create pagination
    const pagination = document.createElement("div");
    pagination.classList.add("pagination-log");
    
    const paginationInfo = document.createElement("div");
    paginationInfo.classList.add("pagination-info-log");
    paginationInfo.textContent = `Showing 1 to ${logs ? Math.min(logs.length, 5) : 0} of ${logs ? logs.length : 0} entries`;
    
    const paginationControls = document.createElement("div");
    paginationControls.classList.add("pagination-controls-log");
    
    paginationControls.innerHTML = `
        <button class="page-btn-log prev-btn-log" disabled>&lt;</button>
        <button class="page-btn-log active">1</button>
        <button class="page-btn-log">2</button>
        <button class="page-btn-log">3</button>
        <button class="page-btn-log">4</button>
        <button class="page-btn-log next-btn-log">&gt;</button>
    `;
    
    pagination.appendChild(paginationInfo);
    pagination.appendChild(paginationControls);
    
    // Close button
    const closeButton = document.createElement("div");
    closeButton.innerText = "×";
    closeButton.classList.add("close-modal-log");
    
    // Assemble modal
    modalContent.appendChild(closeButton);
    modalContent.appendChild(header);
    modalContent.appendChild(table);
    modalContent.appendChild(pagination);
    modal.appendChild(modalContent);
    
    document.body.appendChild(modal);
    
    // Event listeners
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });
    
    // Close when clicking outside the modal
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
    
    // Add event listeners for pagination buttons
    const pageButtons = paginationControls.querySelectorAll(".page-btn-log:not(.prev-btn-log):not(.next-btn-log)");
    pageButtons.forEach(button => {
        button.addEventListener("click", () => {
            pageButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });
    
    return {
        show: () => (modal.style.display = "flex"),
        hide: () => (modal.style.display = "none"),
    };
}
