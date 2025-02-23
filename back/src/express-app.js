const express = require('express');
const cors  = require('cors');
const { userRoute } = require('./controllers/users');
const middlewareError = require('./middleware/error');


module.exports = async (app) => {
    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());
    app.use(express.static(__dirname + '/public'));

    app.use("/api/data", userRoute);

    app.use(middlewareError);
}