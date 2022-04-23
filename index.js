const express = require('express');
const mongoose = require("mongoose");

const PORT = 3300;

const app = express();
const usersRoutes = require("./api/users/routes");
const listRoutes = require("./api/list/routes");
const favsRoutes = require("./api/favs/routes");
//connect mongo
mongoose.connect(
	`mongodb://localhost:27017/favsdb`
);

app.use(express.json());
app.use('/api/users', usersRoutes)
app.use('/api/list', listRoutes)
app.use('/api/favs', favsRoutes)
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});