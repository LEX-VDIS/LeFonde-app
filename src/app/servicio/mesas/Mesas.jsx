import { useState, useEffect } from "react";
import "./Mesas.css";
import MesaCard from "./MesaCard.jsx";
import SeccionShow from "../../../app-components/SeccionShow.jsx";

export default function Mesas({ activarBoton }) {
  activarBoton(false);
  const [mesas_disp, setMesas_disp] = useState([]);
  const [mesas_ocup, setMesas_ocup] = useState([]);
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    const fetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/mesas`;

    fetch(fetchURL, fetchOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result) {
          setMesas((prev) => {
            const newMesas = [...prev];
            newMesas[0] = result.mesas[0].length;
            return newMesas;
          });
          const mesas1 = Array.from(result.mesas[0], (mesa, index) => (
            <MesaCard
              key={index}
              propiedades={{
                numero: mesa.numero,
                orden: null,
                disponible: mesa.disponible === 1 ? true : false,
              }}
            />
          ));
          setMesas((prev) => {
            const newMesas = [...prev];
            newMesas[1] = result.mesas[1].length;
            return newMesas;
          });
          const mesas2 = Array.from(result.mesas[1], (mesa, index) => (
            <MesaCard
              key={index}
              propiedades={{
                numero: mesa.numero,
                orden: result.mesas[2].find((o) => o.idmesa === mesa.numero),
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
      <SeccionShow
        activo={true}
        propiedades={{
          icono: "dine_lamp",
          titulo: "Mesas disponibles",
          cantidad: mesas[0],
        }}
      >
        {mesas_disp}
      </SeccionShow>
      <SeccionShow
        activo={true}
        propiedades={{
          icono: "dine_in",
          titulo: "Mesas ocupadas",
          cantidad: mesas[1],
        }}
      >
        {mesas_ocup}
      </SeccionShow>
    </div>
  );
}
