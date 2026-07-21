import { useState } from 'react'
import './Login.css'

export default function Login({ logueado }) {

    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState(false);

    const evitarError = (aceptar) => {
        aceptar.preventDefault();
        name === "" || pass === "" ? setError(true) : setError(false);
        logueado(true)
    }

    return (
        <section >
            <form className="login" onSubmit={evitarError}>
                <h1>LeLogin</h1>
                <label>Le Usuario</label>
                <input type="text" value={name} onChange={teclazo => setName(teclazo.target.value)} />
                <label>Le Contraseña</label>
                <input type="password" value={pass} onChange={teclazo => setPass(teclazo.target.value)} />
                <button>Iniciar Sesión</button>
                {error && <h2>Ingresa el usuario y la contraseña</h2>}
            </form>
        </section>
    )
}