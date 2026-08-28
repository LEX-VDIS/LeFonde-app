import { useState, useEffect } from "react";
import "./Personal.css";
import PersonalCard from "./PersonalCard.jsx";
import SeccionShow from "../../../app-components/SeccionShow.jsx";
import { io } from "socket.io-client";
const socket = io(
  `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}`,
);

export default function Personal({ activarBoton, propsBoton }) {
  activarBoton(false);
  useEffect(() => {
    activarBoton(true);
    propsBoton({
      texto: "Nuevo",
      icono: "add_circle",
      click: () => {},
    });
  }, []); //Efecto para activar el boton de agregar y establecer sus propiedades cuando se monta el componente
  
  const [usuarios, setUsuarios] = useState([]);
  const [administradores, setAdministradores] = useState([]);
  const [personal, setPersonal] = useState([]);
  const [updatePersonal, setUpdatePersonal] = useState(false);

  useEffect(() => {
    socket.on("mensaje", (data) => {
      console.log("Mensaje del servidor:", data);
      setUpdatePersonal((prev) => !prev);
    });
  }, []); //Efecto para escuchar los mensajes del servidor y actualizar la lista de ordenes cuando se recibe un mensaje

  useEffect(() => {
    const fetchOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/usuarios`;

    fetch(fetchURL, fetchOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          setPersonal((prev) => {
            const newPersonal = [...prev];
            newPersonal[0] = result.personal[0].length;
            return newPersonal;
          });
          const personal1 = Array.from(result.personal[0], (persona, index) => (
            <PersonalCard
              key={index}
              propiedades={{
                numero: persona.idusuario,
                nombre: persona.nombre,
              }}
            />
          ));
          setPersonal((prev) => {
            const newPersonal = [...prev];
            newPersonal[1] = result.personal[1].length;
            return newPersonal;
          });
          const personal2 = Array.from(result.personal[1], (persona, index) => (
            <PersonalCard
              key={index}
              propiedades={{
                numero: persona.idusuario,
                nombre: `${persona.nombre} ${persona.apellido}`,
              }}
            />
          ));
          setAdministradores(personal1);
          setUsuarios(personal2);
        } else {
          alert(result.mensaje);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos del personal:", error);
      });
  }, [updatePersonal]); //Efecto para obtener la lista de ordenes cuando se monta el componente y cuando se actualiza la lista de ordenes

  console.log("personal", personal);
  return (
    <div className="app-body">
      <SeccionShow
        activo={true}
        propiedades={{
          icono: "manage_accounts",
          titulo: "Administradores",
          cantidad: personal[0],
          mostrar: "grid",
        }}
      >
        {administradores}
      </SeccionShow>
      <SeccionShow
        activo={true}
        propiedades={{
          icono: "person",
          titulo: "Usuarios",
          cantidad: personal[1],
          mostrar: "grid",
        }}
      >
        {usuarios}
      </SeccionShow>
    </div>
  );
}
