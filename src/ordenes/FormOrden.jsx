import { useState, useEffect } from "react";
import "./FormOrden.css";
import Seccion from "../app-components/Seccion.jsx";
import ProductoChckBx from "./ProductoChckBx.jsx";

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
              <ProductoChckBx
                key={producto.idproducto}
                propiedades={{
                  id: producto.idproducto,
                  nombre: producto.nombre,
                }}
              />
            ),
          );
          const productos1 = Array.from(
            result.productos[1],
            (producto, index) => (
              <ProductoChckBx
                key={producto.idproducto}
                propiedades={{
                  id: producto.idproducto,
                  nombre: producto.nombre,
                }}
              />
            ),
          );
          const productos2 = Array.from(
            result.productos[2],
            (producto, index) => (
              <ProductoChckBx
                key={producto.idproducto}
                propiedades={{
                  id: producto.idproducto,
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

  const cantidad = 12;

  return (
    <div className="app-body">
      <form className="form-orden" onSubmit={detenerSubmit}>
        <header className="form-header">
          <span className="form-header-span">
            <span>
              <span className="icon material-symbols-rounded">hand_meal</span>
              <label>Orden #</label>
              <label>66</label>
            </span>
          </span>
          <span className="form-header-span">
            <span>
              <label htmlFor="serv">Servicio</label>
              <select id="serv" name="serv">
                <option value="0">Mesa</option>
                <option value="1">Llevar</option>
                <option value="2">Enviar</option>
              </select>
              <select id="mesa" name="mesa">
                {Array.from({ length: cantidad }, (_, index) => (
                  <option key={index}>{index + 1}</option>
                ))}
              </select>
            </span>
          </span>
        </header>

        <div className="form-body">
          <div className="abd-left">
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
            <table className="detalle">
              <thead>
                <tr>
                  <th colSpan={4}>Productos en la orden</th>
                </tr>
                <tr>
                  <th>Cantidad</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>5</td>
                  <td>platillo 1</td>
                  <td>$1.00</td>
                  <td>$5.00</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>platillo 1</td>
                  <td>$1.00</td>
                  <td>$5.00</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>platillo 1</td>
                  <td>$1.00</td>
                  <td>$5.00</td>
                </tr>


                
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
}
