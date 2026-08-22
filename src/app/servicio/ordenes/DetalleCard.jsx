import "./DetalleCard.css";
import { useEffect, useState } from "react";

const iconos = [
  { id: 2, icon: "sports_bar" },
  { id: 1, icon: "dinner_dining" },
  { id: 4, icon: "kebab_dining" },
  { id: 3, icon: "icecream" },
];

export default function DetalleCard({ propiedades, setRefrescar }) {
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

  const servirProducto = (idproducto, accion, cantidad) => {
    const fetchOptions = {
      method: accion,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ producto: idproducto, cantidad: cantidad }),
    };
    const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/servir`;
    fetch(fetchURL, fetchOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          console.log(`Producto con ID ${idproducto} marcado como ${accion}.`);
          setRefrescar((prev) => !prev);
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
              Cantidad: {propiedades.cantidad} 
            </span>
          </span>
        </div>
      </div>
      <div className="rowDetalle">
        <button
          className="accion card red"
          type="button"
          onClick={() => servirProducto(propiedades.iddetalle, "DELETE", propiedades.cantidad)}
        >
          <span className="icon material-symbols-rounded">delete</span>
        </button>

        <button style={propiedades.cantidad === 0? { display: "none" } : {}}
          className="accion card blue"
          type="button"
          onClick={() => servirProducto(propiedades.iddetalle, "PUT", propiedades.cantidad)}
        >
          <span className="icon material-symbols-rounded">check_circle</span>
        </button>
      </div>
    </div>
  );
}
