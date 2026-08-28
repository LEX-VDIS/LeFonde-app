import { useNavigate, useState } from "react";
import "./Login.css";
import { parseJwt } from "./sesion.js";
import { set } from "react-hook-form";

export default function Login({ setLog }) {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const evitarError = (aceptar) => {
    aceptar.preventDefault();
    location.reload();
    if (name === "" || pass === "") {
      setError(true);
      setLog(false);
    } else {
      setError(false);

      const data = { user: name, pass: pass };

      const fetchOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/login`;
      //const fetchURL = `http://10.10.10.99:55555/login`;

      fetch(fetchURL, fetchOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.token) {
            localStorage.setItem("tokenme", result.token);
            setLog(true);
          } else {
            alert(result.mensaje);
            setLog(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

  };

  return (
    <section className="app-container">
      <form className="login" onSubmit={evitarError}>
        <h1>Iniciar Sesión</h1>
        <section className="lab_txt">
          <label htmlFor="user">Usuario</label>
          <input
            id="user"
            type="text"
            value={name}
            onChange={(teclazo) => setName(teclazo.target.value)}
          />
          <label htmlFor="pass">Contraseña</label>
          <input
            id="pass"
            type="password"
            value={pass}
            onChange={(teclazo) => setPass(teclazo.target.value)}
          />
          <button>Iniciar Sesión</button>
        </section>

        {error && <h3>Ingresa el usuario y la contraseña</h3>}
      </form>
    </section>
  );
}
