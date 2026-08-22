import { useState, useEffect } from "react";
import "./ProductoCheck.css";
import { useCart } from "./useCart.js";

export default function ProductoCheck({ propiedades }) {
  const [seleccionado, setSeleccionado] = useState(false);
  const { addToCart, removeFromCart, clearCart, cart } = useCart();

  const toggleCheck = (activar) => {
    setSeleccionado(activar.target.checked);

    const checkedProductInCart = (product) => {
      return cart.some((item) => item.id === product.id);
    };

    checkedProductInCart(propiedades)
      ? removeFromCart(propiedades.id)
      : addToCart(propiedades);
  };

  function OpcionesMultiples() {
    const [valores, setValores] = useState({
      notificaciones: false,
      promociones: true,
    });
  }

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setValores((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <label htmlFor={propiedades.id}>
      <div className="check-card">
        <span className="check-card-header">
          <span>
            <strong>{propiedades.nombre}</strong>
            <strong>${propiedades.precio}</strong>
          </span>
          <input
            id={propiedades.id}
            name={propiedades.id}
            type="checkbox"
            checked={seleccionado}
            onChange={toggleCheck}
          />
        </span>
        <span>{propiedades.detalle}</span>
      </div>
    </label>
  );
}
