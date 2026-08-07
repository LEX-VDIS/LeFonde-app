import { useState, useEffect } from "react";
import "./FormOrden.css";
import Seccion from "../app-components/Seccion.jsx";
import ProductoCheck from "./ProductoCheck.jsx";

const detenerSubmit = (evento) => {
  evento.preventDefault();
};

const productos = {
  productos: [
    [
      {
        idproducto: 11,
        categoria: 1,
        tipo: 1,
        nombre: "platillo 0",
        precio: "10.00",
        descripcion: "descripcion del platillo",
      },
      {
        idproducto: 12,
        categoria: 1,
        tipo: 2,
        nombre: "platillo 1",
        precio: "1.00",
        descripcion: "descripcion del platillo",
      },
      {
        idproducto: 13,
        categoria: 1,
        tipo: 1,
        nombre: "platillo 2",
        precio: "2.00",
        descripcion: "descripcion del platillo",
      },
      {
        idproducto: 14,
        categoria: 1,
        tipo: 2,
        nombre: "platillo 3",
        precio: "3.00",
        descripcion: "descripcion del platillo",
      },
      {
        idproducto: 15,
        categoria: 1,
        tipo: 3,
        nombre: "platillo 4",
        precio: "4.00",
        descripcion: "descripcion del platillo",
      },
      {
        idproducto: 16,
        categoria: 1,
        tipo: 1,
        nombre: "platillo 5",
        precio: "5.00",
        descripcion: "descripcion del platillo",
      },
      {
        idproducto: 17,
        categoria: 1,
        tipo: 2,
        nombre: "platillo 6",
        precio: "6.00",
        descripcion: "descripcion del platillo",
      },
      {
        idproducto: 18,
        categoria: 1,
        tipo: 3,
        nombre: "platillo 7",
        precio: "7.00",
        descripcion: "descripcion del platillo",
      },
      {
        idproducto: 19,
        categoria: 1,
        tipo: 4,
        nombre: "platillo 8",
        precio: "8.00",
        descripcion: "descripcion del platillo",
      },
      {
        idproducto: 20,
        categoria: 1,
        tipo: 1,
        nombre: "platillo 9",
        precio: "9.00",
        descripcion: "descripcion del platillo",
      },
    ],
    [
      {
        idproducto: 21,
        categoria: 2,
        tipo: 1,
        nombre: "bebida 0",
        precio: "10.00",
        descripcion: "descripcion de la bebida",
      },
      {
        idproducto: 22,
        categoria: 2,
        tipo: 2,
        nombre: "bebida 1",
        precio: "1.00",
        descripcion: "descripcion de la bebida",
      },
      {
        idproducto: 23,
        categoria: 2,
        tipo: 1,
        nombre: "bebida 2",
        precio: "2.00",
        descripcion: "descripcion de la bebida",
      },
      {
        idproducto: 24,
        categoria: 2,
        tipo: 2,
        nombre: "bebida 3",
        precio: "3.00",
        descripcion: "descripcion de la bebida",
      },
      {
        idproducto: 25,
        categoria: 2,
        tipo: 3,
        nombre: "bebida 4",
        precio: "4.00",
        descripcion: "descripcion de la bebida",
      },
      {
        idproducto: 26,
        categoria: 2,
        tipo: 1,
        nombre: "bebida 5",
        precio: "5.00",
        descripcion: "descripcion de la bebida",
      },
      {
        idproducto: 27,
        categoria: 2,
        tipo: 2,
        nombre: "bebida 6",
        precio: "6.00",
        descripcion: "descripcion de la bebida",
      },
      {
        idproducto: 28,
        categoria: 2,
        tipo: 3,
        nombre: "bebida 7",
        precio: "7.00",
        descripcion: "descripcion de la bebida",
      },
      {
        idproducto: 29,
        categoria: 2,
        tipo: 4,
        nombre: "bebida 8",
        precio: "8.00",
        descripcion: "descripcion de la bebida",
      },
      {
        idproducto: 30,
        categoria: 2,
        tipo: 1,
        nombre: "bebida 9",
        precio: "9.00",
        descripcion: "descripcion de la bebida",
      },
    ],
    [
      {
        idproducto: 31,
        categoria: 3,
        tipo: 1,
        nombre: "postre 0",
        precio: "10.00",
        descripcion: "descripcion del postre",
      },
      {
        idproducto: 32,
        categoria: 3,
        tipo: 2,
        nombre: "postre 1",
        precio: "1.00",
        descripcion: "descripcion del postre",
      },
      {
        idproducto: 33,
        categoria: 3,
        tipo: 1,
        nombre: "postre 2",
        precio: "2.00",
        descripcion: "descripcion del postre",
      },
      {
        idproducto: 34,
        categoria: 3,
        tipo: 2,
        nombre: "postre 3",
        precio: "3.00",
        descripcion: "descripcion del postre",
      },
      {
        idproducto: 35,
        categoria: 3,
        tipo: 3,
        nombre: "postre 4",
        precio: "4.00",
        descripcion: "descripcion del postre",
      },
      {
        idproducto: 36,
        categoria: 3,
        tipo: 1,
        nombre: "postre 5",
        precio: "5.00",
        descripcion: "descripcion del postre",
      },
      {
        idproducto: 37,
        categoria: 3,
        tipo: 2,
        nombre: "postre 6",
        precio: "6.00",
        descripcion: "descripcion del postre",
      },
      {
        idproducto: 38,
        categoria: 3,
        tipo: 3,
        nombre: "postre 7",
        precio: "7.00",
        descripcion: "descripcion del postre",
      },
      {
        idproducto: 39,
        categoria: 3,
        tipo: 4,
        nombre: "postre 8",
        precio: "8.00",
        descripcion: "descripcion del postre",
      },
      {
        idproducto: 40,
        categoria: 3,
        tipo: 1,
        nombre: "postre 9",
        precio: "9.00",
        descripcion: "descripcion del postre",
      },
    ],
  ],
};

export default function FormOrden() {
  const [alimentos, setAlimentos] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [postres, setPostres] = useState([]);
  const [complementos, setComplementos] = useState([]);

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
              <ProductoCheck
                key={producto.idproducto}
                propiedades={{
                  id: producto.idproducto,
                  nombre: producto.nombre,
                  precio: producto.precio,
                  detalle: producto.descripcion,
                }}
              />
            ),
          );
          const productos1 = Array.from(
            result.productos[1],
            (producto, index) => (
              <ProductoCheck
                key={producto.idproducto}
                propiedades={{
                  id: producto.idproducto,
                  nombre: producto.nombre,
                  precio: producto.precio,
                  detalle: producto.descripcion,
                }}
              />
            ),
          );
          const productos2 = Array.from(
            result.productos[2],
            (producto, index) => (
              <ProductoCheck
                key={producto.idproducto}
                propiedades={{
                  id: producto.idproducto,
                  nombre: producto.nombre,
                  precio: producto.precio,
                  detalle: producto.descripcion,
                }}
              />
            ),
          );
          const productos3 = Array.from(
            result.productos[3],
            (producto, index) => (
              <ProductoCheck
                key={producto.idproducto}
                propiedades={{
                  id: producto.idproducto,
                  nombre: producto.nombre,
                  precio: producto.precio,
                  detalle: producto.descripcion,
                }}
              />
            ),
          );
          setAlimentos(productos0);
          setBebidas(productos1);
          setPostres(productos2);
          setComplementos(productos3);
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
              <label>#66</label>
            </span>
          </span>
          <span className="form-header-span">
            <span>
              <span className="icon material-symbols-rounded">concierge</span>
              <select id="serv" name="serv">
                <option value="0">Mesa</option>
                <option value="1">Llevar</option>
                <option value="2">Enviar</option>
              </select>
            </span>
            <span>
              <span className="icon material-symbols-rounded">
                table_restaurant
              </span>
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
            <span className="orden-title">
              <span className="icon material-symbols-rounded">menu_book_2</span>
              <span>Menú</span>
            </span>
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
                icono: "dinner_dining",
                titulo: "Alimentos",
                contenido: alimentos,
              }}
            />
            <Seccion
              activo={false}
              propiedades={{
                icono: "kebab_dining",
                titulo: "Complementos",
                contenido: complementos,
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
            <span className="orden-title">
              <span className="icon material-symbols-rounded">orders</span>
              <span>Productos en la orden</span>
            </span>
            <table className="detalle">
              <thead>
                <tr>
                  <th>Cantidad</th>
                  <th className="left">Producto</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="center">
                    <span className="masmenos">
                      <button className="cantidad">
                        <span className="icon material-symbols-rounded">
                          do_not_disturb_on
                        </span>
                      </button>
                      5
                      <button className="cantidad">
                        <span className="icon material-symbols-rounded">
                          add_circle
                        </span>
                      </button>
                    </span>
                  </td>
                  <td>platillo 1</td>
                  <td className="center">$1.00</td>
                  <td className="center">$5.00</td>
                </tr>
                                <tr>
                  <td className="center">
                    <span className="masmenos">
                      <button className="cantidad">
                        <span className="icon material-symbols-rounded">
                          do_not_disturb_on
                        </span>
                      </button>
                      5
                      <button className="cantidad">
                        <span className="icon material-symbols-rounded">
                          add_circle
                        </span>
                      </button>
                    </span>
                  </td>
                  <td>platillo 1</td>
                  <td className="center">$1.00</td>
                  <td className="center">$5.00</td>
                </tr>
                                <tr>
                  <td className="center">
                    <span className="masmenos">
                      <button className="cantidad">
                        <span className="icon material-symbols-rounded">
                          do_not_disturb_on
                        </span>
                      </button>
                      5
                      <button className="cantidad">
                        <span className="icon material-symbols-rounded">
                          add_circle
                        </span>
                      </button>
                    </span>
                  </td>
                  <td>platillo 1</td>
                  <td className="center">$1.00</td>
                  <td className="center">$5.00</td>
                </tr>
                                <tr>
                  <td className="center">
                    <span className="masmenos">
                      <button className="cantidad">
                        <span className="icon material-symbols-rounded">
                          do_not_disturb_on
                        </span>
                      </button>
                      5
                      <button className="cantidad">
                        <span className="icon material-symbols-rounded">
                          add_circle
                        </span>
                      </button>
                    </span>
                  </td>
                  <td>platillo 1</td>
                  <td className="center">$1.00</td>
                  <td className="center">$5.00</td>
                </tr>
                                <tr>
                  <td className="center">
                    <span className="masmenos">
                      <button className="cantidad">
                        <span className="icon material-symbols-rounded">
                          do_not_disturb_on
                        </span>
                      </button>
                      5
                      <button className="cantidad">
                        <span className="icon material-symbols-rounded">
                          add_circle
                        </span>
                      </button>
                    </span>
                  </td>
                  <td>platillo 1</td>
                  <td className="center">$1.00</td>
                  <td className="center">$5.00</td>
                </tr>
                                <tr>
                  <td className="center">
                    <span className="masmenos">
                      <button className="cantidad">
                        <span className="icon material-symbols-rounded">
                          do_not_disturb_on
                        </span>
                      </button>
                      5
                      <button className="cantidad">
                        <span className="icon material-symbols-rounded">
                          add_circle
                        </span>
                      </button>
                    </span>
                  </td>
                  <td>platillo 1</td>
                  <td className="center">$1.00</td>
                  <td className="center">$5.00</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>15</th>
                  <th colSpan={2}></th>
                  <th>$15.00</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
}
