import { useState, useEffect } from "react";
import { parseJwt } from "../../sesion.js";
import "./OrdenForm.css";
import Seccion from "../../../app-components/Seccion.jsx";
import SeccionShow from "../../../app-components/SeccionShow.jsx";
import ProductoCheck from "./ProductoCheck.jsx";
import { useCart } from "./useCart.js";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
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

function cartItem(quantity, producto, precio, addToCart, removeFromCart) {
  return (
    <div className="tarjetaProducto">
      <div className="rowProducto">
        <button
          className="accion card blue"
          type="button"
          onClick={removeFromCart}
        >
          <span className="icon material-symbols-rounded">
            {quantity > 1 ? "remove_circle" : "delete"}
          </span>
        </button>
      </div>
      <div className="rowProducto text-card">
        <span className="detalle-nombre-precio">
          <label>{producto}</label>
          <span className="detalle-precio">
            ${precio} | Cantidad: {quantity} | ${(quantity * precio).toFixed(2)}
          </span>
        </span>
      </div>
      <div className="rowProducto ">
        <button className="accion card blue" type="button" onClick={addToCart}>
          <span className="icon material-symbols-rounded">add_circle</span>
        </button>
      </div>
    </div>
  );
}

export default function OrdenForm({
  setNuevaOrden,
  mesa,
  activarBoton,
  propsBoton,
  setUpdateOrdenes,
}) {
  const [alimentos, setAlimentos] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [postres, setPostres] = useState([]);
  const [complementos, setComplementos] = useState([]);
  const [productos, setProductos] = useState([]);
  const { addToCart, removeFromCart, clearCart, cart } = useCart();
  const [mesas_disp, setMesas_disp] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  searchParams.get("new") && activarBoton(false); //Si se abre el formulario de nueva orden desde el link, se desactiva el botón de nueva orden en el header

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
        return {
          servicio: 0,
          mesa: mesa ? mesa : result.mesas[0].numero,
          cantidad: 0,
          total: 0,
        };
      } else {
        alert(result.mensaje);
        return { servicio: 0, mesa: mesa ? mesa : 0, cantidad: 0, total: 0 };
      }
    },
  });
  console.log("ERROR", errors);

  setValue(
    "cantidad",
    cart.reduce((total, item) => total + item.quantity, 0),
  );
  setValue(
    "total",
    cart
      .reduce((total, item) => total + item.quantity * item.precio, 0)
      .toFixed(2),
  );

  const enviarOrden = handleSubmit((data) => {
    const fetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: data,
        productos: cart,
        usuario: parseJwt(localStorage.getItem("tokenme")).usuario[0].idusuario,
      }),
    };
    const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/nuevaorden`;
    fetch(fetchURL, fetchOptions)
      .then((response) => response.json())
      .then((result) => {
        socket.emit("mensaje", "Nueva orden agregada");
        setUpdateOrdenes((prev) => !prev);
      })
      .catch((error) => {
        console.log(error);
      });
    setNuevaOrden(false);
    activarBoton(true);
    setSearchParams({});
    setUpdateOrdenes((prev) => !prev);
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

  const formHeder = (
    <header>
      <span className="form-header-span">
        <span>
          Orden en
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
    </header>
  );

  return (
    <div className="app-body">
      <form className="form-orden" id="form-orden" onSubmit={enviarOrden}>
        <Seccion
          propiedades={{
            icono: ["room_service", "person_apron"],
            titulo: [
              formHeder,
              `Atendido por ${parseJwt(localStorage.getItem("tokenme")).usuario[0].nombre}`,
            ],
            mostrar: "flex",
            doble: true,
          }}
        >
          <SeccionShow
            activo={true}
            propiedades={{
              icono: "menu_book_2",
              titulo: "Menú de productos",
              mostrar: "flex",
              lado: "left",
              pie: [false, {}],
            }}
          >
            <SeccionShow
              activo={false}
              propiedades={{
                icono: "sports_bar",
                titulo: "Bebidas",
                cantidad: productos[1],
                mostrar: "grid",
              }}
            >
              {bebidas}
            </SeccionShow>
            <SeccionShow
              activo={false}
              propiedades={{
                icono: "dinner_dining",
                titulo: "Alimentos",
                cantidad: productos[0],
                mostrar: "grid",
              }}
            >
              {alimentos}
            </SeccionShow>
            <SeccionShow
              activo={false}
              propiedades={{
                icono: "kebab_dining",
                titulo: "Complementos",
                cantidad: productos[3],
                mostrar: "grid",
              }}
            >
              {complementos}
            </SeccionShow>
            <SeccionShow
              activo={false}
              propiedades={{
                icono: "icecream",
                titulo: "Postres",
                cantidad: productos[2],
                mostrar: "grid",
              }}
            >
              {postres}
            </SeccionShow>
          </SeccionShow>
          <SeccionShow
            activo={true}
            propiedades={{
              icono: "orders",
              titulo: "Detalle de la orden",
              cantidad: cart.length,
              mostrar: "flex",
              lado: "right",
              pie: [
                true,
                {
                  left: `Cantidad: ${cart.reduce((total, item) => total + item.quantity, 0)}`,
                  right: `Total: $${cart
                    .reduce(
                      (total, item) => total + item.quantity * item.precio,
                      0,
                    )
                    .toFixed(2)}`,
                },
              ],
            }}
          >
            {cart.map((item) =>
              cartItem(
                item.quantity,
                item.nombre,
                item.precio,
                () => addToCart(item),
                () => removeFromCart(item.id),
              ),
            )}
          </SeccionShow>
        </Seccion>
        <div className="form-footer">
          <div className="form-footer-left">
            <button
              className="accion seccion red"
              type="button"
              onClick={() => {
                activarBoton(true);
                setNuevaOrden(false);
                setSearchParams({});
              }}
            >
              <span className="icon material-symbols-rounded">cancel</span>
              Cancelar
            </button>
            <button
              className="accion seccion blue"
              type="button"
              onClick={clearCart}
              disabled={cart.length === 0}
            >
              <span className="icon material-symbols-rounded">delete</span>
            </button>
          </div>
          <div className="form-footer-right">
            <button className="accion seccion blue" type="submit" disabled={cart.length === 0}>
              <span className="icon material-symbols-rounded">
                check_circle
              </span>
              Enviar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
