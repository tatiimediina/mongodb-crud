const express = require('express'); 
const cors = require('cors'); //CORS para permite solicitudes entre diferentes orígenes.
const morgan = require('morgan'); // Morgan para registrar solicitudes HTTP.

// Importa el módulo body-parser para analizar el cuerpo de las solicitudes.
const bodyParser = require('body-parser'); 
const app = express(); 

app.use(cors()); // Habilita CORS para todas las rutas.
app.use(morgan('dev')); // Usa Morgan para registrar solicitudes en el formato 'dev'.
app.use(express.json()); //Para analizar cuerpos JSON en solicitudes.

app.use(bodyParser.urlencoded({ extended: false })); // Analiza cuerpos de solicitudes con codificación URL.
app.use(bodyParser.json()); // Analiza cuerpos de solicitudes con formato JSON.

require('dotenv').config(); // Carga variables de entorno desde un archivo .env.

const port = process.env.PORT || 3000;

//conexión a la base de datos

const mongoose = require('mongoose'); 

const usuario = process.env.USER; 
const password = process.env.PASSWORD; 
const dbName = process.env.DBNAME; 

const uri = `mongodb+srv://${usuario}:${password}@cluster0.6w2d6t3.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`; 

mongoose.connect(uri) 
  .then(() => console.log('Conectado a MongoDB')) 
  .catch(e => console.log('Error de conexión', e));

app.set('view engine', 'ejs'); // Configura el motor de plantillas EJS.

app.set('views', __dirname + '/views'); // Establece la carpeta de vistas.

app.use(express.static(__dirname + "/public")); // Sirve archivos estáticos desde la carpeta 'public'.

app.use('/', require('./routes/app.routes.js')); 
app.use('/mascotas', require('./routes/mascotas.routes.js'));

app.use((req, res, next) => { // Middleware para manejar rutas no encontradas (404).
    res.status(404).render("404", { // Renderiza la vista 404 con un título y descripción.
        titulo: "404",
        descripcion: "titulo del sitio web"
    });
});

app.listen(port, () => { 
    console.log(`Servidor funcionando en el puerto ${port}`);
});
