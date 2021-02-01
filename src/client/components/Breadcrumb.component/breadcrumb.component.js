import React from "react";
import "./breadcrumb.styles.scss";

const BreadcrumbComponent = (props) => {
  const categories = props.categories;
  const isLastItem = (index) => {
    return categories.length - 1 > index;
  };
  return (
    <div className="breadcrumb">
      {categories &&
        categories.map((item, index) => (
          <div
            key={index}
            className={`breadcrumb__category ${!isLastItem(index) &&
              "breadcrumb__category__last"}`}
          >
            {item}
            {isLastItem(index) && (
              <span className="breadcrumb__category__chevron">
                <i className="fa fa-angle-right"></i>
              </span>
            )}
          </div>
        ))}
    </div>
  );
};
export default BreadcrumbComponent;
