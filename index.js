require('dotenv').config({path:"./config.env"})

const express = require('express')
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

app.use("/api/v1/todo", require('./routes/Todo.js'))


app.use((err, req, res, next) => {
    console.error(err.stack) 
    res.status(500).send("Something broke!")
})

const port = process.env.PORT
const server = app.listen(port, () => {
    console.log(`server started on: localhost:${port}`)
})

process.on('unhandledRejection', (err) => {
    console.log(err.message) 
    server.close(() => process.exit(1))
})