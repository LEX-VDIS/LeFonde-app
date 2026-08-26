import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { parseJwt } from "../../sesion.js";
import DetalleCard from "./DetalleCard.jsx";
import "./Ordenes.css";
import "./Orden.css";
import { useForm } from "react-hook-form";
import Seccion from "../../../app-components/Seccion.jsx";
import SeccionShow from "../../../app-components/SeccionShow.jsx";

export default function Orden({ activarBoton }) {
  activarBoton(false);
  const navigate = useNavigate();
  const [ordenid, setOrdenid] = useState(
    window.location.pathname.split("/").pop(),
  );
  const [orden, setOrden] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosAgregados, setProductosAgregados] = useState([]);
  const [productosServidos, setProductosServidos] = useState([]);
  const [mesas_disp, setMesas_disp] = useState([]);
  const [refrescar, setRefrescar] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  console.log("ERROR", errors);

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

  useEffect(() => {
    const fetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idorden: ordenid }),
    };
    const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/orden`;

    fetch(fetchURL, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setOrden(data.orden[0]);
          setProductosAgregados(data.orden[1]);
          setProductosServidos(data.orden[2]);
        } else {
          alert(data.mensaje);
        }
      })
      .catch((error) => console.error("Error fetching productos:", error));
  }, [refrescar]); //Efecto para obtener los productos de la orden y mostrarlos en la orden

  return (
    <div className="app-body">
      <Seccion
        propiedades={{
          icono: ["room_service", "person_apron"],
          titulo: [
            `Orden #${orden[0] && orden[0].idorden} servida en ${orden[0] && orden[0].servicio === 0 ? "Mesa " + orden[0].idmesa : "Mostrador"}`,
            `Atendido por ${parseJwt(localStorage.getItem("tokenme")).usuario[0].nombre}`,
          ],
          mostrar: "flex",
          doble: true,
        }}
      >
        <SeccionShow
          activo={true}
          propiedades={{
            icono: "concierge",
            titulo: "Productos por servir",
            cantidad: productosAgregados.length,
            mostrar: "flex",
            lado: "left",
          }}
        >
          {productosAgregados.map((producto, index) => (
            <DetalleCard
              key={index}
              propiedades={{ ...producto }}
              setRefrescar={setRefrescar}
            />
          ))}
        </SeccionShow>
        <SeccionShow
          activo={true}
          propiedades={{
            icono: "hand_meal",
            titulo: "Productos servidos",
            cantidad: productosServidos.length,
            mostrar: "flex",
            lado: "right",
          }}
        >
          {productosServidos.map((producto, index) => (
            <DetalleCard
              key={index}
              propiedades={{ ...producto }}
              setRefrescar={setRefrescar}
            />
          ))}
        </SeccionShow>
      </Seccion>
      <div className="form-footer">
        <div className="form-footer-left">
          <button
            className="accion seccion blue"
            type="button"
            onClick={() => navigate(-1)}
          >
            <span className="icon material-symbols-rounded">
              arrow_circle_left
            </span>
            Regresar
          </button>
        </div>
        <div className="form-footer-right">
          <button className="accion seccion blue" type="submit">
            <span className="icon material-symbols-rounded">check_circle</span>
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}
