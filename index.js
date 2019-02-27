const express = require("express")
const methodOverride = require("method-override")
const parser = require("body-parser")
const app = express()

app.set("view engine", "hbs");
app.set("port", process.env.PORT || 1874)

app.use(express.static("public"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(parser.urlencoded({extended: true}))
app.use(require("./routes/index"))

app.listen(app.get("port"), () => {
    console.log(`✅ PORT: ${app.get("port")} 🌟`)
})