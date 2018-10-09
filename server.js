var express = require("express");
var hbs = require("hbs");
var fs = require("fs");

var app = express();

var port = process.env.PORT || 3000;

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.use((req, res, next)=>{
    var log = `${new Date().toString()} : ${req.method} ${req.url} \n`;
   fs.appendFile("logs.log", log, (err)=>{
    if(err) {
        console.log("Log could not be appended");
   }
})
next();
});

// app.use((req,res,next)=>{
//     res.render('maintanance.hbs');
// })

app.use(express.static(__dirname + '/public'));

app.get('/',(req, res)=>{
    res.render('about.hbs',{
        name : "Sneha"
    });
})
 
app.get('/home', (req, res)=>{
    res.render('home.hbs');
})

app.get('/about',(req, res)=>{
    res.send('<h1>Hi About page</h1>');
})

app.get('/getJSON',(req, res)=>{
    res.send({
        name: 'Sneha',
        age: 21
    });
})
app.listen(port);                                                                                                               