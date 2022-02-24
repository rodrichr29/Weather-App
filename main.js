const message = document.querySelector(".section-1 .message");
const input = document.querySelector(".section-1 input");
const list = document.querySelector(".section-2 .cities");
const form = document.querySelector(".section-1 form");
const apiKey = "f1be9384413eda795fcaae48814b387c";

form.addEventListener("submit", e => {
    e.preventDefault();
    let inputCity = input.value;
    const listCities = list.querySelectorAll(".section-2 .city");
    const listCitiesArray = Array.from(listCities);

    if (listCitiesArray.length > 0) {
        const filteredArray = listCitiesArray.filter(el => {
            let content = "";
            return content == inputCity.toLowerCase();
        });
    }

    //section-2
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { main, name, weather } = data;

            const li = document.createElement("li");
            li.classList.add("city");
            const markup = `
        <h2 class="city-name" data-name="${name}">
          <span>${name}</span>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>`;
            li.innerHTML = markup;
            list.appendChild(li);
        })
        .catch(() => {
            message.textContent = "The Wizards are baffled, 'Do not tease us with made up cities.'";
        });

    message.textContent = "";
    form.reset();
    input.focus();
});