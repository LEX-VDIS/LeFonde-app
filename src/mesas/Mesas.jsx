import { useState, useEffect } from "react";
import "./Mesas.css";
import Seccion from "../app-components/Seccion.jsx";
import MesaCard from "./MesaCard.jsx";

export default function Mesas() {
  const [mesas_disp, setMesas_disp] = useState([]);
  const [mesas_ocup, setMesas_ocup] = useState([]);

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
          const mesas1 = Array.from(result.mesas[0], (mesa, index) => (
            <MesaCard
              key={index}
              propiedades={{
                numero: mesa.numero,
                disponible: mesa.disponible === 1 ? true : false,
              }}
            />
          ));
          const mesas2 = Array.from(result.mesas[1], (mesa, index) => (
            <MesaCard
              key={index}
              propiedades={{
                numero: mesa.numero,
                disponible: mesa.disponible === 1 ? true : false,
              }}
            />
          ));
          setMesas_disp(mesas1);
          setMesas_ocup(mesas2);
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
        activo={true}
        propiedades={{
          icono: "table_restaurant",
          titulo: "Mesas disponibles",
          contenido: mesas_disp,
        }}
      />
      <Seccion
        activo={false}
        propiedades={{
          icono: "table_restaurant",
          titulo: "Mesas ocupadas",
          contenido: mesas_ocup,
        }}
      />
    </div>
  );
}
