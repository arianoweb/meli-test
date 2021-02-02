import React from "react";
import logo from "../../assets/Logo_ML.png";
import search from "../../assets/ic_Search.png";
import queryString from "query-string";
import "./searchBox.styles.scss";

export default class SearchBoxComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    const value = queryString.parse(this.props.location.search);
    this.setState({searchInput:value.search || ""})
  }

  handleChange(event) {
    /**Setea el state de  searchInput desde inChange del input*/
    this.setState({ searchInput: event.target.value });
  }

  onSubmit() {
    const form = document.getElementById("search");
    form.submit();
  }

  render() {
    const value = this.state.searchInput;
    const onChange = this.handleChange;
    const onSubmit = this.onSubmit;

    return (
      <section>
        <div className="search__box elevation-1">
          <div className="search__header">
            <div className="search__logo">
              <img
                src={logo || ""}
                className="search__logo__img"
                alt="Mercado Libre"
              />
            </div>
            <div className="search__input">
              <form id="search" action="/items">
                <input
                  type="text"
                  className="search__input__text"
                  name="search"
                  placeholder="Nunca dejes de buscar"
                  value={value}
                  onChange={onChange}
                />
              </form>
            </div>
            <div className="search__button-box">
              <button
                type="button"
                onClick={onSubmit}
                className="search__button"
              >
                <img src={search || ""} alt="" />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
