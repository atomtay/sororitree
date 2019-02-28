const express = require("express")
const methodOverride = require("method-override")
const parser = require("body-parser")
const exphbs = require('express-handlebars');
const flash = require("connect-flash");
const hbs = exphbs.create({extname: '.hbs'});
const app = express()

app.engine('handlebars', hbs.engine);

app.set('views', __dirname + '/views/');
app.set('view engine', hbs.extname);
app.set("port", process.env.PORT || 1874)

app.use(flash());
app.use(express.static("public"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(parser.urlencoded({extended: true}))
app.use(require("./routes/index"))


app.listen(app.get("port"), () => {
    console.log(`✅ PORT: ${app.get("port")} 🌟`)
})