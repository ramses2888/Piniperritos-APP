import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getApiDogs,
  getDbDogs,
  getDogs,
  getTemperaments,
  handleAlphabeticChange,
  handleTemperamentChange,
  handleWeightChange,
 
} from "../../store/actions";
import "./index.css";
import { Link } from "react-router-dom";


export default function SearchBar2() {
  

  let temperaments = useSelector((state) => state.temperaments);//state es un objeto que contiene todos los reducers
  let i = 0;
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);//se ejecuta cada vez que se carga la pagina, me trae todos los temperamentos de la base de datos

  

  function handleTempChange(e) {//handleTempChange se ejecuta cada vez que se selecciona un temperamento
    console.log(e.target.value);
    if (e.target.value === "") dispatch(getDogs());
    else dispatch(handleTemperamentChange(e.target.value));
  }

  function handleChange(e) {//  handleChange se ejecuta cada vez que se selecciona un temperamento
    if (e.target.value === "") dispatch(getDogs());
    else if (e.target.value === "api") dispatch(getApiDogs());
    else if (e.target.value === "db") dispatch(getDbDogs());
  }

  function handleAlphaChange(e) {//handleAlphaChange se ejecuta cada vez que se selecciona un temperamento
    if (e.target.value !== "") {
      dispatch(handleAlphabeticChange(e.target.value));
    } else {
      dispatch(getDogs());
    }
  }

  function handleWChange(e) {//handleWChange se ejecuta cada vez que se selecciona un temperamento
    if (e.target.value !== "") {
      dispatch(handleWeightChange(e.target.value));
    } else {
      dispatch(getDogs());
    }
  }

  return (
    <div className="navi">
      <nav>
        <ul>
       
          <li>
            <div className="navbar-alphabetic-order">
              <select onChange={(e) => handleAlphaChange(e)}>
                <option value="" key={"bothAlph"}>
                  Without Alphabetic Order
                </option>
                <option value="abc" key={"abc"}>
                  A-Z
                </option>
                <option value="cba" key={"cba"}>
                  Z-A
                </option>
              </select>
            </div>
          </li>

          <li>
            <div className="navbar-weight-order">
              <select onChange={(e) => handleWChange(e)}>
                <option value="" key={"bothWeight"}>
                  Without Weight Order
                </option>
                <option value="-/+">Menor a Mayor</option>
                <option value="+/-">Mayor a Menor</option>
              </select>
            </div>
          </li>

          <li>
            <div className="navbar-races">
              <select onChange={(e) => handleChange(e)}>
                <option value="" key={"bothDB"}>
                  Both DB's
                </option>
                <option value="api" key={"api"}>
                  Api
                </option>
                <option value="db" key={"db"}>
                  Db
                </option>
              </select>
            </div>
          </li>

          <li>
            <div className="navbar-temperaments">
              <select onChange={(e) => handleTempChange(e)}>
                <option value="">Select Temperament</option>
                {temperaments &&
                  temperaments.map((temperament) => {
                    return (
                      <option
                        temperament={temperament}
                        key={i++}
                        id={temperaments.indexOf(temperament)}
                        value={temperament}
                      >
                        {temperament}
                      </option>
                    );
                  })}
              </select>
            </div>
          </li>


          <li className="navbar-create">
            <Link to="/create">
              <button className="button">Create Your Dog</button>
            </Link>
          </li>
                                             
          
        </ul>
      </nav>
      <div className="clearfix"></div>
    </div>
  );
}
