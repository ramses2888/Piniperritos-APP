const axios = require("axios");
const { Router } = require("express");
const { Temperament } = require("../db");
const { API_KEY } = process.env;

const router = Router();

router.get("/", async (req, res, next) => {
 
  try {

    let finalTemperamentsDB = [];

    let temperamentsDB = await Temperament.findAll({raw: true,});



    if (temperamentsDB.length > 0) {// Si hay temperamentos en la base de datos
      for (let i = 0; i < temperamentsDB.length; i++) {// Recorrer los temperamentos de la base de datos
        finalTemperamentsDB.push(temperamentsDB[i].name);// Agregar el nombre del temperamento a la lista final
      }
      res.send(finalTemperamentsDB);// Enviar la lista final



    } else {// Si no hay temperamentos en la base de datos buscar los datos de temperamentos en la api externa


      let api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);//obtener los temperamentos de la api externa
      
      let filteredTemperamentsApi = api.data.map((data) => {//filtrar los temperamentos de la api externa
        return {
          name: data.temperament,//agregar el nombre del temperamento a la lista final
        };
      });

      let stringTemperaments;
      let arrayTemperament,
        finalArrayTemperaments = [];

        for (let i = 0; i < filteredTemperamentsApi.length; i++) {// Recorrer los temperamentos de la api externa

          stringTemperaments = filteredTemperamentsApi[i].name;//obtener el nombre del temperamento
        if (stringTemperaments) {//si el temperamento tiene nombre
          arrayTemperament = stringTemperaments.split(", ");//separar el temperamento en un array
           arrayTemperament.forEach((temperament) => {//recorrer el array
             if (!finalArrayTemperaments.includes(temperament)) {//si el temperamento no está en la lista final
               finalArrayTemperaments.push(temperament);//agregar el temperamento a la lista final
             }
           });
         }
      }

      finalArrayTemperaments.forEach((temperament) => {//recorrer el array final
        Temperament.create({//crear el temperamento en la base de datos
          name: temperament,
        });
      });

      res.send(finalArrayTemperaments);//enviar la lista final
    }
  } catch (error) {
    next(error);
  }//
});

module.exports = router;
    