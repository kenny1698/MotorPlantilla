const express = require('express');

const app = express();
const PORT = 8080;

const productos = []
//app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

const server = app.listen(PORT, () => {
    console.log('Servidor HTTP escuchando en el puerto', server.address().port);
});
server.on('error', error => console.log('Error en servidor', error));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/productos', function(req, res) {
    if (productos.length > 0){
        res.render('historial', {productos});
    }else{
        res.render('historial', {productos});
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