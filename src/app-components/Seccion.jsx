import "./Seccion.css";
import { useNavigate } from "react-router-dom";

export default function Seccion({ propiedades, children }) {
    const navigate = useNavigate();
    return (
        <section className="Seccion">
            <header className="Seccion-header">
                <span className="Seccion-title">
                    <span className="icon material-symbols-rounded">
                        {propiedades.icono}
                    </span>
                    <span>{propiedades.titulo}</span>
                </span>
            </header>
            <section className={`Seccion-content-${propiedades.mostrar}`}>
                {children}
            </section>
        </section>
    );
}