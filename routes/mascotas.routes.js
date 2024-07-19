const { Router } = require('express');
const router = Router();

const Mascota = require('../models/mascota')

router.get('/', async (req, res) => {
    try {
        const arrayMascotasDB = await Mascota.find();
        console.log(arrayMascotasDB);
        res.render("mascotas", {
            arrayMascotas: arrayMascotasDB
        });

        //RESPUESTA ESTATICA
        
    } catch (error) {
        console.log(error);
        res.render("mascotas", {
            arrayMascotas: [] 
        });
    }
});
router.get('/crear',(req,res)=>{
    res.render('../views/crear.ejs')
})

router.post('/', async (req,res)=>{
    const body = req.body
    try {
        await Mascota.create(body)
        res.redirect('/mascotas')
    } catch (error) {
        console.log('error',error)   
    }
})
router.get('/:id', async (req,res)=>{
    const id = req.params.id
    try {
        const mascotaDB = await Mascota.findOne({_id:id});

        console.log(mascotaDB)
        res.render('detalle',{
            mascota : mascotaDB,
            error: false
        })
    } catch (error) {
        console.log('error',error)
        res.render('detalle',{
            error: true,
            mensaje: 'No se encuentra el documento'
        })
    }

})


router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  console.log(`Eliminando mascota con ID: ${id}`);

  try {
    const mascotaEliminada = await Mascota.findByIdAndDelete(id);
    if (mascotaEliminada) {
      res.json({
        estado: true,
        mensaje: 'Mascota eliminada correctamente',
        mascota: mascotaEliminada
      });
    } else {
      res.status(404).json({
        estado: false,
        mensaje: 'Mascota no encontrada'
      });
    }
  } catch (error) {
    console.error('Error al eliminar mascota:', error.message);
    res.status(500).json({
      estado: false,
      mensaje: 'Error interno del servidor'
    });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  console.log(id)
  console.log('body', body)

  try {
      const mascotaDB = await Mascota.findByIdAndUpdate(
          id, body, { useFindAndModify: false }
      )
      console.log(mascotaDB)
      res.json({
          estado: true,
          mensaje: 'Mascota editada'
      })
  } catch (error) {
      console.log(error)
      res.json({
          estado: false,
          mensaje: 'Mascota falla'
      })
  }
})




module.exports = router;

  


