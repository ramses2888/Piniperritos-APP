import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createDog, getTemperaments } from "../../store/actions";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

export default function CreateDog(props) {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let i = 0;

  //======================ESTADO INICIAL DE LOS DATOS DEL FORMULARIO==========================

  const [state, setState] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    min_life_span: "",
    max_life_span: "",
    image: "",
    temperaments: [],
  });

  //=====================================================================================

  const [errors, setErrors] = useState({});
  let temperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getTemperaments()); //llamo a getTemperaments para que me traiga los temperamentos
  }, [dispatch]);

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value, //cambio el valor de name por el valor del input
    });
    setErrors(
      validate({
        ...state,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    if (
      errors.name === null || //si el nombre esta vacio
      errors.min_height === null || //si el minimo de altura esta vacio
      errors.max_height === null ||
      errors.min_weight === null ||
      errors.max_weight === null ||
      errors.min_life_span === null ||
      errors.max_life_span === null
    ) {
      e.preventDefault(); //prevengo que se envie el formulario
      return alert("Sorry, all fields are required except image");
    } else if (
      state.name === "" || //si el nombre esta vacio
      state.min_height === "" ||
      state.max_height === "" ||
      state.min_weight === "" ||
      state.max_weight === "" ||
      state.min_life_span === "" ||
      state.max_life_span === ""
    ) {
      e.preventDefault();
      return alert("Sorry, all fields are required except image");
    } else if (
      isNaN(parseInt(state.min_height)) || //si el minimo de altura esta vacio
      isNaN(parseInt(state.max_height)) || //isNaN es una funcion que me dice si es un numero o no
      isNaN(parseInt(state.min_weight)) || //parseInt es una funcion que me convierte un string a un numero
      isNaN(parseInt(state.max_weight)) ||
      isNaN(parseInt(state.min_life_span)) ||
      isNaN(parseInt(state.max_life_span))
    ) {
      e.preventDefault();

      return alert("Sorry, please fill out the required fields correctly");
    } else {
      const dog = {
        name: state.name,
        height: `${state.min_height} - ${state.max_height}`,
        weight: `${state.min_weight} - ${state.max_weight}`,
        life_span: `${state.min_life_span} - ${state.max_life_span}`,
        image:
          state.image !== ""
            ? state.image
            : "https://previews.123rf.com/images/red33/red331112/red33111200014/11546849-skizzieren-sie-doodle-crazy-verr%C3%BCckt-puppy-dog-vektor-illustration.jpg",
        temperament: [...state.temperaments],
      };
      console.log(dog);
      setState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        min_life_span: "",
        max_life_span: "",
        image: "",
        temperaments: [],
      });
      dispatch(createDog(dog));
      alert("Successfully Created New Doggi :D");
      navigate("/home");
    }
  }

  function addTemp(e) {
    // {
    //   <label>Se anadino {e.target.value}</label>;
    // }
    setState({
      ...state,
      temperaments: [...state.temperaments, e.target.value],
    });
  }

  function validate(input) {
    let expresion = /^(?![ .]+$)[a-zA-Z .]*$/gm; //expresion regular para validar el nombre
    let expresionheight = /^[0-9]*$/gm; //expresion regular para validar el numero de altura
    let expresionheightmax = /^[0-9]*$/gm; //expresion regular para validar el numero de peso
    let expresionweight = /^[0-9]*$/gm; //expresion regular para validar el numero de peso
    let expresionweightmax = /^[0-9]*$/gm; //expresion regular para validar el numero de peso
    let expresionlifemin = /^[0-9]*$/gm; //expresion regular para validar el numero de peso
    let expresionlifemax = /^[0-9]*$/gm; //expresion regular para validar el numero de peso
    let errors = {};
    if (!input.name) {
      errors.name = "Nombre esta vacio";
    } else if (expresion.test(input.name) === false) {
      errors.name = "--------Nombre no valido--------";
    } else if (input.name.length <= 3) {
      errors.name = "Nombre debe ser mayor a 3 caracteres";
    } else if (!input.min_height) {
      errors.min_height = "------Altura Minima vacia------";
    } else if (expresionheight.test(input.min_height) === false) {
      errors.min_height = "---Altura Minima no es valida---";
    } else if (!input.max_height) {
      errors.max_height = "--------Altura Max vacia--------";
    } else if (expresionheightmax.test(input.max_height) === false) {
      errors.max_height = "--------Altura Max no es valida--------";
    } else if (parseInt(input.min_height) >= parseInt(input.max_height)) {
      errors.max_height = "--------El valor es incorrecto--------";
    } //
    else if (!input.min_weight) {
      errors.min_weight = "--------Peso Min esta vacio--------";
    } else if (expresionweight.test(input.min_weight) === false) {
      errors.min_weight = "--------Peso Min invalido--------";
    } else if (!input.max_weight) {
      errors.max_weight = "--------Peso Max esta vacio--------";
    } else if (expresionweightmax.test(input.max_weight) === false) {
      errors.max_weight = "--------Peso Max invalido--------";
    } else if (parseInt(input.min_weight) >= parseInt(input.max_weight)) {
      errors.max_weight = "------El valor es incorrecto------";
    } else if (!input.min_life_span) {
      errors.min_life_span = "------Edad Min esta vacia------";
    } else if (expresionlifemin.test(input.min_life_span) === false) {
      errors.min_life_span = "------Edad Min invalida------";
    } else if (!input.max_life_span) {
      errors.max_life_span = "---------Edad Max esta vacia---------";
    } else if (expresionlifemax.test(input.max_life_span) === false) {
      errors.max_life_span = "-----------Edad Max invalida-----------";
    } else if (parseInt(input.min_life_span) >= parseInt(input.max_life_span)) {
      errors.max_life_span = "---------El valor es incorrecto---------";
    }

    return errors;
  }

  function deleteTemp(e) {
    e.preventDefault();

    setState({
      ...state,
      temperaments: state.temperaments.filter(
        (temp) => temp !== e.target.value
      ),
    });
    e.target.value = "";
  }

  return (
    <div className="createDog">
      <div className="create-dog-form">
        <h1>Crea tu Perro!</h1>

        <div className="create-dog-form-inputs">
          <form onSubmit={(e) => handleSubmit(e)}>
            <label>Nombre</label>
            <br />
            <input
              autoComplete="off"
              type="text"
              name="name"
              value={state.name} //valor del input
              onChange={(e) => handleChange(e)} //funcion para capturar los datos del input
            ></input>

            {errors.name && <p className="pop-up">{errors.name}</p>}

            <label>Min Height</label>

            <input
              autoComplete="off"
              type="text"
              name="min_height"
              value={state.min_height}
              onChange={(e) => handleChange(e)}
            ></input>
            {errors.min_height && <p className="pop-up">{errors.min_height}</p>}
            <br />

            <label> Max Height</label>
            <br />
            <input
              autoComplete="off"
              type="text"
              name="max_height"
              value={state.max_height}
              onChange={(e) => handleChange(e)}
            ></input>
            {errors.max_height && <p className="pop-up">{errors.max_height}</p>}
            <br />

            <label>Min Weight</label>
            <br />
            <input
              autoComplete="off"
              type="text"
              name="min_weight"
              value={state.min_weight}
              onChange={(e) => handleChange(e)}
            ></input>
            {errors.min_weight && <p className="pop-up">{errors.min_weight}</p>}
            <br />

            <label>Max Weight</label>
            <br />
            <input
              autoComplete="off"
              type="text"
              name="max_weight"
              value={state.max_weight}
              onChange={(e) => handleChange(e)}
            ></input>
            {errors.max_weight && <p className="pop-up">{errors.max_weight}</p>}
            <br />

            <label>Min Life Span</label>
            <br />
            <input
              autoComplete="off"
              type="text"
              name="min_life_span"
              value={state.min_life_span}
              onChange={(e) => handleChange(e)}
            ></input>
            {errors.min_life_span && (
              <p className="pop-up">{errors.min_life_span}</p>
            )}
            <br />

            <label>Max Life Span</label>
            <br />
            <input
              autoComplete="off"
              type="text"
              name="max_life_span"
              value={state.max_life_span}
              onChange={(e) => handleChange(e)}
            ></input>
            {errors.max_life_span && (
              <p className="pop-up">{errors.max_life_span}</p>
            )}
            <br />

            <label>Image</label>
            <br />
            <input
              type="text"
              name="image"
              value={state.image}
              onChange={(e) => handleChange(e)}
            ></input>
            <br />

            <br />

            <select onChange={(e) => addTemp(e)}>
              <option value="">Select Temperament</option>
              {/* <br /> */}
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
            <br />
            <br />
            {/* <label>{state.temperaments && state.temperaments}</label> */}
            <select onChange={(e) => deleteTemp(e)}>
              <option value="">Select Temperament to Delete</option>
              {state.temperaments &&
                state.temperaments.map((temperament) => {
                  return (
                    <option
                      temperament={temperament}
                      key={i++}
                      id={state.temperaments.indexOf(temperament)}
                      value={temperament}
                    >
                      {temperament}
                    </option>
                  );
                })}
            </select>
            <br />
            <br />
            <input type="submit" value="Send" className="button"></input>
          </form>
        </div>

        {/* <div className="delete_temperament">
          <label>Select Temperament to Delete</label>
          {state.temperaments &&
            state.temperaments.map((temperament) => {
              return <input type="checkbox">{temperament}</input>;
            })}
        </div> */}
        <br />

        <Link to="/home">
          <button className="button">Go Back</button>
        </Link>
      </div>
    </div>
  );
}
