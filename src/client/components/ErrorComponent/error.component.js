import React from "react";
import "./error.styles.scss";

export default class ErrorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.goRetryPath = this.goRetryPath.bind(this);
  }

  goRetryPath() {
    console.log(this.props.location.state.retryPath);
    this.props.history.push(this.props.location.state.retryPath);
    window.location.reload();
  }
  render() {
    return (
      <section className="error">
        <div className="error__main">
          <div className="error__msj-container">
            <div className="error__msj-icon">
              <i className="fa fa-plug" aria-hidden="true"></i>
            </div>
            <div className="error__msj-text">
              Parece haber un problema de conexión, puedes volver a intentarlo,
              si continúas con el problema verifica el estado de tu red
            </div>
            <div className="error__msj-button" onClick={this.goRetryPath}>
              Reintentar
            </div>
          </div>
        </div>
      </section>
    );
  }
}
