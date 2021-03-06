console.log('client side js file is loaded');

fetch('http://puzzle.mead.io/puzzle').then((response) => {

    response.json().then((data) => {
        console.log(data);
    })
})

//http://localhost:3000/weather?address=!
// fetch('http://localhost:3000/weather?address=boston').then((response) => {

//     response.json().then((data) => {

//         if (data.error) {
//             console.log(data.error);
//         }
//         else {
//             console.log(data.location);
//             console.log(data.forecast);
//         }

//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = ''; 

//event = e //
weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;
    console.log(location);
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    //'http://localhost:3000/weather?address='

    fetch('/weather?address=' + location).then((response) => {

        response.json().then((data) => {

            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
            }
            else {
                messageOne.textContent = 'Location : ' + data.location;
                messageTwo.textContent = 'ForeCast : ' + data.forecast;
                console.log(data.location);
                console.log(data.forecast);

            }

        })
    })
})