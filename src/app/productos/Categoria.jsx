import { useState, useEffect, use } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Categoria.css";
import Seccion from "../../app-components/Seccion";

const categorias = [
  { id: 2, param: "bebidas", name: "Bebidas", icon: "sports_bar" },
  { id: 1, param: "alimentos", name: "Alimentos", icon: "dinner_dining" },
  { id: 4, param: "complementos", name: "Complementos", icon: "kebab_dining" },
  { id: 3, param: "postres", name: "Postres", icon: "icecream" },
];

export default function Categoria({ activarBoton, propsBoton }) {
  useEffect(() => {
    activarBoton(false);
    propsBoton({
      texto: "Agregar",
      icono: "add_circle",
      click: () => {},
    });
  }, []);

  const categoria = categorias.find(
    (categoria) => categoria.param === useParams().categoria,
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (!categoria) {
      navigate("/productos");
    }
  }, [categoria]);

  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const fetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoria: categoria.id }),
    };
    const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/productos`;
    fetch(fetchURL, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        setProductos(data.productos);
      })
      .catch((error) => {
        console.error("Error fetching productos:", error);
      });
  }, [categoria]); //Efecto para obtener los productos de la categoria de la base de datos
  console.table(productos);

  return (
    <div className="app-body">
      <Seccion
        propiedades={{ icono: [categoria.icon], titulo: [categoria.name], mostrar: "flex"}}
      >
        {productos.map((producto, index) => (
          <div key={index} className="producto-rowcard">
            <span className="producto-rowcard-span">
              <span className="producto-rowcard-header">
                <span className="producto-nombre">{producto.nombre}</span>
                <span className="producto-precio">${producto.precio}</span>
              </span>
              <span className="producto-rowcard-body">
                <span className="producto-descripcion">
                  {producto.descripcion}
                </span>
              </span>
            </span>
            <button className="accion blue card">
              <span className="material-symbols-rounded">edit</span>
            </button>
          </div>
        ))}
      </Seccion>
    </div>
  );
}
