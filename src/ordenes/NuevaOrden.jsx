import { useState, useEffect } from "react";
import Seccion from "../app-components/Seccion.jsx";

const detenerSubmit = (evento) => {
  evento.preventDefault();
};

export default function NuevaOrden() {
  const [productos, setProductos] = useState([]);
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
          setProductos(result);
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
      <form onSubmit={detenerSubmit}>
        <header>
          <span>
            <label htmlFor="orden">Órden</label>
            <input type="text" id="orden" name="orden" />
          </span>
          <span>
            <label htmlFor="mesa">Mesa</label>
            <select id="mesa"></select>
          </span>
        </header>
        <main>
          <Seccion
            activo={true}
            propiedades={{
              icono: "dinner_dining",
              titulo: "Alimentos",
              contenido: productos[0],
            }}
          />
          <Seccion
            activo={false}
            propiedades={{
              icono: "sports_bar",
              titulo: "Bebidas",
              contenido: productos[1],
            }}
          />
          <Seccion
            activo={false}
            propiedades={{
              icono: "icecream",
              titulo: "Postres",
              contenido: productos[2],
            }}
          />
        </main>
        <aside></aside>
      </form>
    </div>
  );
}
