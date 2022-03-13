import { Link } from "react-router-dom";
import "./index.css";
import pata from "../images/pata.png";


export default function LandingPage() {
  return (
    <div className="landingPage">
     
      <div className="landingPageText">

        <Link to="/home">
          <img className="patita" src={pata} alt="patita" />
          
        </Link>

      </div>

    </div>
  );
}

