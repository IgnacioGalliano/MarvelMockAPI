const fs = require('fs');
const express = require('express');
const AppError = require('./utils/AppError');


const app = express ();
const PORT = 3000
app.use(express.json());
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

app.get('/v1/public/characters', (request, serviceResponse) =>   {
    fs.readFile('./Assets/getCharactersResponse.json', 'utf-8', (err, response) => {
      const jsonResponse = JSON.parse(response);
      serviceResponse.status(200).json(jsonResponse);
    });
});

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});