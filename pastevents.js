const data = {
  currentDate: "2023-01-01",
  events: [
    {
      _id: "639c723b992482e5f2834be9",
      name: "Collectivities Party",
      image: "https://i.postimg.cc/Fs03hQDt/Collectivities-Party.jpg",
      date: "2022-12-12",
      description: "Enjoy your favourite dishes, from different countries, in a unique event for the whole family.",
      category: "Food Fair",
      place: "Room A",
      capacity: 45000,
      assistance: 42756,
      price: 5,
      __v: 0,
    },
    {
      _id: "639c723b992482e5f2834beb",
      name: "Korean style",
      image: "https://i.postimg.cc/ZmD3Xf57/Korean-style.jpg",
      date: "2023-08-12",
      description: "Enjoy the best Korean dishes, with international chefs and awesome events.",
      category: "Food Fair",
      place: "Room A",
      capacity: 45000,
      price: 10,
      __v: 0,
      estimate: 42756,
    },
    {
      _id: "639c723c992482e5f2834bed",
      name: "Jurassic Park",
      image: "https://i.postimg.cc/GmHRkbNV/Jurassic-Park.jpg",
      date: "2022-11-02",
      description: "Let's go meet the biggest dinosaurs in the paleontology museum.",
      category: "Museum",
      place: "Field",
      capacity: 82000,
      price: 15,
      __v: 0,
      assistance: 65892,
    },
    {
      _id: "639c723c992482e5f2834bef",
      name: "Parisian Museum",
      image: "https://i.postimg.cc/c4C2zXm8/Parisian-Museum.jpg",
      date: "2023-11-02",
      description: "A unique tour in the city of lights with guided tours in French and English.",
      category: "Museum",
      place: "Field",
      capacity: 5000,
      price: 10,
      __v: 0,
      estimate: 3500,
    },
    {
      _id: "639c723c992482e5f2834bf0",
      name: "Comicon",
      image: "https://i.postimg.cc/KYD0jMf2/comicon.jpg",
      date: "2022-09-30",
      description: "The most anticipated convention for comic book lovers and superheroes fans.",
      category: "Costume Party",
      place: "Hall A",
      capacity: 35000,
      price: 30,
      __v: 0,
      assistance: 27890,
    },
    {
      _id: "639c723c992482e5f2834bf2",
      name: "Comic Con",
      image: "https://i.postimg.cc/3R91XK8K/Comic-Con.jpg",
      date: "2023-05-15",
      description: "Meet your favourite comic book heroes and enjoy exclusive previews of upcoming releases.",
      category: "Costume Party",
      place: "Hall A",
      capacity: 35000,
      price: 25,
      __v: 0,
      assistance: 27890,
    },
    {
      _id: "639c723c992482e5f2834bf4",
      name: "Electronic Fest",
      image: "https://i.postimg.cc/0zJdpFzL/Electronic-Fest.jpg",
      date: "2023-03-21",
      description: "Enjoy the best electronic music with live performances by top DJs.",
      category: "Music Concert",
      place: "Main Stage",
      capacity: 80000,
      price: 50,
      __v: 0,
      assistance: 65478,
    },
    {
      _id: "639c723c992482e5f2834bf6",
      name: "10k for Life",
      image: "https://i.postimg.cc/nc9d3xQX/10k-for-Life.jpg",
      date: "2023-07-01",
      description: "Join us for a 10k race for a great cause. All proceeds go to charity.",
      category: "Race",
      place: "Central Park",
      capacity: 10000,
      price: 20,
      __v: 0,
      assistance: 8000,
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  const eventsContainer = document.getElementById('events-container');
  const searchInput = document.getElementById('search-input');
  const filtersContainer = document.getElementById('filters-container');
  const eventDetails = document.getElementById('event-details');
  
  const filterEvents = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategories = Array.from(filtersContainer.querySelectorAll('input[type="checkbox"]:checked'))
                                    .map(checkbox => checkbox.dataset.category);

    eventsContainer.innerHTML = '';

    const filteredEvents = data.events.filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchTerm);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
      const isPastEvent = new Date(event.date) < new Date(data.currentDate);

      return matchesSearch && matchesCategory && isPastEvent;
    });

    filteredEvents.forEach(event => {
      const eventCard = document.createElement('div');
      eventCard.className = 'col-md-4 mb-4';
      eventCard.innerHTML = `
        <div class="card">
          <img src="${event.image}" class="card-img-top" alt="${event.name}">
          <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}</p>
            <a href="#" class="btn btn-primary" data-id="${event._id}">View Details</a>
          </div>
        </div>
      `;
      eventsContainer.appendChild(eventCard);
    });
  };

  searchInput.addEventListener('input', filterEvents);
  filtersContainer.addEventListener('change', filterEvents);

  document.addEventListener('click', (event) => {
    if (event.target.matches('a[data-id]')) {
      event.preventDefault();
      const eventId = event.target.dataset.id;
      const event = data.events.find(event => event._id === eventId);
      
      if (event) {
        eventDetails.innerHTML = `
          <div class="card">
            <img src="${event.image}" class="card-img-top" alt="${event.name}">
            <div class="card-body">
              <h5 class="card-title">${event.name}</h5>
              <p class="card-text">${event.description}</p>
              <p><strong>Date:</strong> ${event.date}</p>
              <p><strong>Place:</strong> ${event.place}</p>
              <p><strong>Capacity:</strong> ${event.capacity}</p>
              <p><strong>Price:</strong> $${event.price}</p>
              <p><strong>Assistance:</strong> ${event.assistance || 'N/A'}</p>
            </div>
          </div>
        `;
        eventDetails.style.display = 'block';
      }
    }
  });

  filterEvents(); 
});
