document.addEventListener("DOMContentLoaded", () => {
  const events = [
    { id: 1, title: "Марафон на 10 км", date: "2025-05-10" },
    { id: 2, title: "Турнир по баскетболу", date: "2025-05-15" },
    { id: 3, title: "Чемпионат по плаванию", date: "2025-05-20" }
  ];
  // Главная страница — показываем карточки событий
  if (window.location.pathname.endsWith("index.html")) {
    const eventCards = document.getElementById("event-cards");

    events.forEach(event => {
      const card = document.createElement("div");
      card.classList.add("event-card");
      card.innerHTML = `
        <strong>${event.title}</strong> — ${event.date}
      `;
      eventCards.appendChild(card);
    });

    // Форма регистрации
    const form = document.getElementById("registration-form");
    const eventSelect = document.getElementById("event-select");

    events.forEach(event => {
      const option = document.createElement("option");
      option.value = event.id;
      option.textContent = event.title;
      eventSelect.appendChild(option);
    });

    form.addEventListener("submit", e => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const selectedEvent = events.find(e => e.id == data.event);

      const registeredEvents = JSON.parse(localStorage.getItem("registeredEvents") || "[]");
      registeredEvents.push(selectedEvent);
      localStorage.setItem("registeredEvents", JSON.stringify(registeredEvents));

      alert(`Вы зарегистрировались на "${selectedEvent.title}"`);
      form.reset();
    });
  }

  // Страница "Мои соревнования"
  if (window.location.pathname.endsWith("competitions.html")) {
    const container = document.getElementById("user-events");
    const registeredEvents = JSON.parse(localStorage.getItem("registeredEvents") || "[]");

    if (container) {
      if (registeredEvents.length === 0) {
        container.innerHTML = "<p>Вы ещё не зарегистрированы ни на одно событие.</p>";
      } else {
        container.innerHTML = "<h3>Ваши события:</h3><ul>";
        registeredEvents.forEach(event => {
          container.innerHTML += `<li class="registered-event">${event.title} — ${event.date} <button onclick="unregister('${event.id}')">Отменить регистрацию</button></li>`;
        });
        container.innerHTML += "</ul>";
      }
    }
  }

  // Функция отмены регистрации
  function unregister(eventId) {
    const registeredEvents = JSON.parse(localStorage.getItem("registeredEvents") || "[]");
    const updatedEvents = registeredEvents.filter(event => event.id !== parseInt(eventId));
    localStorage.setItem("registeredEvents", JSON.stringify(updatedEvents));
    window.location.reload(); // Обновляем страницу
  }
});

  const eventList = document.getElementById("event-list");
  const eventSelect = document.getElementById("event-select");

   // Функция отмены регистрации
  function unregister(eventId) {
    
    // Подтверждение действия
  const confirmUnregister = confirm("Вы уверены, что хотите отменить регистрацию?");
  
  if (!confirmUnregister) return; // Если пользователь отменил — выходим

  const registeredEvents = JSON.parse(localStorage.getItem("registeredEvents") || "[]");
  const updatedEvents = registeredEvents.filter(event => event.id !== parseInt(eventId));
  localStorage.setItem("registeredEvents", JSON.stringify(updatedEvents));

  // Находим элемент в DOM
  const listItem = document.querySelector(`.registered-event[data-id="${eventId}"]`);
  if (listItem) {
    listItem.classList.add('fade-out'); // Активируем анимацию исчезновения

    // Удаляем элемент после завершения анимации
    listItem.addEventListener('animationend', () => {
      listItem.remove();
    });
  }
  }

  // Вывод событий
  events.forEach(event => {
    const div = document.createElement("div");
    div.classList.add("event-item");
    div.innerHTML = `<strong>${event.title}</strong> — ${event.date}`;
    eventList.appendChild(div);

    // Добавляем в выпадающий список
    const option = document.createElement("option");
    option.value = event.id;
    option.textContent = event.title;
    eventSelect.appendChild(option);
  });

  // Обработка формы регистрации
  const form = document.getElementById("registration-form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    alert(`Вы зарегистрированы на "${data.event}" как ${data.name}`);
    form.reset();
  });

document.addEventListener("DOMContentLoaded", () => {
  // Логика для competitions.html
  if (window.location.pathname.endsWith("competitions.html")) {
    const userEvents = JSON.parse(localStorage.getItem("registeredEvents") || "[]");

    const container = document.getElementById("user-events");
    if (container) {
      if (userEvents.length === 0) {
        container.innerHTML = "<p>Вы ещё не зарегистрированы ни на одно событие.</p>";
      } else {
        container.innerHTML = "<h3>Ваши события:</h3><ul>";
        userEvents.forEach(event => {
          container.innerHTML += `<li>${event.title} — ${event.date}</li>`;
        });
        container.innerHTML += "</ul>";
      }
    }
  }

  // Логика для формы регистрации (на главной странице)
  const form = document.getElementById("registration-form");
  if (form) {
    const eventSelect = document.getElementById("event-select");

    const events = [
      { id: 1, title: "Марафон на 10 км", date: "2025-05-10" },
      { id: 2, title: "Турнир по баскетболу", date: "2025-05-15" },
      { id: 3, title: "Чемпионат по плаванию", date: "2025-05-20" }
    ];

    events.forEach(event => {
      const option = document.createElement("option");
      option.value = event.id;
      option.textContent = event.title;
      eventSelect.appendChild(option);
    });

    form.addEventListener("submit", e => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const selectedEvent = events.find(e => e.id == data.event);

      const registeredEvents = JSON.parse(localStorage.getItem("registeredEvents") || "[]");
      registeredEvents.push(selectedEvent);
      localStorage.setItem("registeredEvents", JSON.stringify(registeredEvents));

      alert(`Вы зарегистрировались на "${selectedEvent.title}"`);
      form.reset();
    });
  }
});

