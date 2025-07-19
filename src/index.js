const express = require('express');
const { PORT } = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true })); // For form-urlencoded bodies

app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Successfully started the server on PORT : ${PORT}`)
});