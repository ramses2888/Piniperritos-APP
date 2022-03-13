import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../store/actions";
import Dogs from "../dogs";
import SearchBar from "../searchBar";
import SearchBar2 from "../searchBar/searchbar2";


export default function Home() {

  const dogsFilter = useSelector((state) => state.filteredDogs);//state es un objeto que contiene todos los reducers, en este caso filteredDogs

  let dispatch = useDispatch();//dispatch es una funcion que se usa para ejecutar las acciones,

  useEffect(() => {
    dispatch(getDogs());}, [dispatch]);//se ejecuta cada vez que se carga la pagina, 
                                       //me trae todos los perros de la base de datos

  return (
    <div className="Home">
      <SearchBar />
      <SearchBar2 />
     
      {dogsFilter ? (<Dogs dogsFilter={dogsFilter} />) 
       : (
         
        <div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          
          <img src="https://www.gifsanimados.org/data/media/202/perro-imagen-animada-0727.gif" alt="gif" ></img>
        </div>
      )}
    </div>
  );
}


