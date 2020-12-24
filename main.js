const countryEndpoint = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json';
const stateEndpoint = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json';

const searchInput = document.querySelector('input');
const suggestions = document.querySelector('.suggestions');

let countries = [];
let states = [];
let countriesAndStates = [];

// Fetch Countries of The World 
fetch(countryEndpoint).then(blob => blob.json())
    .then(data => {
    countries = data;
});

// Fetch States of The World 
fetch(stateEndpoint).then(blob => blob.json())
    .then(data => {
    states = data;
    countriesAndStates = countries.concat(states);
});

// Function to Find Countries and States of the World 
function findPlace(placeName, countriesAndStates) {
    return countriesAndStates.filter(place => {
       const regexPlace = new RegExp(placeName,'gi');
       return place.name.match(regexPlace);
    });
}

// To Show Matches 
function displayMatches() {
    const matchPlaceArray = findPlace(this.value, countriesAndStates);
    const placesHtml = matchPlaceArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const searchTerm = place.name.replace(regex, `<span class="bg-green-500">${this.value}</span>`);

        if (place.hasOwnProperty('capital')) {
         return `
            <li class="p-3 bg-gray-200 shadow capitalize rounded-sm">
            <span class="text-xl font-semibold">${searchTerm}</span>
            <span class="text-right text-xl pl-1">${place.emoji}</span>
            <span class="block"><strong>Capital:</strong> ${place.capital}</span>
            <span class="block"><strong>Region:</strong> ${place.region}</span>
            <span class="block"><strong>Subregion:</strong> ${place.subregion}</span>
            <span class="block"><strong>Native:</strong> ${place.native}</span>
            <span class="block"><strong>Currency:</strong> ${place.currency}</span> 
            <span class="block"><strong>Phone Code:</strong> +${place.phone_code}</span>
            </li>`;
      } 
        else {
            const details = countries.filter(country => country.iso2 === place.country_code)
            .map(detail => {
              return `
                <li class="p-3 bg-gray-200 shadow capitalize rounded-sm">
                <span class="text-xl font-semibold">${searchTerm}</span>
                <span class="text-right text-xl pl-1">${detail.emoji}</span>
                <span class="block"><strong>Country:</strong> ${detail.name}</span>
                <span class="block"><strong>Region:</strong> ${detail.region}</span>
                <span class="block"><strong>Subregion:</strong> ${detail.subregion}</span>
                <span class="block"><strong>Country Code:</strong> ${place.country_code}</span>
                <span class="block"><strong>Native:</strong> ${detail.native}</span>
                <span class="block"><strong>Currency:</strong> ${detail.currency}</span> 
                <span class="block"><strong>Phone Code:</strong> +${detail.phone_code}</span>
                </li>
               `;
            }).join('');
         return details;
      }
    }).join('');

    suggestions.innerHTML = placesHtml;
}

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('input', displayMatches);