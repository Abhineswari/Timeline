// Beginner-style JavaScript for Timeline App

// Fetching events from JSON and displaying them
fetch('events.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var timeline = document.getElementById('timeline');

    data.forEach(function(event) {
      var marker = document.createElement('div');
      marker.classList.add('event-marker');

      marker.innerHTML = `
        <img src="${event.image}" alt="${event.title}">
        <h3>${event.year} - ${event.title}</h3>
        <p>${event.category}</p>
      `;

      marker.addEventListener('click', function() {
        openModal(event);
      });

      timeline.appendChild(marker);
    });
  });

// Modal open function
function openModal(event) {
  var modal = document.getElementById('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <button class="close-btn" onclick="closeModal()">✕ Close</button>
      <h2>${event.year} - ${event.title}</h2>
      <img src="${event.image}" alt="${event.title}">
      <p>${event.description}</p>
    </div>
  `;
  modal.style.display = 'flex';

  // Add click event listener to modal background
  modal.addEventListener('click', function(e) {
    // Only close if clicked on the modal background (not the content)
    if (e.target === modal) {
      closeModal();
    }
  });

  // Add click event listener to modal content for mobile touch
  var modalContent = modal.querySelector('.modal-content');
  modalContent.addEventListener('click', function(e) {
    // Prevent event bubbling so clicking content doesn't close modal
    e.stopPropagation();
    
    // Optional: Add a small delay and close on any click within content
    // Uncomment the lines below if you want clicking anywhere in content to close
    /*
    setTimeout(function() {
      closeModal();
    }, 100);
    */
  });

  // Add keyboard event listener for ESC key
  document.addEventListener('keydown', handleEscKey);
}

// Handle ESC key press
function handleEscKey(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

// Modal close function
function closeModal() {
  var modal = document.getElementById('modal');
  modal.style.display = 'none';
  
  // Remove event listeners to prevent memory leaks
  modal.removeEventListener('click', arguments.callee);
  document.removeEventListener('keydown', handleEscKey);
}
