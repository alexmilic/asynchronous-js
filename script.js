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

// const renderError = function(msg) {
//     countriesContainer.insertAdjacentText('beforeend', msg);
// }

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


// const getCountryData = function(country) {
//     // Country 1
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`Country not found ${response.status}`);
//         }
//         return response.json();
//     })
//     .then((data) => {
//         renderCountry(data[0]);
//         const neighbour = data[0].borders[0]
//         if (!neighbour) throw new Error('No neighbour found!');
        
//         // Country 2
//         return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`)
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(error => {
//         console.error(`${error}`)
//         renderError(`Something went wrong! See error: ${error.message}`);
//     })
//     .finally(() => {
//         countriesContainer.style.opacity = 1;
//     });
// }

// btn.addEventListener('click', function() {
//     getCountryData('portugal');
//     return
// });

// const lotteryPromise = new Promise(function(resolve, reject) {
//     console.log(`Lattery draw is happening!`);
//     setTimeout(() => {
//         if(Math.random() >= 0.5) {
//             resolve(`You win 💰`)
//         } else {
//             reject(new Error(`You lost your money 🗣️`));
//         }
//     }, 2000);
// });

// lotteryPromise
// .then(response => console.log(response))
// .catch(error => console.error(error))

// const wait = function(seconds) {
//     return new Promise(function(resolve) {
//         setTimeout(resolve, seconds * 1000);
//     });
// }

// wait(1).then(() => {
//     console.log(`I waited for 1 seconds`);
//     return wait(1);
// })
// .then(() => {
//     console.log(`I waited for 2 seconds`);
//     return wait(1);
// })
// .then(() => {
//     console.log(`I waited for 3 seconds`);
//     return wait(1);
// })
// .then(() => {
//     console.log(`I waited for 4 seconds`);
//     return wait(1);
// });

// const getPosition = function() {
//     return new Promise(function(resolve, reject) {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     })
// }

// const whereAmI = async function() {
//     const pos = await getPosition();
//     const {latitude: lat, longitude: lng} = pos.coords;

//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     const dataGeo = await resGeo.json();
    
//     const res = await fetch(`https://restcountries.eu/rest/v2/name/${dataGeo.country}`);
//     const data = await res.json();
//     renderCountry(data[0]);
//     countriesContainer.style.opacity = 1;
// }

// whereAmI();

const getJSON = function(url, errorMsg = 'Something went wrong') {
    return fetch(url)
    .then(response => {
        if(!response.ok) throw new Error(`${errorMsg} (${response.status})`);
        
        return response.json();
    })
}

const get3Countries = async function(c1, c2, c3) {
    try {
        // const [data1] = await getJSON(`https://restcountries.eu/rest/v2/name/${c1}`);
        // const [data2] = await getJSON(`https://restcountries.eu/rest/v2/name/${c2}`);
        // const [data3] = await getJSON(`https://restcountries.eu/rest/v2/name/${c3}`);

        const data = await Promise.all(
           [ getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
            getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
            getJSON(`https://restcountries.eu/rest/v2/name/${c3}`)]
        )

        console.log(data);
        console.log(data.map(item => item[0].capital));
    } catch(error) {

    }
}

get3Countries('portugal', 'canada', 'tanzania');