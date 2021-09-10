const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
const PORT = 8080;

const productos = []

//app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

const server = app.listen(PORT, () => {
    console.log('Servidor HTTP escuchando en el puerto', server.address().port);
});
server.on('error', error => console.log('Error en servidor', error));

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials"
    })
);

app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', 'hbs'); // registra el motor de plantillas


app.get('/productos', function(req, res) {
    if (productos.length > 0){
        res.render('historial', { productos, listExists:true});
    }else{
        res.render('historial', { productos, listExists:false});
    }
}); 

app.get('/', function(req, res) {
    res.render('formulario');
});

app.post('/productos', function(req, res) { 
    productos.push(req.body)
    res.redirect('/productos')
    //res.render('formulario', { productos , listExists: true });
}); 