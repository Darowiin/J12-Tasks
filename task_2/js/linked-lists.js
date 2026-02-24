document.addEventListener('DOMContentLoaded', function() {
    let countriesWithCities = {
        "Россия": [ "Москва", "Санкт-Петербург", "Новосибирск", "Самара", "Казань" ],
        "Китай": [ "Пекин", "Шанхай", "Гуанчжоу", "Чунцин", "Тяньцзинь" ],
        "США": [ "Нью-Йорк", "Лос-Анджелес", "Чикаго", "Хьюстон", "Финикс" ],
        "Бразилия": [ "Сан-Паулу", "Рио-де-Жанейро", "Бразилиа", "Сальвадор", "Форталеза" ],
        "Индия": [ "Мумбаи", "Дели", "Бангалор", "Хайдарабад", "Ахмедабад" ]
    };

    let countrySelect = document.getElementById('country-select');

    for (let country in countriesWithCities) {
        let option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    }

    countrySelect.addEventListener('change', function() {
        let selectedCountry = countrySelect.value;
        let cities = countriesWithCities[selectedCountry] || [];

        let citySelect = document.getElementById('city-select');
        while (citySelect.firstChild) {
            citySelect.removeChild(citySelect.firstChild);
        }

        for (let city of cities) {
            let option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        }
    });

    countrySelect.dispatchEvent(new Event('change'));
});