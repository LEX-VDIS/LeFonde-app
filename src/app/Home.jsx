import { useNavigate } from "react-router-dom";
import "./Home.css";

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

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="app-body">
      {navegacion.map((seccion, index) => (
        <div key={index} className="app-section">
          <header
            className="form-header title-link"
            onClick={() => navigate(`/${seccion[0][1]}`)}
          >
            <span className="form-header-span">
              <span className="form-header-title">
                <span className="icon material-symbols-rounded">
                  {seccion[0][2]}
                </span>
                <span>{seccion[0][0]}</span>
              </span>
            </span>
            <span className="section_action">
              <span className="icon right material-symbols-rounded">
                expand_circle_right
              </span>
            </span>
          </header>
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
        </div>
      ))}
    </div>
  );
}
