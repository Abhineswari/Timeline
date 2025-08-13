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
      <button class="close-btn" onclick="closeModal()">Close</button>
      <h2>${event.year} - ${event.title}</h2>
      <img src="${event.image}" alt="${event.title}">
      <p>${event.description}</p>
    </div>
  `;
  modal.style.display = 'flex';
}

// Modal close function
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}
