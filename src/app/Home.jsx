import { useEffect, useState } from "react";
import "./Home.css";
import SeccionLink from "../app-components/SeccionLink.jsx";
import LinkCard from "../app-components/LinkCard.jsx";
import InfoLinkCard from "../app-components/InfoLinkCard.jsx";
import { parseJwt } from "./sesion.js";
import { io } from "socket.io-client";
const socket = io(
  `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}`,
);

let administrador = 0;

if (
  localStorage.getItem("tokenme") &&
  parseJwt(localStorage.getItem("tokenme")).usuario[0].administrador === 1
) {
  administrador = 1;
} else {
  administrador = 0;
}

export default function Home({ activarBoton }) {
  activarBoton(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    socket.on("mensaje", (data) => {
      console.log("Mensaje del servidor:", data);
      setUpdate((prev) => !prev);
    });
  }, []); //Efecto para escuchar los mensajes del servidor y actualizar la lista de ordenes cuando se recibe un mensaje

  const [conteoServicio, setConteoServicio] = useState({
    ordenesActivas: 0,
    ordenesServidas: 0,
    ordenesFinalizadas: 0,
    mesasDisponibles: 0,
    mesasOcupadas: 0,
  });
  const [conteoAdministracion, setConteoAdministracion] = useState({
    totalOrdenes: 0,
    totalGanancia: 0,
    administradores: 0,
    usuarios: 0,
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
          setConteoServicio({
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
  }, [update]); //Efecto para obtener los conteos de ordenes y mesas al cargar la página
  useEffect(() => {
    const fetchOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/administracion`;

    fetch(fetchURL, fetchOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          setConteoAdministracion({
            totalOrdenes: result.conteos[0][0].total,
            totalGanancia: result.conteos[1][0].total,
            administradores: result.conteos[2][0].total,
            usuarios: result.conteos[3][0].total,
          });
        } else {
          alert(result.mensaje);
        }
      })
      .catch((error) => {
        console.error("Error fetching administración:", error);
      });
  }, [update]); //Efecto para obtener la lista de administración al cargar la página y cuando se recibe un mensaje del servidor

  return (
    <div className="app-body">
      <SeccionLink
        propiedades={{
          icono: "flatware",
          titulo: "Servicio",
          ruta: "/servicio",
          mostrar: "flex",
        }}
      >
        <LinkCard
          titulo="Órdenes"
          icono="room_service"
          ruta="/servicio/ordenes"
          contenido={true}
        >
          <InfoLinkCard
            icon="order_play"
            label="Activas"
            value={conteoServicio.ordenesActivas}
          />
          <InfoLinkCard
            icon="inactive_order"
            label="Servidas"
            value={conteoServicio.ordenesServidas}
          />
        </LinkCard>
        <LinkCard
          titulo="Mesas"
          icono="table_restaurant"
          ruta="/servicio/mesas"
          contenido={true}
        >
          <InfoLinkCard
            icon="dine_lamp"
            label="Disponibles"
            value={conteoServicio.mesasDisponibles}
          />
          <InfoLinkCard
            icon="dine_in"
            label="Ocupadas"
            value={conteoServicio.mesasOcupadas}
          />
        </LinkCard>
      </SeccionLink>
      <SeccionLink
        propiedades={{
          icono: "menu_book_2",
          titulo: "Productos",
          ruta: "/productos",
          mostrar: "flex",
        }}
      >
        <LinkCard
          titulo="Bebidas"
          icono="sports_bar"
          ruta="/productos/bebidas"
          contenido={false}
        ></LinkCard>
        <LinkCard
          titulo="Alimentos"
          icono="dinner_dining"
          ruta="/productos/alimentos"
          contenido={false}
        ></LinkCard>
        <LinkCard
          titulo="Complementos"
          icono="kebab_dining"
          ruta="/productos/complementos"
          contenido={false}
        ></LinkCard>
        <LinkCard
          titulo="Postres"
          icono="icecream"
          ruta="/productos/postres"
          contenido={false}
        />
      </SeccionLink>
      {administrador === 1 && (
        <SeccionLink
          propiedades={{
            icono: "briefcase_meal",
            titulo: "Administración",
            ruta: "/administracion",
            mostrar: "flex",
          }}
        >
          <LinkCard
            titulo="Reportes"
            icono="query_stats"
            ruta="/administracion/reportes"
            contenido={true}
          >
            <InfoLinkCard
              icon="order_approve"
              label="Finalizadas"
              value={conteoAdministracion.totalOrdenes}
            />
            <InfoLinkCard
              icon="money_bag"
              label="Ingresos"
              value={"$" + Intl.NumberFormat("es-MX", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(conteoAdministracion.totalGanancia)}
            />
          </LinkCard>
          <LinkCard
            titulo="Personal"
            icono="patient_list"
            ruta="/administracion/personal"
            contenido={true}
          >
            <InfoLinkCard
              icon="manage_accounts"
              label="Administradores"
              value={conteoAdministracion.administradores}
            />
            <InfoLinkCard
              icon="person"
              label="Usuarios"
              value={conteoAdministracion.usuarios}
            />
          </LinkCard>
        </SeccionLink>
      )}
    </div>
  );
}
