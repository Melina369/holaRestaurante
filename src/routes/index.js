const express= require('express');
const { application } = require('express');
const { authenticate } = require('passport');
const router= express.Router();

const passport = require('passport');

const Empleados = require('../models/empleados'); //importa el esquema de los datos de los empleados
const Task = require('../models/task');  //importa el esquema de las taras
const Comida= require('../models/comida');
const user= require('../models/user');
const Inventario= require('../models/inventario');

router.get('/inicio',(req, res)=>{
    //render entiende que se trata de un archivo ejs
    res.render('inicio', {title : 'Inicio'});
});// render usa el motor de plantillas

//---------------LOGIN-----------------------------------
router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/signup', (req, res, next) => {
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup' ,{
    successRedirect: '/inicio',
    //failureRedirect: '/signup',
    passReqToCallback: true
})); 

router.get('/signin', (req, res, next) => {
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/inicio',
    failureRedirect: '/signin',
    passReqToCallback: true
})); 

router.get('/logout', (req, res, next) => {
    req.logOut();
    res.redirect('/');
});

router.get('/index', isAuthenticated, (req, res, next) => {
    res.render('index');
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

//_______________________Inventario____________________________-----

router.get('/inventario', async (req, res) => { //recupera los datos 
    const inventario= await Inventario.find();
    res.render('inventario', {
        inventario ///permite que lo veamos por pantalla
    });
});

router.get('/nuevo-registro', async (req, res) => { //recupera los datos 
    const inventario= await Inventario.find();
    res.render('inv-form', {
        inventario
    });
});

///recibe los elmentos del formulario y los almacena en un formato entendible para la bd
router.post('/add-inv', async(req, res)  => {
    const inventario= new Inventario(req.body);
    await inventario.save();
    res.redirect('/inventario'); //redireccionar a la ruta principal que enlista los datos
});

//botón done
router.get('/turn-inv/:id', async (req, res) => {
    const { id } = req.params;
    const inventario= await Inventario.findById(id);
    //cambiar el valor del status
    inventario.status= !inventario.status;
    await inventario.save();
    res.redirect('/inventario');
});

//toma el id de un registro para borrarlo
router.get('/delete-inv/:id', async (req, res) => {
    const { id } = req.params; //obetenemos el id del objeto que seleccionamos
    await Inventario.remove({_id: id}); //tomamos el id que nos da el navegador y lo asignamos a la funcion de la bd
    res.redirect('/inventario');
});

//edit get
router.get('/edit-inv/:id', async (req, res) => {
    const { id } = req.params;
    const inventario= await Inventario.findById(id);
    res.render('inv-edit', {
        inventario
    });
});

//edit post
router.post('/edit-inv/:id', async (req, res) => {
    const { id } = req.params;
    await Inventario.update({_id: id}, req.body);
    res.redirect('/inventario');
})


////--------------------Menu----------------------------

router.get('/menu', async (req, res) => { //recupera los datos 
    const comidas= await Comida.find();
    res.render('menu', {
        comidas ///permite que lo veamos por pantalla
    });
});

router.get('/nuevo-menu', async (req, res) => { //recupera los datos 
    const comidas= await Comida.find();
    res.render('menu-form', {
        comidas ///permite que lo veamos por pantalla
    });
});

///recibe los elmentos del formulario y los almacena en un formato entendible para la bd
router.post('/add-m', async(req, res)  => {
    const comida= new Comida(req.body);
    await comida.save();
    res.redirect('/menu'); //redireccionar a la ruta principal que enlista los datos
});

//toma el id de un registro para borrarlo
router.get('/delete-m/:id', async (req, res) => {
    const { id } = req.params; //obetenemos el id del objeto que seleccionamos
 //tomamos el id que nos da el navegador y lo asignamos a la funcion de la bd
    await Comida.remove({_id: id});
    res.redirect('/menu');
});

//edit get
router.get('/edit-m/:id', async (req, res) => {
    const { id } = req.params;
    const comida= await Comida.findById(id);
    res.render('m-edit', {
        comida
    });
});

//edit post
router.post('/edit-m/:id', async (req, res) => {
    const { id } = req.params;
    await Comida.update({_id: id}, req.body);
    res.redirect('/menu');
});


///--------------------------------------------

//----------------EMPLEADOS---------------------------

router.get('/empleados', async (req, res)=>{
    //render entiende que se trata de un archivo ejs
    const empleados= await Empleados.find();
    res.render('empleados', {
        empleados ///permite que lo veamos por pantalla
    });

});

router.get('/empleado', async (req, res) => { //recupera los datos 
    const empleados= await Empleados.find();
    res.render('e-form', {
        empleados
    });
});


///recibe los elmentos del formulario y los almacena en un formato entendible para la bd
router.post('/add', async(req, res)  => {
    const empleado= new Empleados(req.body);
    await empleado.save();
    res.redirect('/empleados'); //redireccionar a la ruta principal que enlista los datos
});

//toma el id de un registro para borrarlo
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params; //obetenemos el id del objeto que seleccionamos
    await Empleados.remove({_id: id}); //tomamos el id que nos da el navegador y lo asignamos a la funcion de la bd
    res.redirect('/empleados');
});

//edit get
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const empleado= await Empleados.findById(id);
    res.render('edit', {
        empleado
    });
});

//edit post
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Empleados.update({_id: id}, req.body);
    res.redirect('/empleados');
})

//---------------------------------------------------
//----------------------NOTAS------------------------
router.get('/notas', async (req, res) => { //recupera los datos 
    const tasks= await Task.find();
    res.render('notas', {
        tasks ///permite que lo veamos por pantalla
    });
});
///recibe los elmentos del formulario y los almacena en un formato entendible para la bd
router.post('/add-n', async(req, res)  => {
    const task= new Task(req.body);
    await task.save();
    res.redirect('/notas'); //redireccionar a la ruta principal que enlista los datos
});

//botón done
router.get('/turn/:id', async (req, res) => {
    const { id } = req.params;
    const task= await Task.findById(id);
    //cambiar el valor del status
    task.status= !task.status;
    await task.save();
    res.redirect('/notas');
});

//toma el id de un registro para borrarlo
router.get('/delete-n/:id', async (req, res) => {
    const { id } = req.params; //obetenemos el id del objeto que seleccionamos
    await Task.remove({_id: id}); //tomamos el id que nos da el navegador y lo asignamos a la funcion de la bd
    res.redirect('/notas');
});

//edit get
router.get('/edit-n/:id', async (req, res) => {
    const { id } = req.params;
    const task= await Task.findById(id);
    res.render('edit-n', {
        task
    });
});

//edit post
router.post('/edit-n/:id', async (req, res) => {
    const { id } = req.params;
    await Task.update({_id: id}, req.body);
    res.redirect('/notas');
})

///---------------------------------------------------------------------------

module.exports= router;