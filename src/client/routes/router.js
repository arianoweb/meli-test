import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchBoxComponent from "../components/SearchBox.component/searchBox.component";
import ResultListComponent from "../components/ResultList.component/resultList.component";
import ProductDetailsComponent from "../components/ProductDetails.component/productDetails.component";
import ErrorComponent from "../components/ErrorComponent/error.component";

export default function RouteConfig() {
  const generalProps = {
    data: null,
  };
  /**
   * Se configura las rutas con sus componentes
   * para tener una mejor viste de los compnentes
   * de primer nivel, al crecer la aplocación esto
   * ayudaria a una mejor visualizacion, ademas
   * se envia una prop unica a todos los componentes
   * permitiendo el seteo de datos entre ellos
   */
  const routes = [
    {
      path: "/",
      component: SearchBoxComponent,
      routes: [
        {
          path: "/items",
          component: ResultListComponent,
          exact: true,
        },
        {
          path: "/items/:id",
          component: ProductDetailsComponent,
        },
        {
          path: "/error",
          component: ErrorComponent,
        },
      ],
    },
  ];

  const SwitchRouter = (props) => (
    <Switch>
      {props.currentRoutes.map((route, i) => (
        <RouteWithSubRoutes
          key={`${i - Math.random()}`}
          {...props}
          {...route}
        />
      ))}
    </Switch>
  );

  const RouteWithSubRoutes = (route) => (
    <Route
      exact={!!route.exact}
      path={route.path}
      render={(props) => {
        return (
          <section>
            <route.component {...props} parentProps={route.parentProps} />
            {route.routes && route.routes.length ? (
              <SwitchRouter
                parentProps={route.parentProps}
                currentRoutes={route.routes}
              />
            ) : (
              ""
            )}
          </section>
        );
      }}
    />
  );

  return (
    <section>
      <Router>
        <SwitchRouter parentProps={generalProps} currentRoutes={routes} />
      </Router>
    </section>
  );
}
