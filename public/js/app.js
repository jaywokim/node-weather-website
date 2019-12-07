console.log('client side javascript file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})


// fetch('http://localhost:3000/weather?address=seoul').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)    
//         } else if (data.location) {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
        
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = ' from javascript '

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = ' loading '
    messageTwo.textContent = ''

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)    
                messageOne.textContent = data.error
            } else if (data.location) {
                console.log(data.location)
                console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                // messageOne.textContent = data.location + "   " + data.forecast
            }
            
        })
    })



    console.log(location)
})