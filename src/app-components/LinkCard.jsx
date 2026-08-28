import "./LinkCard.css";
import { useNavigate } from "react-router-dom";

export default function LinkCard({ titulo, icono, ruta, contenido, children }) {
  const navigate = useNavigate();
  return (
    <div className="linkcard" onClick={() => navigate(ruta)}>
      <header className="linkcard-header">
        <span className="icon material-symbols-rounded">{icono}</span>
        <span>{titulo}</span>
      </header>
      {contenido === true && <div className="linkcard-container">{children}</div>}
    </div>
  );
}
