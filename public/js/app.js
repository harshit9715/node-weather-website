const weatherForm = document.querySelector('form'),
    search = document.querySelector('input'),
    msg1 = document.querySelector('#msg-1'),
    msg2 = document.querySelector('#msg-2'),
    w_icon = document.querySelector('#weather-icon');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    msg2.textContent = undefined
    msg1.textContent = 'Loading...'
    w_icon.src = ''
    fetch(`http://localhost:3000/weather?address=${search.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
                msg2.textContent = undefined
            }
            else {
                msg1.textContent = data.location
                msg2.textContent = data.forecast
                w_icon.src = data.icon
            }
        })
    })
})

