var express    = require('express');        // call express
var app        = express();                 // define our app using express

var port = process.env.PORT || 8080;        // set our port

var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

app.post('/multi/InvCont/findByContainerRefs', function(req, res) {
    console.log(req.headers);
    res.json({ message: 'hooray! welcome to our api!' });  
});

router.get('/image', function(req, res) {
    var fileName = req.query.name;
    res.sendFile(
        fileName,
        {
            root: __dirname + "/public/images/",
            headers: {
                "Cache-Control": "max-age=60, public",
                "Content-Type": "image/png"
            }
        }
    );
});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);