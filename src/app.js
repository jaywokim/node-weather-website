const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')


console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname, '../public'))


const app = express()

// define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static dir to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather ',
        name: 'jay kim'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'about me',
        name: 'jay kim'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        message: 'help me here',
        title: 'help',
        name: 'jay kim'
    })
})




// app.get('' , (req, res) => {
//     res.send('<h1>weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'jay',
//         age: 44
//     },{
//         name: 'hen',
//         age: 6
//     }
//     ])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>WEATHER</h1>')
// })

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            // console.log(error)
            return res.send({
                error
            })
        }
        forecast( longitude, latitude, (error, summary) => {
            if (error) {
                return res.send({
                    error
                })
            }
           
            res.send({
                address: req.query.address,
                forecast: summary,
                location
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })

    }


    console.log(req.query.search)
    res.send({
        products: []
    })
})


// app.com
// app.com/help
// app.com/about

app.get('/help/*', (req,res) => {
    res.render('404', {
        message: 'help article not found',
        title: '404 error',
        name: 'jay kim'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'page not found',
        title: '404 error',
        name: 'jay kim'
    })
})


app.listen(3000 , () => {
    console.log('server is up on port 3000')
})