import "./PersonalCard.css";
import { useNavigate } from "react-router-dom";

export default function PersonalCard({ propiedades }) {
  const navigate = useNavigate();
  console.log("propiedades", propiedades);
  return (
    <div className="tarjetaUsuario">
      <div className="rowUsuario">
        <span className="icon material-symbols-rounded">account_circle</span>
        <label>{propiedades.nombre}</label>
      </div>
    </div>
  );
}
