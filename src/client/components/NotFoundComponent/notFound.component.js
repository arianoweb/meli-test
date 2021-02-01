import React from "react";
import "./notFound.styles.scss";

const NotFoundComponent = ({ msg }) => {
  const message = msg;
  return (
    <section className="not-found">
      <div className="not-found__main">
        <div className="not-found__msj-container">
          <div className="not-found__msj-icon">
            <i className="fa fa-search-minus" aria-hidden="true"></i>
          </div>
          <div className="not-found__msj-text">
            <h2>
              {message
                ? message.title
                : "No hay publicaciones que coincidan con tu búsqueda."}
            </h2>
            {message ? (
              message.options.map((text, i) => <p key={i}>{text}</p>)
            ) : (
              <div>
                <p>Revisa la ortografía de la palabra.</p>
                <p>Utiliza palabras más genéricas o menos palabras.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundComponent;
