import { useState, useEffect } from "react";
import "./Productos.css";
import ProductoCard from "./ProductoCard.jsx";
import SeccionShow from "../../app-components/SeccionShow.jsx";

export default function Productos({ activarBoton }) {
  activarBoton(false);
  const [bebidas, setBebidas] = useState([]);
  const [alimentos, setAlimentos] = useState([]);
  const [complementos, setComplementos] = useState([]);
  const [postres, setPostres] = useState([]);
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
          setProductos((prev) => {
            const newProductos = [...prev];
            newProductos[0] = result.productos[0].length;
            newProductos[1] = result.productos[1].length;
            newProductos[2] = result.productos[2].length;
            newProductos[3] = result.productos[3].length;
            return newProductos;
          });
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
      <SeccionShow
        activo={true}
        propiedades={{
          icono: "sports_bar",
          titulo: "Bebidas",
          cantidad: productos[1],
        }}
      >
        {bebidas}
      </SeccionShow>
      <SeccionShow
        activo={true}
        propiedades={{
          icono: "dinner_dining",
          titulo: "Alimentos",
          cantidad: productos[0],
        }}
      >
        {alimentos}
      </SeccionShow>
      <SeccionShow
        activo={true}
        propiedades={{
          icono: "kebab_dining",
          titulo: "Complementos",
          cantidad: productos[3],
        }}
      >
        {complementos}
      </SeccionShow>
      <SeccionShow
        activo={true}
        propiedades={{
          icono: "icecream",
          titulo: "Postres",
          cantidad: productos[2],
        }}
      >
        {postres}
      </SeccionShow>
    </div>
  );
}
