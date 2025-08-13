// Timeline App JavaScript Code
// Written by: [Your Name]
// Roll No: [Your Roll Number]
// Subject: Web Development Project

// Global variables (learned this is good practice in class)
let eventsData = [];
let currentModal = null;

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
        // Using arrow function (modern JavaScript feature)
        eventMarker.addEventListener('click', () => {
            showEventModal(event);
        });
        
        // Append to timeline container
        timelineContainer.appendChild(eventMarker);
    }
    
    console.log(`Displayed ${events.length} events on timeline`); // debug info
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
    
    // Store reference to current modal
    currentModal = modalElement;
    
    // Add event listeners for different ways to close modal
    setupModalEventListeners();
}

// Function to set up various ways to close the modal
// Multiple options for better user experience
function setupModalEventListeners() {
    const modal = currentModal;
    const modalContent = document.getElementById('modal-content');
    
    // Method 1: Click outside modal content to close
    modal.addEventListener('click', function(event) {
        // Check if click was on the background (not content)
        if (event.target === modal) {
            console.log("Modal closed by clicking outside"); // debug
            hideEventModal();
        }
    });
    
    // Method 2: Prevent modal from closing when clicking inside content
    modalContent.addEventListener('click', function(event) {
        event.stopPropagation(); // prevents event bubbling
        console.log("Clicked inside modal content"); // debug
    });
    
    // Method 3: Close with Escape key (accessibility feature)
    document.addEventListener('keydown', handleKeyboardInput);
    
    // Method 4: Touch events for mobile devices
    // Learned this is important for mobile responsiveness
    modal.addEventListener('touchstart', function(event) {
        if (event.target === modal) {
            hideEventModal();
        }
    });
}

// Function to handle keyboard input
// ESC key closes modal (standard behavior)
function handleKeyboardInput(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
        console.log("Modal closed with Escape key"); // debug
        hideEventModal();
    }
}

// Function to hide/close the modal
// Clean up function to remove event listeners and hide modal
function hideEventModal() {
    const modal = document.getElementById('modal');
    
    // Hide the modal
    modal.style.display = 'none';
    
    // Clear the content
    modal.innerHTML = '';
    
    // Remove keyboard event listener to prevent memory leaks
    // This is important for performance
    document.removeEventListener('keydown', handleKeyboardInput);
    
    // Reset current modal reference
    currentModal = null;
    
    console.log("Modal closed and cleaned up"); // debug info
}

// Initialize the application when page loads
// Using DOMContentLoaded to ensure HTML is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing timeline app..."); // debug
    
    // Load and display events
    loadEvents();
    
    // Add any other initialization code here if needed
    setupThemeToggle(); // for future theme switching feature
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
