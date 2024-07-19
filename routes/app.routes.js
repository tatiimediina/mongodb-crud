const { Router } = require('express');
const router = Router();

router.get('/',(req,res)=>{
    res.render("index", {titulo : "mi titulo dinamico"})
})
router.get('/servicios',(req,res)=>{
    res.render("servicios", {titulo : "pagina servicios"})
})



module.exports = router