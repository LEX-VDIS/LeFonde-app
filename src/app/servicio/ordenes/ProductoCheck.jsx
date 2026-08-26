import { useState, useEffect } from "react";
import "./ProductoCheck.css";
import { useCart } from "./useCart.js";

export default function ProductoCheck({ propiedades, toggleCheck }) {
  const [seleccionado, setSeleccionado] = useState(toggleCheck);
  const { addToCart, removeFromCart, removeProductFromCart, clearCart, cart } = useCart();

  const handleToggleCheck = (activar) => {
    setSeleccionado(activar.target.checked);

    const checkedProductInCart = (product) => {
      return cart.some((item) => item.id === product.id);
    };

    checkedProductInCart(propiedades)
      ? removeProductFromCart(propiedades.id)
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
            onChange={handleToggleCheck}
          />
        </span>
        <span>{propiedades.detalle}</span>
      </div>
    </label>
  );
}
