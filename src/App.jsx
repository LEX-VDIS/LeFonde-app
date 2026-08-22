import { useEffect, useState, Fragment } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import Servicio from "./Servicio.jsx";
import Ordenes from "./ordenes/Ordenes.jsx";
import Orden from "./ordenes/Orden.jsx";
import Mesas from "./mesas/Mesas.jsx";
import Productos from "./productos/Productos.jsx";
import Categoria from "./productos/Categoria.jsx";
import { parseJwt, logout } from "./sesion.js";

let usuario = {};
let logueado = false;

const navegacion = [
  [
    ["Servicio", "servicio"],
    [
      ["Ordenes", "ordenes", "room_service"],
      ["Mesas", "mesas", "table_restaurant"],
    ],
  ],
  [
    ["Productos", "productos"],
    [
      ["Bebidas", "bebidas", "sports_bar"],
      ["Alimentos", "alimentos", "dinner_dining"],
      ["Complementos", "complementos", "kebab_dining"],
      ["Postres", "postres", "icecream"],
    ],
  ],
  [
    ["Administración", "administracion"],
    [
      ["Reportes", "reportes", "query_stats"],
      ["Personal", "personal", "person"],
    ],
  ],
];

try {
  parseJwt(localStorage.getItem("tokenme")).exp * 1000 > Date.now() &&
    (logueado = true);
  usuario = parseJwt(localStorage.getItem("tokenme")).usuario[0];
} catch (error) {}

function App() {
  const [log, setLog] = useState(logueado); // estado para comprobar el logueo
  const [nombre, setNombre] = useState(usuario.nombre + " " + usuario.apellido);
  const [OpenLP, setOpenLP] = useState(false);
  const toggleIsOpenLP = () => {
    setOpenLP((on) => !on);
  }; // estado para abrir y cerrar el panel izquierdo
  const [OpenRP, setOpenRP] = useState(false);
  const toggleIsOpenRP = () => {
    setOpenRP((on) => !on);
  }; // estado para abrir y cerrar el panel derecho

  useEffect(() => {
    setNombre(usuario.nombre + " " + usuario.apellido);
  }, [usuario.nombre, usuario.apellido]); // actualiza el nombre del usuario al iniciar sesión

  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".panelButton") &&
      !e.target.closest(".left-panel") &&
      !e.target.closest(".right-panel")
    ) {
      setOpenLP(false);
      setOpenRP(false);
    }
  }); // evento para cerrar los paneles laterales al hacer click fuera de ellos

  return (
    <>
      <BrowserRouter>
        <div className="app-frame">
          {OpenLP && (
            <nav style={{}} className={"left-panel " + (OpenLP ? "open" : "")}>
              <div>
                <div className="panel-header">
                  <div className="left">
                    <NavLink
                      to={{ pathname: "/", search: "?" }}
                      className={({ isActive }) =>
                        isActive ? "home active" : "home"
                      }
                    >
                      <span style={{ fontSize: "1.5em" }}>LeFondé</span>
                    </NavLink>
                  </div>
                </div>
                <div className="panel-body">
                  {navegacion.map((elemento, indice) => {
                    return (
                      <Fragment key={"grupo_" + indice}>
                        <NavLink
                          key={elemento[1]}
                          to={{
                            pathname: "/" + elemento[0][1],
                            search: "?",
                          }}
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          <span key={"h2_" + indice}>{elemento[0][0]}</span>

                          <div key={"div_" + elemento[0][1]}>
                            {elemento[1].map((elementoa, indicea) => {
                              return (
                                <NavLink
                                  key={elementoa[1]}
                                  to={{
                                    pathname:
                                      "/" + elemento[0][1] + "/" + elementoa[1],
                                    search: "?",
                                  }}
                                  className={({ isActive }) =>
                                    isActive ? "active" : ""
                                  }
                                >
                                  <span className="icon material-symbols-rounded">
                                    {elementoa[2]}
                                  </span>
                                  <span key={"h3_" + elementoa[1]}>
                                    {elementoa[0]}
                                  </span>
                                </NavLink>
                              );
                            })}
                          </div>
                        </NavLink>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            </nav>
          )}
          <div className="app-header">
            {log && (
              <section>
                <button
                  id="menu"
                  className={OpenLP ? "active panelButton" : "panelButton"}
                  onClick={toggleIsOpenLP}
                >
                  <span className="icon material-symbols-rounded">
                    {OpenLP ? "menu_open" : "menu"}
                  </span>
                </button>
              </section>
            )}
            {!log && <span className="titulo">LeFondé</span>}
            {log && (
              <section>
                <button
                  id="user"
                  className={OpenRP ? " active panelButton" : "panelButton"}
                  onClick={toggleIsOpenRP}
                >
                  <span className="icon material-symbols-rounded">
                    settings
                  </span>
                </button>
              </section>
            )}
          </div>
          {OpenRP && (
            <nav className={"right-panel " + (OpenRP ? "open" : "")}>
              <div>
                <div className="panel-header">
                  <div className="right">
                    <span className="title">{nombre}</span>
                  </div>
                </div>
                <div className="panel-body">
                  <div className="group">
                    <button
                      onClick={() => {
                        setLog(false);
                        localStorage.removeItem("tokenme");
                        setOpenLP(false);
                        setOpenRP(false);
                      }}
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          )}
        </div>

        {!log ? (
          <Login setLog={setLog} />
        ) : (
          <Routes>
            <Route
              key="root"
              path="/"
              element={
                <>
                  <div className="app-container">
                    <Home />
                  </div>
                </>
              }
            />
            <Route
              key="page/"
              path="/servicio/"
              element={
                <>
                  <div className="app-container">
                    <Servicio />
                  </div>
                </>
              }
            />
            <Route
              key="page/subpage"
              path="/servicio/ordenes"
              element={
                <>
                  <div className="app-container">
                    <Ordenes />
                  </div>
                </>
              }
            />
            <Route
              key="page/subpage/item"
              path="/servicio/ordenes/:id"
              element={
                <>
                  <div className="app-container">
                    <Orden />
                  </div>
                </>
              }
            />
            <Route
              key="page/subpage"
              path="/servicio/mesas"
              element={
                <>
                  <div className="app-container">
                    <Mesas />
                  </div>
                </>
              }
            />
            <Route
              key="page/"
              path="/productos/"
              element={
                <>
                  <div className="app-container">
                    <Productos />
                  </div>
                </>
              }
            />
            <Route
              key="page/subpage"
              path="/productos/:categoria"
              element={
                <>
                  <div className="app-container">
                    <Categoria />
                  </div>
                </>
              }
            />
            <Route
              key="page"
              path="/:page"
              element={
                <>
                  <div className="app-container"></div>
                </>
              }
            />
            <Route
              key="subpage"
              path="/:page/:subpage"
              element={
                <>
                  <div className="app-container"></div>
                </>
              }
            />
            <Route
              key="else"
              path="*"
              element={
                <>
                  <div className="app-container">
                    <Home />
                  </div>
                </>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
