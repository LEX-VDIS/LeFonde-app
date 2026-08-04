import { useState, useEffect } from "react";
import "./FormOrden.css";
import Seccion from "../app-components/Seccion.jsx";
import Producto from "../productos/Producto.jsx";

const detenerSubmit = (evento) => {
  evento.preventDefault();
};

export default function FormOrden() {
  const [alimentos, setAlimentos] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [postres, setPostres] = useState([]);

  useEffect(() => {
    const fetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/productos`;

    fetch(fetchURL, fetchOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          console.log(result);
          const productos0 = Array.from(
            result.productos[0],
            (producto, index) => (
              <Producto
                key={index}
                propiedades={{
                  nombre: producto.nombre,
                }}
              />
            ),
          );
          const productos1 = Array.from(
            result.productos[1],
            (producto, index) => (
              <Producto
                key={index}
                propiedades={{
                  nombre: producto.nombre,
                }}
              />
            ),
          );
          const productos2 = Array.from(
            result.productos[2],
            (producto, index) => (
              <Producto
                key={index}
                propiedades={{
                  nombre: producto.nombre,
                }}
              />
            ),
          );
          setAlimentos(productos0);
          setBebidas(productos1);
          setPostres(productos2);
        } else {
          alert(result.mensaje);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); //Efecto para obtener los productos de la base de datos y mostrarlos en la orden

  return (
    <div className="app-body">
      <div className="abd-left">
        <header className="seccion-header">
          <span>
            <label>Productos</label>
          </span>
        </header>
        <Seccion
          activo={false}
          propiedades={{
            icono: "dinner_dining",
            titulo: "Alimentos",
            contenido: alimentos,
          }}
        />
        <Seccion
          activo={false}
          propiedades={{
            icono: "sports_bar",
            titulo: "Bebidas",
            contenido: bebidas,
          }}
        />
        <Seccion
          activo={false}
          propiedades={{
            icono: "icecream",
            titulo: "Postres",
            contenido: postres,
          }}
        />
      </div>
      <div className="abd-right">
        <form onSubmit={detenerSubmit}>
          <header className="seccion-header">
            <span>
              <label htmlFor="orden">Órden</label>
              <input type="text" id="orden" name="orden" />
            </span>
            <span>
              <label htmlFor="mesa">Mesa</label>
              <select id="mesa"></select>
            </span>
          </header>
          <div className="detalle"></div>
        </form>
      </div>
    </div>
  );
}
