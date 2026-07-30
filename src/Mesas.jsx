import { useState, useEffect } from "react";
import "./Ordenes.css";
import Seccion from "./components/Seccion.jsx";
import Mesa from "./Mesa";

const cantidad = 12;
const mesobas = Array.from({ length: cantidad }, (_, index) => (
  <Mesa key={index} propiedades={{ numero: index }} />
));

export default function Ordenes() {
  const [mesas_disp, setMesas_disp] = useState([]);

  useEffect(() => {
    const fetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/mesas`;
    fetch(fetchURL, fetchOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          const mesastre = Array.from(result.mesas, (mesa, index) => (
            <Mesa
              key={index}
              propiedades={{
                numero: mesa.numero,
                disponible: mesa.disponible === 1 ? true : false,
              }}
            />
          ));
          setMesas_disp(mesastre);
        } else {
          alert(result.mensaje);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="app-body">
      <Seccion
        propiedades={{
          icono: "table_restaurant",
          titulo: "Mesas disponibles",
          contenido: mesas_disp,
        }}
      />
      <Seccion
        propiedades={{
          icono: "table_restaurant",
          titulo: "Mesas no disponibles",
          contenido: mesobas,
        }}
      />
    </div>
  );
}
