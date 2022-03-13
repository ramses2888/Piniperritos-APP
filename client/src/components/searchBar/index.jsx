import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {getTemperaments, searchDog,} from "../../store/actions";
import "./index.css";


export default function SearchBar() {
  const [search, setSearch] = useState("");//search es una variable que se usa para guardar el valor del input
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);//se ejecuta cada vez que se carga la pagina, me trae todos los temperamentos de la base de datos

  function onInputChange(e) {//oninputchange se ejecuta cada vez que se escribe en el input
    e.preventDefault();//prevent default se usa para evitar que el formulario se envie
    setSearch(e.target.value);//setSearch es una funcion que se usa para cambiar el valor de search, e.target.value es el valor del input
  }

  function onSubmit(e) {//onsubmit se ejecuta cada vez que se presiona enter en el input
    e.preventDefault();
    dispatch(searchDog(search));
  }

  
  return (
    <div className="navbar">
      <nav>
        <ul>
                  
            <div className="navbar-search-bar">
              <form onSubmit={onSubmit}>

                <div className="input-group">
                <input
                  type="text"
                  onChange={onInputChange}
                  value={search}
                  placeholder="Search Puppy"/>
                </div>
                
                <div className="boton-buscar">
                <input type="submit" value="Buscar" />
                </div>
               
              </form>
            </div>
                                        
        </ul>
      </nav>
      <div className="clearfix"></div>
    </div>
  );
}
