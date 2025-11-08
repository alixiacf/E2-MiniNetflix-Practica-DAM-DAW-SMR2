// app.js
const express = require('express');
const path = require('path');
const app = express();

// Configuramos el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'vistas'));

// Servir archivos estáticos desde public
app.use(express.static(path.join(__dirname, 'public')));

// Catálogo de usuarios con películas favoritas
const catalogo = {
  andrea: {
    color: '#222',
    peliculas: ['Mujer Maravilla', 'Encanto'],
    imagenes: ['maravilla.jpg', 'encanto.jpg']
  },
  marco: {
    color: 'rgba(13, 12, 12, 1)',
    peliculas: ['El Padrino', 'Interstellar'],
    imagenes: ['padrino.jpg', 'interstellar.jpg']
  }
  // Aquí puedes añadir más perfiles, ej. tu_nombre: { ... }
};

// Ruta para el perfil de películas
app.get('/peliculas/:nombre', (req, res) => {
  const nombre = req.params.nombre.toLowerCase();
  const usuario = catalogo[nombre];
  if (usuario) {
    res.render('perfil', { usuario, nombre: req.params.nombre });
  } else {
    res.status(404).send('<h1>Usuario no encontrado</h1>');
  }
});

// Iniciamos el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});