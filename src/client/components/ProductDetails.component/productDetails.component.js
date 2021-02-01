import React from "react";
import "./productDetails.styles.scss";
import { productService } from "../../services/product.service";
import { currency } from "../../utils/formatFilters.utils";
import BreadcrumbComponent from "../Breadcrumb.component/breadcrumb.component";
import NotFoundComponent from "../NotFoundComponent/notFound.component";
import LoadingComponent from "../LoadingComponet/loading.component";

export default class ProductDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null, loading: false };
  }

  get product() {
    return this.state.product;
  }

  componentDidMount() {
    this.setState({ loading: true });
    const pushError = {
      goError: this.props.history.push,
      path: `/items/${this.props.match.params.id}`,
    };
    productService
      .getProductDetails(this.props.match.params.id, pushError)
      .then((response) => {
        if (response) {
          if (!response.error) {
            this.setState({ product: response.data.item });
          }
        }
        this.setState({ loading: false });
      });
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="product-details">
        {this.state.loading ? (
          <LoadingComponent />
        ) : (
          <div className="product-details__section">
            <div className="product-details__section__breadcrum">
              <BreadcrumbComponent
                categories={this.product ? this.product.categories : []}
              />
            </div>
            {this.product ? (
              <div className="product-details__section__main">
                <div className="product-details__section__container">
                  <div className="product-details__section__container__img-container">
                    <img
                      src={this.product.picture}
                      className="product-details__section__container__img"
                      alt={this.product.title}
                    />
                  </div>
                  <div className="product-details__section__container__details-container">
                    <div className="product-details__section__container__info">
                      {`${
                        this.product.condition === "new" ? "Nuevo" : "Usado"
                      } - ${this.product.sold_quantity} vendidos`}
                    </div>
                    <div className="product-details__section__container__title">
                      {this.product.title}
                    </div>
                    <div className="product-details__section__container__price">
                      {currency(this.product.price)}
                      <sup className="product-details__section__sup">
                        {this.product.price.decimals
                          ? this.product.price.decimals.slice(0, 2)
                          : "00"}
                      </sup>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="product-details__section__container__button"
                      >
                        <span>Comprar</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="product-details__section__description">
                  Descripción del producto
                  <div className="product-details__section__description-text">
                    {this.product.description}
                  </div>
                </div>
              </div>
            ) : (
              <NotFoundComponent
                msg={{
                  title: "El producto solicitado no se encuentra.",
                  options: [
                    "Verificá que la dirección url no sea antigua.",
                    "Intentá realizar una nueva busqueda.",
                  ],
                }}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
