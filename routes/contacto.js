var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contacto', {
    isContacto:true
   });
});

router.post('/', async function(req, res, next) {

  console.log(req.body)

  //con las var, capturamos los datos
  var nombre = req.body.nombre;
  var email = req.body.email;
  var tel = req.body.tel;
  var comentarios = req.body.comentarios;
  //console.log(req.body.email) //solo para comprobar en consola que se esten comunicando la vista y el controlador
  var obj = {
    to: 'mtraiano76@gmail.com',
    subject: 'Contacto desde la pagina',
    html: nombre + 'se contacto a traves de la web y quiere saber mas info a este correo: ' + email + '<br> Su tel es: ' + tel + '. Su comentario es: ' + comentarios + '.'

  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  })

  var info = await transport.sendMail(obj);

  res.render('contacto',{
    message: 'Mensaje enviado correctamente'
  })


})

module.exports = router;