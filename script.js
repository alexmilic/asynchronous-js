'use strict';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function(data, className = '') {
    const html = `
        <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${Number((data.population / 1000000).toFixed(1))} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>C${data.currencies[0].name}UR</p>
        </div>
        </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
}

const renderError = function(msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
}

// const getCountryAndNeighbour = function(country) {
    
//     ///////////////////////////////////////
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//     request.send();
//     request.addEventListener('load', function() {
//         const [data] = JSON.parse(this.responseText);
//         renderCountry(data);

//         const neighbour = data.borders;
//         if( !neighbour ) return;

//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//         request2.send();

//         request2.addEventListener('load', function() {
//             const data2 = JSON.parse(this.responseText);
//             renderCountry(data2, 'neighbour');
//         });
//     });
// }

// getCountryAndNeighbour('portugal');


const getCountryData = function(country) {
    // Country 1
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Country not found ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        renderCountry(data[0]);
        const neighbour = data[0].borders[0]
        if (!neighbour) throw new Error('No neighbour found!');
        
        // Country 2
        return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`)
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(error => {
        console.error(`${error}`)
        renderError(`Something went wrong! See error: ${error.message}`);
    })
    .finally(() => {
        countriesContainer.style.opacity = 1;
    });
}

btn.addEventListener('click', function() {
    getCountryData('portugal');
    return
});
