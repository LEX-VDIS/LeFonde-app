import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SeccionLink from "../../app-components/SeccionLink.jsx";
import InfoCard from "../../app-components/InfoCard.jsx";

export default function Servicio({ activarBoton }) {
  activarBoton(false);
  const navigate = useNavigate();
  const [conteo, setConteo] = useState({
    ordenesActivas: 0,
    ordenesServidas: 0,
    ordenesFinalizadas: 0,
    mesasDisponibles: 0,
    mesasOcupadas: 0,
  });
  useEffect(() => {
    const fetchOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/servicio`;

    fetch(fetchURL, fetchOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          setConteo({
            ordenesActivas: result.conteos[0][0].total,
            ordenesServidas: result.conteos[1][0].total,
            ordenesFinalizadas: result.conteos[2][0].total,
            mesasDisponibles: result.conteos[3][0].total,
            mesasOcupadas: result.conteos[4][0].total,
          });
        } else {
          alert(result.mensaje);
        }
      });
  }, []);

  return (
    <div className="app-body">
      <SeccionLink
        propiedades={{
          icono: "room_service",
          titulo: "Ordenes",
          ruta: "/servicio/ordenes",
        }}
      >
        <InfoCard
          icon="order_play"
          label="Ordenes activas"
          value={conteo.ordenesActivas}
        />
        <InfoCard
          icon="inactive_order"
          label="Ordenes servidas"
          value={conteo.ordenesServidas}
        />
        <InfoCard
          icon="order_approve"
          label="Ordenes finalizadas"
          value={conteo.ordenesFinalizadas}
        />
      </SeccionLink>
      <SeccionLink
        propiedades={{
          icono: "table_restaurant",
          titulo: "Mesas",
          ruta: "/servicio/mesas",
        }}
      >
        <InfoCard
          icon="dine_lamp"
          label="Mesas disponibles"
          value={conteo.mesasDisponibles}
        />
        <InfoCard
          icon="dine_in"
          label="Mesas ocupadas"
          value={conteo.mesasOcupadas}
        />
      </SeccionLink>
    </div>
  );
}
