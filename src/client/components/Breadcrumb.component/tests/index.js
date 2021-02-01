import React from "react";
import renderer from "react-test-renderer";
import BreadcrumbComponent from "../breadcrumb.component";

describe("BreadcrumbComponent", () => {
  it("should match snapshot - base", () => {
    const component = renderer
      .create(
        <BreadcrumbComponent  />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
