import { useState } from "react";
import "./Ordenes.css";
import Mesa from "./Mesa";

const cantidad = 12;

export default function Ordenes() {
  return (
    <div className="app-body">

      <section className="section">
        <section className="section_head">
          <button>
            <span className="section_title">
              <span className="icon material-symbols-rounded">
                table_restaurant
              </span>
              <span>Mesas</span>
            </span>
            <span className="section_action">
              <span className="icon material-symbols-rounded">
                expand_circle_down
              </span>
            </span>
          </button>
        </section>
        <section className="section_body">
          {Array.from({ length: cantidad }, (_, index) => (
            <Mesa key={index} />
          ))}
        </section>
      </section>

    </div>
  );
}
