const express = require('express');
const hbs = require('hbs');
const fs  = require('fs');
const app = express();
const port = 3000;

// register partials folder in HandleBar
hbs.registerPartials(__dirname + '/views/partials');
// set Handlebar as the view engine
app.set('view engine', 'hbs');

// custom middleware
app.use((req,res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} : ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log(err);
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintainence.hbs', {
//         pageTitle: 'Maintainence Page'
//     })
//     next();
// });

// serve application assets from the public folder - use() allows us to add middleware
app.use(express.static(__dirname + '/public'));


// Handlerbar getCurrentYear helper
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

// Handlerbar getWelcomeText helper
hbs.registerHelper('getWelcomeText', (text) => {
    return text.toUpperCase();
});

// Default route for home page or index page
app.get('/', (req, res) => res.render('home.hbs', {
    pageTitle: 'Homed Page',
    welcomeText: 'Welcome'
}));

// ROute for aaa string
app.get('/a', (req, res) => res.send('aaa'));

// ROute for user JSON 
app.get('/user', (req, res) => res.send({
    id: 1,
    user: {
        name: 'Deepak'
    }
}));

// ROute for About page
app.get('/about', (req, res) => res.render('about.hbs', {
    pageTitle: 'About Page'
}));

// Route for bad page
app.get('/bad', (req, res) => res.send({
    errorMessage: 'Bad request'
}));


// Start the express app
app.listen(port, () => console.log(`Example app listening on port ${port}!`)); 