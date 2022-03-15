
import { Link } from "react-router-dom";
import "./index.css";
export default function Dog(props) {
  

  return (
    props && (
      <div className="container-dog">
        <div className="container-text">
          {/* <h5>{props.id}</h5> */}
          <Link key={props.id} to={`/home/${props.id}`}>
            <h4>{props.name}</h4>
          </Link>

          <div className="container-img">
            <img
              src={
                props.img
                  ? props.img
                  : "https://previews.123rf.com/images/red33/red331112/red33111200014/11546849-skizzieren-sie-doodle-crazy-verr%C3%BCckt-puppy-dog-vektor-illustration.jpg"
              }
              alt="imagen"
            />
          </div>

          <div className="container-info">
            <p>{props.weight.metric ? props.weight.metric : props.weight} kg</p>
            <p>{props.height.metric ? props.height.metric : props.height} cm</p>
            <p>
              {props.life_span} {props.id.length > 5 ? "years" : <></>}
            </p>
          </div>

          <div className="tempi">{props.temperament}</div>
        </div>

        
      </div>
    )
  );
}
