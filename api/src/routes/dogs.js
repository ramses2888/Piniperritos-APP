const { Router, response } = require("express");
const { Race, Temperament } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");
const { API_KEY } = process.env; 
const router = Router();

router.get("/", async (req, res, next) => {//get all dogs

   let { name } = req.query; //get name from query
  
  if (name) { 
    breedsApi = { data: undefined }; 

    breedsDB = await Race.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },
      include: {
        model: Temperament,
      },
    });

    breedsApi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);

    helper1 = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

    breedsApi.data = helper1.data.filter((e) => // filter breedsApi.data se usa para filtrar los datos que se quieren mostrar
      e.name.toLowerCase().includes(name.toLowerCase())// toLowerCase() se usa para que no se distinga entre mayusculas y minusculas
    );
  } else {// If name is not provided, return all the dog breeds
    breedsDB = await Race.findAll({
      include: {
        model: Temperament,
      },
    });
    
    breedsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  }
  let filteredBreeds = breedsApi.data.map((breed) => { // Filtrar las razas que ya están en la base de datos
    return {// return the breed object, with the temperament and the image
      id: breed.id,
      name: breed.name,
      height: breed.height,
      weight: breed.weight,
      life_span: breed.life_span,
      image_url: breed.image.url,
      temperament: breed.temperament
    };
  });
  
  let allBreeds = [...breedsDB, ...filteredBreeds];
  res.status(200).send(allBreeds);
});
router.get("/:id", async (req, res, next) => {//get dog by id
  // Obtener el detalle de una raza de perro en particular
  // Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
  // Incluir los temperamentos asociados
  let { id } = req.params; 
  let breedsDB = await Race.findAll({
    include: Temperament,
  });
  
  let breedsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  let filteredBreeds = breedsApi.data.map((breed) => {
    return {
      id: breed.id,
      name: breed.name,
      height: breed.height,
      weight: breed.weight,
      life_span: breed.life_span,
      temperament: breed.temperament,
      image: breed.image.url,
    };
  });
  
  let allBreeds = [...breedsDB, ...filteredBreeds];
  let finalBreed = {};
  allBreeds.forEach((breed) => {
    if (breed.id == id) { // si el id de la raza es igual al id que se pasa por parametro
      finalBreed = breed;// se guarda la raza en una variable
    }
  });
  if (Object.keys(finalBreed).length === 0) {// Object.keys() retorna un array con las llaves de un objeto
    res.send("no existe en la db");
  } else {
    res.send(finalBreed);
  }
});
router.post("/", (req, res, next) => {
  res.send("Soy un post de dogs");
});
router.put("/", (req, res, next) => {
  res.send("Soy un put de dogs");
});
router.delete("/", async (req, res) => {
  let { id } = req.query;
  await Race.destroy({ where: { id } }); 
    
  breedsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  let filteredBreeds = breedsApi.data.map((breed) => {
    return {
      id: breed.id,
      name: breed.name,
      height: breed.height,
      weight: breed.weight,
      life_span: breed.life_span,
      image_url: breed.image.url,
      temperament: breed.temperament,
    };
  });
  res.send(filteredBreeds);
});

module.exports = router;

// diferencia entre == y ===, == es para comparar valores, === es para comparar tipos de datos
// next es para que el programa siga ejecutando, si no se pone, el programa se detiene, en el ultimo router no se pone next
// res.send es para enviar una respuesta al cliente, en este caso una respuesta de un array de objetos
// Op-iLike se usa para que no se distinga entre mayusculas y minusculas