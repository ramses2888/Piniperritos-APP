import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getDogDetail, deleteDog } from "../../store/actions";
import { Link } from "react-router-dom";
import "./index.css";
import { useNavigate } from "react-router-dom";

export default function DogDetail(props) {
  let { id } = useParams();
  let history = useNavigate();
  let dispatch = useDispatch();
  let dog = useSelector((state) => state.detailDog);

  useEffect(() => {
    dispatch(getDogDetail(id));
  }, [dispatch, id]); // cada vez que se cambia el id, se ejecuta la funcion getDogDetail

  function handleClick() {
    dispatch(deleteDog(dog.id));
    alert(`Se elimino ${dog.name}`);
    history("/home");
  }

  return (
    <div>
      {dog ? (
        <div className="dog-detail">
          <div className="container-texto">
            <div className="container-h2">
              <h2>ID: {dog.id}</h2>
              <h3>{dog.name}</h3> {console.log(dog)}
            </div>

            <img
              src={dog.image ? dog.image : dog.image_url}
              alt={`${dog.name}_image`}
            />

            <div className="container-detail">
              <h4>
                Height: {dog.height.metric ? dog.height.metric : dog.height} cm
              </h4>
              <h4>
                Weight: {dog.weight.metric ? dog.weight.metric : dog.weight} kg
              </h4>
              <h4>
                Life Span: {dog.life_span} {dog.id.length > 5 ? "years" : <></>}
              </h4>
              <h4>
                Temperaments{" "}
                {dog.temperament
                  ? dog.temperament
                  : dog.temperaments &&
                    dog.temperaments.map(
                      (temperament) => temperament.name + " "
                    )}
              </h4>{" "}
              <br />
            </div>

            {dog.id.length > 6 ? (
              <div>
                <button
                  className="button_delete"
                  onClick={(e) => handleClick(e)}
                >
                  Delete
                </button>
                <br />
                <br />
              </div>
            ) : (
              <></>
            )}
          </div>

          <br></br>
          <br></br>

          <div className="goback">
            <Link to="/home" style={{ textDecoration: "none" }}>
              <button className="button">Go Back</button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
           <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <img
            src="https://www.gifsanimados.org/data/media/202/perro-imagen-animada-0727.gif"
            alt="gif"
          ></img>
        </div>
      )}
    </div>
  );
}
