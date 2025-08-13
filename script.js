
// Global variables (learned this is good practice in class)
let eventsData = [];
let isModalOpen = false;

// Function to load all the events from JSON file
// Using fetch API as taught in web dev lectures
function loadEvents() {
    console.log("Loading events from JSON file..."); // debugging line
    
    fetch('events.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error! status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("Events loaded successfully:", data); // for debugging
            eventsData = data; // storing in global variable
            displayEvents(data);
        })
        .catch(error => {
            console.error('Error loading events:', error);
            // Show error message to user
            document.getElementById('timeline').innerHTML = '<p>Error loading events. Please check console.</p>';
        });
}

// Function to display events on timeline
// This creates the grid layout we see on screen
function displayEvents(events) {
    const timelineContainer = document.getElementById('timeline');
    
    // Clear any existing content first
    timelineContainer.innerHTML = '';
    
    // Loop through each event and create HTML elements
    for (let i = 0; i < events.length; i++) {
        const event = events[i];
        
        // Create div element for each event marker
        const eventMarker = document.createElement('div');
        eventMarker.className = 'event-marker';
        
        // Set innerHTML with event details
        // Template literals make this easier than string concatenation
        eventMarker.innerHTML = `
            <img src="${event.image}" alt="${event.title}" onerror="this.src='placeholder.jpg'">
            <h3>${event.year} - ${event.title}</h3>
            <p class="event-category">${event.category}</p>
        `;
        
        // Add click event listener to each marker
        // Using regular function syntax
        eventMarker.addEventListener('click', function() {
            showEventModal(event);
        });
        
        // Append to timeline container
        timelineContainer.appendChild(eventMarker);
    }
    
    console.log("Displayed " + events.length + " events on timeline"); // debug info
}

// Function to show modal popup when event is clicked
// This is where the detailed information appears
function showEventModal(eventData) {
    console.log("Opening modal for:", eventData.title); // debug log
    
    const modalElement = document.getElementById('modal');
    
    // Create modal HTML content
    const modalHTML = `
        <div class="modal-content" id="modal-content">
            <div class="modal-header">
                <button class="close-btn" id="close-button" onclick="hideEventModal()">
                    <span>&times;</span> Close
                </button>
            </div>
            <div class="modal-body">
                <h2 class="modal-title">${eventData.year} - ${eventData.title}</h2>
                <img src="${eventData.image}" alt="${eventData.title}" class="modal-image">
                <div class="event-details">
                    <p class="event-category-modal"><strong>Category:</strong> ${eventData.category}</p>
                    <p class="event-description">${eventData.description}</p>
                </div>
            </div>
        </div>
    `;
    
    // Set the HTML content
    modalElement.innerHTML = modalHTML;
    
    // Show the modal
    modalElement.style.display = 'flex';
    isModalOpen = true;
    
    console.log("Modal is now visible"); // debug
}

// Function to hide/close the modal
// Clean up function to hide modal
function hideEventModal() {
    const modal = document.getElementById('modal');
    
    // Hide the modal
    modal.style.display = 'none';
    
    // Clear the content
    modal.innerHTML = '';
    
    // Update state
    isModalOpen = false;
    
    console.log("Modal closed and cleaned up"); // debug info
}

// Handle clicks anywhere on the page
// This is the main function for closing modal by clicking outside
function handlePageClick(event) {
    // Only proceed if modal is open
    if (!isModalOpen) {
        return;
    }
    
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    
    // Check if modal exists and is visible
    if (modal && modal.style.display === 'flex') {
        // If clicked on modal background (not content), close it
        if (event.target === modal) {
            console.log("Clicked outside modal - closing"); // debug
            hideEventModal();
        }
        // If clicked anywhere else on page (not on modal at all), also close
        else if (!modal.contains(event.target)) {
            console.log("Clicked somewhere else on page - closing modal"); // debug
            hideEventModal();
        }
    }
}

// Handle keyboard events
// ESC key closes modal (standard behavior)
function handleKeyPress(event) {
    if (isModalOpen && (event.key === 'Escape' || event.keyCode === 27)) {
        console.log("Modal closed with Escape key"); // debug
        hideEventModal();
    }
}

// Initialize the application when page loads
// Using DOMContentLoaded to ensure HTML is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing timeline app..."); // debug
    
    // Load and display events
    loadEvents();
    
    // Set up global event listeners for modal closing
    // These will work anywhere on the page
    document.addEventListener('click', handlePageClick);
    document.addEventListener('keydown', handleKeyPress);
    
    // Add any other initialization code here if needed
    setupThemeToggle(); // for future theme switching feature
    
    console.log("Event listeners set up successfully"); // debug
});

// Placeholder function for theme toggle feature
// Will implement this later as per assignment requirements
function setupThemeToggle() {
    const themeButton = document.getElementById('theme-toggle');
    
    if (themeButton) {
        themeButton.addEventListener('click', function() {
            console.log("Theme toggle clicked - feature coming soon!"); // placeholder
            // TODO: Implement dark/light theme switching
        });
    }
}

// Utility function to handle image loading errors
// Backup in case some images don't load properly
function handleImageError(imgElement) {
    console.log("Image failed to load:", imgElement.src);
    imgElement.src = 'images/placeholder.jpg'; // fallback image
    imgElement.alt = 'Image not available';
}
