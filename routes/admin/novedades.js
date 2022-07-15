const { Router } = require('express');
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

//MUESTRA FORM ALTA DE NOVEDADES
router.get("/agregar",(req,res,next) =>{
  res.render("admin/agregar",{// agregar hbs
    layout: "admin/layout"

  })

})

//AGREGA LA NOVEDAD
router.post('/agregar', async(req, res, next) =>{
  //console.log(req.body) //veo en consola si me trae titulo, subtitulo y cuerpo agregado en web
  try{
    if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != ""){
      await novedadesModel.insertNovedades(req.body)
      res.redirect("/admin/novedades")
      }else{ // volvemos a agregar
        res.render("admin/agregar",{
          layout: "admin/layout",
          error: true,
          message: "Todos los campos son requeridos" // vamos a agregar.hbs
        })

      }


  }catch(error){
    console.log(error)
    res.render("admin/agregar",{
      layout: "admin/layout",
      error: true,
      message: "No se carga la novedad" // mensaje para cuando no se guarda la novedad vamos a agregar.hbs
    })

  }

})

//ELIMINAR NOVEDAD

router.get("/eliminar/:id" , async (req,res,next)=>{
  console.log(req.params.id);
  var id = req.params.id;
  await novedadesModel.deleteNovedadesByID(id);
  res.redirect("/admin/novedades")
})

//VISTA MODIFICAR FORM + DATOS DE CAMPOS PARA MODIFICAR

router.get("/modificar/:id", async(req,res,next)=>{
  var id = req.params.id;
  var novedad = await novedadesModel.getNovedadesByID(id);



  res.render("admin/modificar",{
    layout:"admin/layout",
    novedad
  })
})

//ACTUALIZACION DE LOS DATOS

router.post("/modificar", async(req,res,next)=>{
  try{
    var obj = {
      titulo:req.body.titulo,
      subtitulo:req.body.subtitulo,
      cuerpo:req.body.cuerpo

    }

    await novedadesModel.modificarNovedadByID(obj, req.body.id)
    res.redirect("/admin/novedades");



  }catch(error){
    console.log(error)
    res.render("admin/modificar",{
      layout:"admin/layout",
      error:true,
      message:"No se modifico la novedad"
    })

  }

})




module.exports = router;