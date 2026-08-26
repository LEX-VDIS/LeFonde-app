import "./Seccion.css";
import { useNavigate } from "react-router-dom";

export default function SeccionLink({ propiedades, children }) {
    const navigate = useNavigate();
    return (
        <section className="Seccion">
            <header className="Seccion-header-dinamic" onClick={() => navigate(propiedades.ruta)}>
                <span className="Seccion-title">
                    <span className="icon material-symbols-rounded">
                        {propiedades.icono}
                    </span>
                    <span>{propiedades.titulo}</span>
                </span>
                <span className="Seccion-action">
                    <span className="icon material-symbols-rounded">
                        expand_circle_right
                    </span>
                </span>
            </header>
            <section className={`Seccion-content-${propiedades.mostrar}`}>
                {children}
            </section>
        </section>
    );
}