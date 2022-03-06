const { Router } = require("express");
const { Race, Temperament } = require("../db");

const router = Router(); 

router.get("/", (req, res, next) => { 
  res.send("Soy un get de dog");
});


router.post("/", async (req, res, next) => {
  // Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
  // Crea una raza de perro en la base de datos
  let { name, height, weight, life_span, image, temperament } = req.body; // destructuring de los datos recibidos, body es el objeto que se recibe en el request
  
  const newBreed = await Race.create({ 
    name,
    height,
    weight,
    life_span,
    image_url: image,
  });

  let temperamentsDB = await Temperament.findAll({
    where: { name: temperament } 
  });

  await newBreed.addTemperament(temperamentsDB);// agrega los temperamentos a la raza de perro
  res.send(newBreed);// envia la raza de perro creada
});


router.put("/", (req, res, next) => {
  res.send("Soy un put de dog");
});


module.exports = router;
