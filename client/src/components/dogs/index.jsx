import { useEffect, useState } from "react";
import Dog from "../dog";
import "./index.css";

export default function Dogs({ dogsFilter }) {
 

  const [dogs, setDogs] = useState([]);
  const [pagesTotal, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  
  useEffect(() => {
    const totalElementos = dogsFilter.length;// dogsFilter.length determina la cantidad de razas de perros que hay en la API
    setDogs([...dogsFilter].splice(0, 8));// determinamos la cantidad de razas de perros que se mostrarán por página
    setCurrentPage(0);// determinamos la página actual
    setTotalPages(Math.floor(totalElementos / 8));// determinamos el numero de paginas
  }, [dogsFilter]);

  

  function HandleForwad() {// funcion para ir a la siguiente pagina
    const totalElementos = dogsFilter.length;// dogsFilter.length determina la cantidad de razas de perros que hay en la API
    //const nextPage = currentPage + 1;
    //const firstIndex = nextPage * 8;
    if (((currentPage + 1) * 8 )> totalElementos) return;// si el indice de la primera raza de la pagina es mayor que la cantidad de razas de perros, no se puede avanzar
    setCurrentPage(currentPage + 1);// actualizamos la pagina actual
    setDogs([...dogsFilter].splice(((currentPage + 1) * 8), 8));//splice se usa para cortar un array
  }

  function HandleBack() {// funcion para ir a la pagina anterior
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;// si la pagina actual es menor que 0, no se puede retroceder
    const firstIndex = prevPage * 8;
    setCurrentPage(prevPage);
    setDogs([...dogsFilter].splice(firstIndex, 8));
  }

  return (
    <div className="container">
      <div className="container-dogs">
        {dogs ? // si hay razas de perros, se muestran
        (dogs.length > 0 ? (
            dogs.map((dog) => {
              return (
                <Dog
                  key={dog.id}
                  id={dog.id}
                  name={dog.name}
                  life_span={dog.life_span}
                  temperament={dog.temperament ? (dog.temperament) : 
                    dog.temperaments ? (dog.temperaments.map((temperament) => temperament.name + " ")) : (<></>)}
                  img={dog.image_url}
                  weight={dog.weight}
                  height={dog.height}
                />
              );
            })
          ) : (<>No se Encontro el Perrito</> )
        ) : (<div>cargando</div>)}

      </div>
      <div className="pagination">
        <button onClick={() => HandleBack()}> Back </button>
        <span>{`${currentPage + 1} of ${pagesTotal + 1}`}</span>
        <button onClick={() => HandleForwad()}> Forward </button>
      </div>
    </div>
  );
}
