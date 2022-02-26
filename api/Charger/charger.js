const axios = require("axios");
const { dog } = require("../db");

const charger = async () => {
  const getapi = await axios.get("https://api.thedogapi.com/v1/breeds");
  const allDogs = getapi.data;

  try {
    allDogs.map(async (e) => {
      await Dog.findOrCreate({
        where: {
          name: e.name,
          image: e.image.url,
          temperament: e.temperament,
          height: e.height.metric,
          weight: e.weight.metric,
          life: e.life_span,
        },
      });
    });
  } catch (err) {
    console.log("Hay un error en la base de datos", err);
  }
};

module.exports = { charger };
