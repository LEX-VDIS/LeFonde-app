import "./Boton.css";

export default function Boton({ icono, texto, click }) {
  click = click || (() => {});
  return (
    <button type="button" className="boton-accion blue" onClick={click}>
      <span className="icon material-symbols-rounded">{icono}</span>
      {texto}
    </button>
  );
}
