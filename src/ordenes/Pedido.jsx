import { createContext, useState } from "react";

export const PedidoContext = createContext();

export function PedidoProvider({ children }) {
  const [pedido, setPedido] = useState([]);

  const addToPedido = (product) => {
    setPedido([...pedido, product]);
  };
  const clearPedido = () => {
    setPedido([]);
  };

  return (
    <PedidoContext.Provider value={{ pedido, addToPedido, clearPedido }}>
      {children}
    </PedidoContext.Provider>
  );
}
