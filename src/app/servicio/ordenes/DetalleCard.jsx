import "./DetalleCard.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io(
  `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}`,
);

const iconos = [
  { id: 2, icon: "sports_bar" },
  { id: 1, icon: "dinner_dining" },
  { id: 4, icon: "kebab_dining" },
  { id: 3, icon: "icecream" },
];

export default function DetalleCard({ propiedades, setRefrescar, conteo, botones }) {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const fetchOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/productos`;

    fetch(fetchURL, fetchOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          const productosList = [
            ...result.productos[0],
            ...result.productos[1],
            ...result.productos[2],
            ...result.productos[3],
          ];
          setProductos(productosList);
        } else {
          alert(result.mensaje);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); //Efecto para obtener los productos de la base de datos y mostrarlos en la orden

  const servirProducto = (idproducto, accion, method) => {
    const fetchOptions = {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ producto: idproducto, accion: accion }),
    };
    const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/servir`;
    fetch(fetchURL, fetchOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          setRefrescar((prev) => !prev);
          socket.emit("mensaje", "Orden modificada");
        } else {
          alert(result.mensaje);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setProductos((prevProductos) =>
      prevProductos.filter((producto) => producto.idproducto !== idproducto),
    );
  };

  const icono = productos.find(
    (producto) => producto.idproducto === propiedades.idproducto,
  )?.categoria;
  const iconoNombre = iconos.find((icon) => icon.id === icono)?.icon;

  return (
    <div className="tarjetaDetalle">
      <div className="rowDetalle">
        <span className="icon material-symbols-rounded">{iconoNombre}</span>

        <div className="rowProducto text-card">
          <span className="detalle-nombre-precio">
            <label>
              {
                productos.find(
                  (producto) => producto.idproducto === propiedades.idproducto,
                )?.nombre
              }
            </label>
            <span className="detalle-precio">
              {conteo === true ? (
                <>Cantidad: {propiedades.cantidad} de {propiedades.cantidad + propiedades.servido}</>
              ) : (
                <>Cantidad: {propiedades.servido} de {propiedades.cantidad + propiedades.servido}</>
              )}
            </span>
          </span>
        </div>
      </div>
      <div className="rowDetalle">
        {botones[0].activo && (
          <button
            className="accion card red"
            type="button"
            onClick={() => servirProducto(propiedades.iddetalle, botones[0].accion, "DELETE")}
          >
            <span className="icon material-symbols-rounded">{botones[0].icono}</span>
          </button>
        )}

        <button
          className="accion card blue"
          type="button"
          onClick={() => servirProducto(propiedades.iddetalle, botones[1].accion, "PUT")}
        >
          <span className="icon material-symbols-rounded">
            {botones[1].icono}
          </span>
        </button>
      </div>
    </div>
  );
}
