console.log('client side javascript');

let url = 'http://localhost:3000/wether?location=';


const wetherform = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2')

wetherform.addEventListener('submit', (e) => {
    e.preventDefault()

    msg1.textContent = 'loding...'
    msg2.textContent = ''


    fetch(url + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = 'Error'
                msg2.textContent = data.error
                search.value = ''
            } else {

                msg1.textContent = 'WETHER INFORMATION'
                msg2.textContent = 'lATTIUDE :' + data.latitude + '\n' + 'LONGTIUDE :' + data.longtiude + '\n' + 'TEMPRETURE :' + data.temprature + '\n'
                search.value = ''
            }
        })
    })



})

