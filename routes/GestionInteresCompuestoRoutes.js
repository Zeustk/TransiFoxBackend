const express = require("express");
const { FLOAT } = require("sequelize");

const router = express.Router();

module.exports = function (servicio) {

router.post('/api/CalcularOperacionesInteresCompuesto', async (req, res) => {


   try {

    
      
      const { Monto_Compuesto,Capital,Tasa_Interes,Tiempo,Interes_Compuesto} = req.body;

     
      let tasaConvertida = Tasa_Interes;

      if (Tasa_Interes!=null){

         
      tasaConvertida = parseFloat(Tasa_Interes) / 100;

      }

   


     

      const OpInteresCompuesto= servicio.CalcularInteresCompuesto(Monto_Compuesto,Capital,tasaConvertida,Tiempo,Interes_Compuesto);

    

      res.status(200).json(OpInteresCompuesto)

   } catch (error) {

      res.status(404).json(error);

   }

})

 
   return router;
}
