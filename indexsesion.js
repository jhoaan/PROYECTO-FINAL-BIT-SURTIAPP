var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended: true }));


var path = __dirname + '/src/views';
app.set('views', path);
app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://ahn_steven:1193587993@cluster0.r5ean.mongodb.net/surtiappDatabase?retryWrites=true&w=majority")
.then(function(db){
    console.log("Conectado a la BD");
})
.catch(function(err){
    console.log(err);
});

var Surtiapp = require("./src/models/formularios");



app.get('/inicio/sesion', function(req,res) {
    res.render("index");
});
//Validación de contraseña
app.post("/iniciarsesion", function(req, res){
    var email = req.body.correo;
    var password = req.body.contraseña;

     if (email == "surtiapp@gmail.com" && password == "12345"){
        
         res.redirect("/registro")
     }else if(email == "jsrodriguez115@gmail.com" && password == "67890"){
         res.redirect("/olvido")
     }else{
         res.send("verifica tu email o contraseña")
     }

})

app.get('/registro', function(req,res){
    res.render('registro');
});

app.post('/registrar', async function(req, res){
    var datos = await new Surtiapp (req.body);
    datos.save();
    res.redirect("/inicio/sesion")
});

app.get('/olvide/:id', async function(req,res){
   res.render("olvidelacontraseña"); 
   var id = req.params.id;

    var contraseña = await Surtiapp.findById(id);

    res.render('olvidelacontraseña', {
        nuevo: false,
        res: contraseña
    });
});

app.post('/olvide', async function(req,res){
    var datos = req.body;

    await Surtiapp.updateOne({_id: req.body.id}, datos);

    res.redirect("/inicio/sesion");
});


/*app.get("/inicio/sesion", function(req, res){
    var nombre = "Yeisson";
    res.render("index",{
        nom: nombre,
        ape: "Torres"
    });
});*/ 
//Muestra el inicio (listado de reservas)

//app.get('/inicio', async function(req, res){
//    var listado = await Reserva.find().sort({idCliente: 1});

//    res.render('index', {
//        reservas: listado
//    });
//});
/*

//Nueva Reserva
app.get('/crear', function(req, res){
    
    res.render('agregar', {
        nuevo: true
    });

});

//Insertar Reserva
app.post('/reserva', async function(req, res){
    var datos = req.body;

    var nuevaReserva = new Reserva(datos);
    await nuevaReserva.save();

    res.redirect('/inicio');
});


//Ver detalle
app.get('/detalle/:id/:auto', async function(req, res){
    var id = req.params.id;

    var reserva = await Reserva.findById(id);

    res.render('detalle', {
        res: reserva
    });
});


//Modiciar
app.get('/modificar/:id', async function(req, res){
    var id = req.params.id;

    var reserva = await Reserva.findById(id);

    res.render('agregar', {
        nuevo: false,
        res: reserva
    });

});

app.post('/modificar', async function(req, res){
    var datos = req.body;

    await Reserva.updateOne({_id: req.body.id}, datos);

    res.redirect("/inicio");

});


//Eliminar
app.get('/eliminar/:id', async function(req, res){
    var id = req.params.id;
    
   await Reserva.findByIdAndRemove(id);

   res.redirect("/inicio");

});
*/


app.listen(4000);

/*
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()
*/