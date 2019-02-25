const express = require('express')
const methodOverride = require('method-override')
const parser = require('body-parser')

const app = express()

app.set("view engine", "hbs");
app.use(express.static('public'))
app.use(methodOverride("_method"))

app.set('port', process.env.PORT || 1874)

app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})