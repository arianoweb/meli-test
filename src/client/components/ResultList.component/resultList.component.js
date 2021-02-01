import React from "react";
import { currency } from "../../utils/formatFilters.utils";
import "./resultList.styles.scss";
import freeShipping from "../../assets/ic_shipping.png";
import { productService } from "../../services/product.service";
import BreadcrumbComponent from "../Breadcrumb.component/breadcrumb.component";
import NotFoundComponent from "../NotFoundComponent/notFound.component";
import LoadingComponent from "../LoadingComponet/loading.component";
import queryString from "query-string";

export default class ResultListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { result: null, loading:false };
    this.openItem = this.openItem.bind(this);
  }

  onSearch() {
    const value = queryString.parse(this.props.location.search);
    const keyWord = value.search || ""
    if (keyWord) {
      this.setState({ loading: true });
      const pushError = {
        goError: this.props.history.push,
        path: `/?search=${keyWord}`,
      };
      productService.searchProduct(keyWord, pushError).then((resp) => {
        if (resp) {
          this.props.parentProps.data = resp.data;
          this.setState({ result: resp.data });
        }
        this.setState({ loading: false });
      });
    }
  }

    /**El componente padre almacena una prop con el resultado actua de la ultma busqueda
     * asi al sesmontar el componente esta data no se pierde y no es necesario hacer un
     * nuevo request al ir hacia atras desde el deatlle de un producto seleccionado, si no 
     * hay data se la ultima busqueda se procede a hacer un nuevo request en onSearch
     * NOTA: Ver comentario en onSearch 
     */
  componentDidMount() {
    if (!this.props.parentProps.data) {
      this.onSearch();
    } else {
      this.setState({ result: this.props.parentProps.data });
    }
  }

  openItem(id) {
    this.props.history.push(`/items/${id}`);
  }

  render() {
    return (
      <section className="result-list__main">
        {this.state.result &&
          (this.state.result.items.length ? (
            <div className="result-list">
              <BreadcrumbComponent categories={this.state.result.categories} />

              {this.state.result.items.map((item, i) => (
                <div key={i} onClick={() => this.openItem(item.id)}>
                  <div className="result-list__item">
                    <div className="result-list__img-box">
                      <img
                        src={item.picture}
                        className="result-list__img-box__img"
                        alt={item.title}
                      />
                    </div>
                    <div className="result-list__description-box">
                      <div className="result-list__description-box__price">
                        {currency(item.price)}
                        <sup className="result-list__sup">
                          {item.price.decimals
                            ? item.price.decimals.slice(0, 2)
                            : "00"}
                        </sup>
                        {item.free_shipping && (
                          <span className="result-list__description-box__free-shipping">
                            <img src={freeShipping} alt={item.title} />
                          </span>
                        )}
                      </div>
                      <div className="result-list__description-box__title">
                        {item.title}
                      </div>
                      <div className="result-list__description-box__city-box-small">
                        Capital Federal
                      </div>
                    </div>
                    <div className="result-list__city-box">Capital Federal</div>
                  </div>
                  {this.state.result.items.length - 1 > i && (
                    <div className="result-list__line"></div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <NotFoundComponent />
          ))}
           {this.state.loading && <LoadingComponent />}
      </section>
    );
  }
}
