import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login.jsx";
import Body from "./BodyApp.jsx";
import { parseJwt, logout } from "./sesion.js";

let usuario = {};
let logueado = false;

try {
  parseJwt(localStorage.getItem("tokenme")).exp * 1000 > Date.now() &&
    (logueado = true);
  usuario = parseJwt(localStorage.getItem("tokenme")).usuario[0];
} catch (error) {}

function App() {
  const [log, setLog] = useState(logueado); // estado para comprobar el logueo
  const [nombre, setNombre] = useState();
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
  }, []);

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
      <div className="app-frame">
        {OpenLP && (
          <nav style={{}} className={"left-panel " + (OpenLP ? "open" : "")}>
            <div>
              <div className="panel-header">
                <div className="left">
                  <span className="title" style={{ fontSize: "1.2em" }}>
                    LeFondé
                  </span>
                </div>
                <div>
                  <hr className="sp-hr" />
                </div>
              </div>
              <div className="panel-body"></div>
            </div>
          </nav>
        )}
        <div className="app-header">
          {log && (
            <button
              id="menu"
              className={OpenLP ? "active panelButton" : "panelButton"}
              onClick={toggleIsOpenLP}
            >
              <span className="icon material-symbols-rounded">
                {OpenLP ? "menu_open" : "menu"}
              </span>
            </button>
          )}
          {!log && <span className="titulo">LeFondé</span>}
          {log && (
            <button
              id="user"
              className={OpenRP ? " active panelButton" : "panelButton"}
              onClick={toggleIsOpenRP}
            >
              <span className="icon material-symbols-rounded">settings</span>
            </button>
          )}
        </div>
        {OpenRP && (
          <nav className={"right-panel " + (OpenRP ? "open" : "")}>
            <div>
              <div className="panel-header">
                <div className="right">
                  {" "}
                  <span className="title" style={{ fontSize: "1.2em" }}>
                    {nombre}
                  </span>
                </div>
                <div>
                  <hr className="sp-hr" />
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

      {!log ? <Login setLog={setLog} /> : <Body />}
    </>
  );
}

export default App;
