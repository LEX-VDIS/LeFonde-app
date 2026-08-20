import { useState, useEffect } from "react";
import { parseJwt } from "../sesion.js";
import "./OrdenForm.css";
import Seccion from "../app-components/Seccion.jsx";
import ProductoCheck from "./ProductoCheck.jsx";
import { useCart } from "./useCart.js";
import { useForm } from "react-hook-form";

function cartItem(quantity, producto, precio, addToCart, removeFromCart) {
  return (
    <tr>
      <td className="center">
        <span className="masmenos">
          <button type="button" className="cantidad" onClick={removeFromCart}>
            <span className="icon material-symbols-rounded">
              do_not_disturb_on
            </span>
          </button>
          {quantity}
          <button type="button" className="cantidad" onClick={addToCart}>
            <span className="icon material-symbols-rounded">add_circle</span>
          </button>
        </span>
      </td>
      <td>{producto}</td>
      <td className="center">${precio}</td>
      <td className="center">${(quantity * precio).toFixed(2)}</td>
    </tr>
  );
}

export default function OrdenForm({ setNuevaOrden }) {
  const [alimentos, setAlimentos] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [postres, setPostres] = useState([]);
  const [complementos, setComplementos] = useState([]);
  const { addToCart, removeFromCart, clearCart, cart } = useCart();
  const [mesas_disp, setMesas_disp] = useState([]);

  useEffect(() => {
    const fetchOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/mesas`;

    fetch(fetchURL, fetchOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          console.log(result);
          const mesas = Array.from(result.mesas, (mesa, index) => (
            <option key={index} value={mesa.numero}>
              {mesa.numero}
            </option>
          ));
          setMesas_disp(mesas);
        } else {
          alert(result.mensaje);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); //Efecto para obtener las mesas disponibles

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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const fetchOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/mesas`;
      const response = await fetch(fetchURL, fetchOptions);
      const result = await response.json();
      if (result) {
        return { servicio: 0, mesa: result.mesas[0].numero };
      } else {
        alert(result.mensaje);
        return { servicio: 0, mesa: 0 };
      }
    },
  });
  console.log("ERROR", errors);

  const enviarOrden = handleSubmit((data) => {
    const fetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: data, productos: cart, usuario: parseJwt(localStorage.getItem("tokenme")).usuario[0].idusuario }),
    };
    const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/nuevaorden`;
    fetch(fetchURL, fetchOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    setNuevaOrden(false);
  });

  const mostrarMesas = (e) => {
    if (e.target.value === "0") {
      setValue("mesa", mesas_disp[0].props.value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    } else {
      setValue("mesa", 0, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  return (
    <div className="app-body">
      <form className="form-orden" id="form-orden" onSubmit={enviarOrden}>
        <header className="form-header">
          <span className="form-header-span">
            <span>
              <span className="icon material-symbols-rounded">room_service</span>
              Servicio en
              <select
                id="serv"
                name="servicio"
                {...register("servicio", {
                  required: true,
                  onChange: mostrarMesas,
                  valueAsNumber: true,
                })}
              >
                <option value="0">Mesa</option>
                <option value="1">Mostrador</option>
              </select>
            </span>
            {watch("servicio") === 0 && (
              <span id="mesa-span">
                <span className="icon material-symbols-rounded">
                  table_restaurant
                </span>
                <select
                  id="mesa"
                  name="mesa"
                  {...register("mesa", {
                    required: true,
                    validate: (value) => value !== "0",
                    valueAsNumber: true,
                  })}
                >
                  {mesas_disp}
                </select>
              </span>
            )}
          </span>
          <span className="form-header-span">
            <span>
              <span className="icon material-symbols-rounded">
                person_apron
              </span>
              <label>
                Atendido por{" "}
                {parseJwt(localStorage.getItem("tokenme")).usuario[0].nombre}
              </label>
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
                {cart.map((item) =>
                  cartItem(
                    item.quantity,
                    item.nombre,
                    item.precio,
                    () => addToCart(item),
                    () => removeFromCart(item.id),
                  ),
                )}
              </tbody>
              <tfoot>
                <tr>
                  <th>
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </th>
                  <th colSpan={2}></th>
                  <th>
                    $
                    {cart
                      .reduce(
                        (total, item) => total + item.quantity * item.precio,
                        0,
                      )
                      .toFixed(2)}
                  </th>
                </tr>
              </tfoot>
            </table>
            <div className="form-footer">
              <div className="form-footer-left">
                <button
                  className="accion seccion red"
                  type="button"
                  onClick={() => setNuevaOrden(false)}
                >
                  <span className="icon material-symbols-rounded">cancel</span>
                  Cancelar
                </button>
                <button
                  className="accion seccion blue"
                  type="button"
                  onClick={clearCart}
                >
                  <span className="icon material-symbols-rounded">delete</span>
                </button>
              </div>
              <div className="form-footer-right">
                <button className="accion seccion blue" type="submit">
                  <span className="icon material-symbols-rounded">
                    check_circle
                  </span>
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
