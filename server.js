const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')

const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/todo", {
    useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to mongoose'))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false}));
app.use(expressLayouts)
app.use('/', indexRouter)


app.listen(3000)

