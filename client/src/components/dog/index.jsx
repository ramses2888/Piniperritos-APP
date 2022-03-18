
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
                  : "https://t1.ea.ltmcdn.com/es/posts/8/9/2/nombres_graciosos_para_perros_machos_23298_0_600.webp"
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
