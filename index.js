let express = require("express");
let bodyParser = require ("body-parser");
let mongoose = require ("mongoose");
let app = express();

app.use(bodyParser.urlencoded({ extended: true}));

app.set('views', __dirname + '/src/views');
app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.connect("mongodb+srv://ahn_steven:1193587993@cluster0.r5ean.mongodb.net/surtiappDatabase?retryWrites=true&w=majority")
.then(function(db){
    console.log("Estamos Conectados")
})
.catch(function(err){
    console.log(err)
});

let inventario = require("./src/models/inventario");

app.get("/inventario", async function(req,res){
    let busquedaDatos = await inventario.find().sort({idCategoria: 1});
    res.render("index",{
        inventarios : busquedaDatos
    });
});
//Nuevo
app.get('/crear', function(req, res){
    
    res.render('agregar', {
        nuevo: true
    });

});
//Agregar
app.post('/subproducto', async function(req, res){
    let datos = req.body;

    let nuevoProducto = new inventario (datos);
    await nuevoProducto.save();

    res.redirect('/inventario');
});
//Ver detalle
app.get('/detalle/:id/:idCategoria', async function(req, res){
    let id = req.params.id;

    let detalle = await inventario.findById(id);

    res.render('detalle', {
        res: detalle
    });
});

//Modificar
app.get('/modificar/:id', async function(req, res){
    let id = req.params.id;

    let detalle = await inventario.findById(id);

    res.render('agregar', {
        nuevo: false,
        res: detalle
    });

});
app.post('/modificar', async function(req, res){
    let datos = req.body;

    await inventario.updateOne({_id: req.body.id}, datos);

    res.redirect("/inventario");

});

//Eliminar
app.get('/eliminar/:id', async function(req, res){
    let id = req.params.id;
    
   await inventario.findByIdAndRemove(id);

   res.redirect("/inventario");

});

// empieza
let Surtiapp = require("./src/models/formularios");

app.get('/inicio', function(req, res){
    res.render("inicio");
});

app.get('/inicio/sesion', function(req,res) {
    res.render("indexsesion");
});
//Validación de contraseña
app.post("/iniciarsesion", function(req, res){
    let email = req.body.correo;
    let password = req.body.contraseña;

     if (email == "surtiapp@gmail.com" && password == "12345"){
        
         res.redirect("/inventario");
     }else if(email == "jsrodriguez115@gmail.com" && password == "67890"){
         res.redirect("/inicio");
     }else{
         res.send("verifica tu email o contraseña");
     }

});

app.get('/registro', function(req,res){
    res.render('registro');
});

app.post('/registrar', async function(req, res){
    let datos = await new Surtiapp (req.body);
    datos.save();
    res.redirect("/inicio/sesion")
});

app.get('/olvide/:id', async function(req,res){
   res.render("olvidelacontraseña"); 
   let id = req.params.id;

    let contraseña = await Surtiapp.findById(id);

    res.render('olvidelacontraseña', {
        nuevo: false,
        res: contraseña
    });
});

// PRODUCTO1

app.get('/producto1', function(req, res){
    res.render('producto1')
});

//COMPRA

app.get('/compra', function(req, res){
    res.render('compra')
});

//PAGO

app.get('/pago', function(req, res){
    res.render('pago')
})




// app.post('/olvide', async function(req,res){
//     let datos = req.body;

//     await Surtiapp.updateOne({_id: req.body.id}, datos);

//     res.redirect("/inicio/sesion");
// });


app.listen(3000);
