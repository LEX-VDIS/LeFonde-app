import "./Seccion.css";
import { useNavigate } from "react-router-dom";

export default function SeccionLink({ propiedades, children }) {
    const navigate = useNavigate();
    return (
        <section className="SeccionLink">
            <header className="SeccionLink-header" onClick={() => navigate(propiedades.ruta)}>
                <span className="SeccionLink-title">
                    <span className="icon material-symbols-rounded">
                        {propiedades.icono}
                    </span>
                    <span>{propiedades.titulo}</span>
                </span>
                <span className="SeccionLink-action">
                    <span className="icon material-symbols-rounded">
                        expand_circle_right
                    </span>
                </span>
            </header>
            <section className="SeccionLink-content">
                {children}
            </section>
        </section>
    );
}