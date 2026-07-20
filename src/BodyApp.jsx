import { useState } from "react";
import "./BodyApp.css";
import Ejemplo from "./Ejemplo";

const cantidad = 25;

export default function Body() {
  return (
    <div className="app-body">

    {Array.from({ length: cantidad }, (_, index) => (
      <Ejemplo key={index} />
    ))}

    </div>
  );
}