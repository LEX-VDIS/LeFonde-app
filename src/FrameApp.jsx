import { useState } from "react";
import "./app.css";

export default function Frame() {
  const [OpenLP, setOpenLP] = useState(false);
  const toggleIsOpenLP = () => {setOpenLP((on) => !on)};
  const [OpenRP, setOpenRP] = useState(false);
  const toggleIsOpenRP = () => {setOpenRP((on) => !on)};

  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".panelButton") &&
      !e.target.closest(".left-panel") &&
      !e.target.closest(".right-panel")
    ) {
      setOpenLP(false);
      setOpenRP(false);
    }
  }); //Se cierran los paneles laterales al hacer click fuera de ellos



  return (
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
            <div className="panel-body">
            </div>
          </div>
        </nav>
      )}

      <div>

        <button
          id="menu"
          className={OpenLP ? "active panelButton" : "panelButton"}
          onClick={toggleIsOpenLP}
        >
          <span className="icon material-symbols-rounded">
            {OpenLP ? "menu_open" : "menu"}
          </span>
        </button>

        <div key="header" id="header">
          <nav key="navbar" className="navbar">
            <div key="breadcumb" className="breadcumb"></div>
          </nav>
        </div>

        <button
          id="user"
          className={OpenRP ? " active panelButton" : "panelButton"}
          onClick={toggleIsOpenRP}
        >
          <span className="icon material-symbols-rounded">settings</span>
        </button>

      </div>

      {OpenRP && (
        <nav className={"right-panel " + (OpenRP ? "open" : "")}>
          <div>
            <div style={{ height: "52px" }}></div>
            <hr className="sp-hr" />
            <div className="body"></div>
          </div>
        </nav>
      )}
      
    </div>
  );
}