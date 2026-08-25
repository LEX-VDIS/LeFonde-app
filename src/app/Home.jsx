import { useNavigate } from "react-router-dom";
import "./Home.css";
import SeccionLink from "../app-components/SeccionLink.jsx";

const navegacion = [
  [
    ["Servicio", "servicio", "flatware"],
    [
      ["Ordenes", "ordenes", "room_service"],
      ["Mesas", "mesas", "table_restaurant"],
    ],
  ],
  [
    ["Productos", "productos", "menu_book_2"],
    [
      ["Bebidas", "bebidas", "sports_bar"],
      ["Alimentos", "alimentos", "dinner_dining"],
      ["Complementos", "complementos", "kebab_dining"],
      ["Postres", "postres", "icecream"],
    ],
  ],
  [
    ["Administración", "administracion", "briefcase_meal"],
    [
      ["Reportes", "reportes", "query_stats"],
      ["Personal", "personal", "person"],
    ],
  ],
];

export default function Home({ activarBoton }) {
  activarBoton(false);
  const navigate = useNavigate();
  return (
    <div className="app-body">
      {navegacion.map((seccion, index) => (
        <SeccionLink
          key={index}
          propiedades={{
            icono: seccion[0][2],
            titulo: seccion[0][0],
            ruta: `/${seccion[0][1]}`,
            mostrar: "flex"
          }}
        >
          <div className="form-body">
            {seccion[1].map((item, index) => (
              <div
                key={index}
                className="form-body-item"
                onClick={() => navigate(`/${seccion[0][1]}/${item[1]}`)}
              >
                <span className="icon material-symbols-rounded">{item[2]}</span>
                <span>{item[0]}</span>
              </div>
            ))}
          </div>
        </SeccionLink>
      ))}
    </div>
  );
}
