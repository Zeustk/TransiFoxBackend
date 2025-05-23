// Requires

const express = require("express"); // Constante que va a requerir el modulo express
const cors = require('cors'); // PERMITE QUE SE COMUNIQUE BACK Y EL FRONT AUNQUE ESTEN EN DOMINIOS DIFERENTES
const path = require('path');
const fs = require('fs');
const DB = require('./db');
const morgan = require("morgan");
require('dotenv').config(); // TOMA LA CONFIGURACION DE EL ARCHIVO .ENV

// Se crea el servidor, el servidor es app
const app = express();
//const { conectarProducer } = require('./kafka/KafkaProducer');
// CORS
app.use(cors());

// Importancion de modulo
const ControllerTir = require('./Controllers/GestionTir');
const ControllerGradientes = require('./Controllers/GestionGradientes');
const ControllerInteresSimple = require('./Controllers/GestionInteresSimple');
const ControllerInteresCompuesto = require('./Controllers/GestionInteresCompuesto');
const ControllerAmortizacion= require('./Controllers/GestionAmortizacion');
const ControllerUsuarios= require('./Controllers/GestionUsuarios');
const ControllerAnualidades= require('./Controllers/GestionAnualidades');
const ControllerCapitalizacion= require('./Controllers/GestionCapitalizacion');

// Instancias de los modulos
const ServicioTirI = new ControllerTir(DB);
const ServicioGradientesI = new ControllerGradientes(DB);
const servicioInteresSimpleI = new ControllerInteresSimple(DB);
const servicioInteresCompuestoI = new ControllerInteresCompuesto(DB);
const servicioAmortizacionI = new ControllerAmortizacion(DB);
const servicioUsuariosI = new ControllerUsuarios(DB);
const servicioAnualidadesI = new ControllerAnualidades(DB);
const servicioCapitalizacionI = new ControllerCapitalizacion(DB);



// Routes (API)
const TirRoutes = require('./routes/GestionTirRoutes')(ServicioTirI);
const GradientesRoutes = require('./routes/GestionGradientesRoutes')(ServicioGradientesI); // Se le pasa el servicio con su base
const InteresSimpleRoutes = require('./routes/GestionInteresSimpleRoutes')(servicioInteresSimpleI);
const InteresCompuestoRoutes = require('./routes/GestionInteresCompuestoRoutes')(servicioInteresCompuestoI);
const AmortizacionRoutes = require('./routes/GestionAmortizacionRoutes')(servicioAmortizacionI);
const UsuariosRoutes = require('./routes/GestionUsuariosRoutes')(servicioUsuariosI);
const AnualidadesRoutes = require('./routes/GestionAnualidadesRoutes')(servicioAnualidadesI);
const CapitalizacionRoutes = require('./routes/GestionCapitalizacionRoutes')(servicioCapitalizacionI);

// SETS

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MIDLEWARE
app.use(express.json({ limit: '5mb' })); // Para que comprenda formato Json
app.use(express.text()); // Para que comprenda formato text
app.use(morgan('dev')); // ejecutar el midleware
app.use(express.urlencoded({ extended: false })); // Para que entienda los datos de formulario y el extended significa que solo es texto, no es algo complicado
app.use('/public', express.static(path.join(__dirname, 'public')));

// ROUTES (Ejecucion)

app.use(TirRoutes);
app.use(GradientesRoutes);
app.use(InteresSimpleRoutes);
app.use(InteresCompuestoRoutes);
app.use(AmortizacionRoutes);
app.use(UsuariosRoutes);
app.use(AnualidadesRoutes);
app.use(CapitalizacionRoutes);

//(async () => {
 // await conectarProducer();
//})();



// Directorio Publico
app.use(express.static('public'));

app.use((req, res) => {
    res.status(404).send('No se encontro tu pagina');
});

// Permite enviar archivos al front-end como html,css, javascrip (no cambian)

app.listen(process.env.PORT, () => {
    console.log(`Aplicacion en linea Puerto ${process.env.PORT}`);
}); // Corre la aplicacion por el puerto 3000
