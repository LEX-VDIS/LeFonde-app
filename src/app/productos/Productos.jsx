import { useState, useEffect } from "react";
import "./Productos.css";
import Seccion from "../../app-components/Seccion.jsx";
import ProductoCard from "./ProductoCard.jsx";

export default function Productos({ activarBoton }) {
  activarBoton(false);
  const [bebidas, setBebidas] = useState([]);
  const [alimentos, setAlimentos] = useState([]);
  const [complementos, setComplementos] = useState([]);
  const [postres, setPostres] = useState([]);

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
          setBebidas(
            Array.from(result.productos[1], (producto, index) => (
              <ProductoCard
                key={index}
                propiedades={{
                  nombre: producto.nombre,
                  precio: producto.precio,
                  descripcion: producto.descripcion,
                }}
              />
            )),
          );
          setAlimentos(
            Array.from(result.productos[0], (producto, index) => (
              <ProductoCard
                key={index}
                propiedades={{
                  nombre: producto.nombre,
                  precio: producto.precio,
                  descripcion: producto.descripcion,
                }}
              />
            )),
          );
          setComplementos(
            Array.from(result.productos[3], (producto, index) => (
              <ProductoCard
                key={index}
                propiedades={{
                  nombre: producto.nombre,
                  precio: producto.precio,
                  descripcion: producto.descripcion,
                }}
              />
            )),
          );
          setPostres(
            Array.from(result.productos[2], (producto, index) => (
              <ProductoCard
                key={index}
                propiedades={{
                  nombre: producto.nombre,
                  precio: producto.precio,
                }}
              />
            )),
          );
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
          icono: "sports_bar",
          titulo: "Bebidas",
          contenido: bebidas,
        }}
      />
      <Seccion
        activo={true}
        propiedades={{
          icono: "dinner_dining",
          titulo: "Alimentos",
          contenido: alimentos,
        }}
      />
      <Seccion
        activo={true}
        propiedades={{
          icono: "kebab_dining",
          titulo: "Complementos",
          contenido: complementos,
        }}
      />
      <Seccion
        activo={true}
        propiedades={{
          icono: "icecream",
          titulo: "Postres",
          contenido: postres,
        }}
      />
    </div>
  );
}
