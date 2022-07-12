var express = require('express');
var router = express.Router();
var novedadesModel = require ("../../models/novedadesModel")

/* GET home page. */
router.get('/', async function(req, res, next) {
  var novedades = await novedadesModel.getNovedades();

  res.render('admin/novedades', {
    layout:'admin/layout',
    persona: req.session.nombre,
    novedades 

  });
});

//esto sirve para dar de alta las novedades
router.get("/agregar",(req,res,next) =>{
  res.render("admin/agregar",{// agregar hbs
    layout: "admin/layout"

  })

})

module.exports = router;