let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let util = require('util');
const router = express.Router();
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware
// parse application/json

app.use(bodyParser.json()) // middleware

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
    console.log(req.me); // this was added via our custom middleware
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.get('/getProfiles', (req, res) => {
    var data = fs.readFileSync(path.join(__dirname + '/profiles.txt'));
    var obj = JSON.parse(data);
    res.json(obj);
})



app.post('/addProfiles', (req, res) => {
    let data = req.body;

    
    fs.writeFileSync("profiles.txt", JSON.stringify(data));
    res.redirect(301, '/');
    
});

app.listen(process.env.PORT || 3000);
