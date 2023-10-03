// Bringing in the required npm modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connection to the mLab database 
mongoose.connect('mongodb://sagar:sagar123@ds041404.mlab.com:41404/devconnect',
                 {useNewUrlParser: true,
                  useUnifiedTopology: true});

let db = mongoose.conection;

const app = express();

// Importing the models
let Animal = require('./models/animal');
let Country = require('./models/country');

// Pug will help us define the HTML structure
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// BodyParser will be used to extract user-entered information
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Returns all the animals present -- GET
app.get("/", (req,res)=>{
    Animal.find({}, (err, animals)=>{
        if(err){
            console.log(err);
        } else{
            res.render("index-animal", {animals:animals, 'active':'active'});
        }
    })
});

// Returns all the countries present --GET
app.get("/countries", (req,res)=>{
    Country.find({}, (err, countries)=>{
        if(err){
            console.log(err);
        } else{
            res.render("index-country", {countries:countries});
        }
    })
});

// Display the form to add animals to the existing countries -- GET
app.get("/countries/edit/:id", (req,res)=>{
    Country.findById(req.params.id, (err, countries)=>{
        if(err){
            console.log(err);
        } else{
            Animal.find({}, (err, animals)=>{
                if(err){
                    console.log(err);
                } else{
                    res.render("edit-country", {countries:countries, animals:animals});
                }
            })
        }
    })
});

// Renders the pug template to add new animals -- GET
app.get('/animals/add', (req,res)=>{
    res.render('addAnimal', {})
});

// Renders the pug template to add new countries -- GET
app.get('/countries/add', (req,res)=>{
    res.render('addCountry', {})
});

// Adds a new animal to the database -- POST
app.post('/animals/add', (req,res)=>{
    let animal = new Animal();
    animal.type = req.body.type;
    animal.color = req.body.color;
    animal.save((err)=>{
        if(err){
            console.log(err);
            return;
        } else{
            res.redirect('/');
        }
    });
});

// Adds a new country to the database -- POST
app.post('/countries/add', (req,res)=>{
    let country = new Country();
    country.name = req.body.country_name;
    country.age = req.body.age;
    country.save((err)=>{
        if(err){
            console.log(err);
            return;
        } else{
            res.redirect('/countries');
        }
    });
});

// Updates the country with the selected animal -- POST
app.post('/countries/edit/:id', (req,res)=>{
    let query = {_id:req.params.id};
    Country.updateOne(query, 
        { $push: { animals: req.body.dropDown  } }
        , (err)=>{
        if(err){
            console.log(err);
            return;
        } else{
            res.redirect('/countries');
        }
    });
});

// Deletes the selected animal -- DELETE
app.delete('/animals/:id', (req,res)=>{
    let query = {_id: req.params.id};
    Animal.deleteOne(query, (err)=>{
        if(err){
            console.log(err);
        } 
        res.send('success');
    });
});

// Removes the selected country -- DELETE
app.delete('/countries/:id', (req,res)=>{
    let query = {_id: req.params.id};
    Country.deleteOne(query, (err)=>{
        if(err){
            console.log(err);
        } 
        res.send('success');
    });
});

app.listen(3000, ()=>{
    console.log("server is up!");
});