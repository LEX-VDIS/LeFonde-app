import { useState, useEffect } from "react";
import "./Mesas.css";
import Seccion from "./components/Seccion.jsx";
import Mesa from "./Mesa";

export default function Mesas() {
  const [mesas_disp, setMesas_disp] = useState([]);
  const [mesas_ocup, setMesas_ocup] = useState([]);

  useEffect(() => {
    const fetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ disponible: "1" }),
    };
    const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/mesas`;
    fetch(fetchURL, fetchOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          const mesas = Array.from(result.mesas, (mesa, index) => (
            <Mesa
              key={index}
              propiedades={{
                numero: mesa.numero,
                disponible: mesa.disponible === 1 ? true : false,
              }}
            />
          ));
          setMesas_disp(mesas);
        } else {
          alert(result.mensaje);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    const fetchOptions2 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ disponible: "0" }),
    };
    const fetchURL2 = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/mesas`;
    fetch(fetchURL2, fetchOptions2)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          const mesas = Array.from(result.mesas, (mesa, index) => (
            <Mesa
              key={index}
              propiedades={{
                numero: mesa.numero,
                disponible: mesa.disponible === 1 ? true : false,
              }}
            />
          ));
          setMesas_ocup(mesas);
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
          titulo: "Mesas ocupadas",
          contenido: mesas_ocup,
        }}
      />
    </div>
  );
}
