const express = require('express');

const app = express();

app.use(express.json());

//const booksRoutes = require('./route/books_routes');
//const userRoutes = require('./route/user_routes');

//app.use('/api/books', booksRoutes);
//app.use('/api/auth/login', userRoutes);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user1:Ihp24@cluster0.2uyvp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
      .then(() => console.log('Connexion à MongoDB réussie !'))
      .catch(() => console.log('Connexion à MongoDB échouée !'));
  
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://user1:Ihp24@cluster0.2uyvp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      
    async function run() {
        try {
          // Connect the client to the server	(optional starting in v4.7)
          await client.connect();
          // Send a ping to confirm a successful connection
          await client.db("admin").command({ ping: 1 });
          console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
        }
      }
    run().catch(console.dir);

const books = require('./model/book');

//routes books
app.get('/api/books', (req, res, next) => {
     Book.find()
     .then(book => res.status(200).json(book))
     .catch(error => res.status(400).json({ error }));
    });
app.get('/api/books/:id', (req, res, next) => {
    Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
    });
app.get('/api/books/bestratings', (req, res, next) => {
     res.status().json();
    });
app.post('/api/books', (req, res, next) => {
    //delete req.body._id;
    const book = new Book({
        ...req.body
    });
    book.save()
    .then(() => res.status(201).json({message: 'livre enregistré'}))
    .catch(error => res.status(400).json({error}));
    });
app.post('/api/books/:id/rating', (req, res, next) => {
     res.status(201).json();
    });
app.put('/api/books/:id', (req, res, next) => {
     res.status().json();
    });
app.delete('/api/books/:id', (req, res, next) => {
     res.status().json();
    });

//routes user
app.post('/api/auth/signup', (req, res, next) => {
    res.status(201).json();
   });
app.post('/api/books/login', (req, res, next) => {
     res.status(200).json();
    });
module.exports = app;