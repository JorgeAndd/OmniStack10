const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

const mongoUri = 'mongodb://localhost/omni?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose successfully connected to ' + mongoUri);
});

mongoose.connection.on('error', () => {
    console.log('[Error] Mongoose could not connect to ' + mongoUri);
});


app.use(express.json());
app.use(routes);

app.listen(3333);