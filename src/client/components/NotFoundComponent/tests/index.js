import React from "react";
import renderer from "react-test-renderer";
import NotFoundComponent from "../notFound.component";

describe("NotFoundComponent", () => {
  it("should match snapshot - base", () => {
    const component = renderer
      .create(
        <NotFoundComponent  />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
