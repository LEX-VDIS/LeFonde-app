import { useState } from "react";
import "./Login.css";

export default function Login({ setLog }) {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const evitarError = (aceptar) => {
    aceptar.preventDefault();

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

      fetch("http://192.168.1.50:55555/login", fetchOptions)
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
    <section>
      <form className="login" onSubmit={evitarError}>
        <h1>LeLogin</h1>
        <label>Le Usuario</label>
        <input
          type="text"
          value={name}
          onChange={(teclazo) => setName(teclazo.target.value)}
        />
        <label>Le Contraseña</label>
        <input
          type="password"
          value={pass}
          onChange={(teclazo) => setPass(teclazo.target.value)}
        />
        <button>Iniciar Sesión</button>
        {error && <h2>Ingresa el usuario y la contraseña</h2>}
      </form>
    </section>
  );
}
