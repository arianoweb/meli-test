import React from "react";
import renderer from "react-test-renderer";
import ErrorComponent from "../error.component";

describe("ErrorComponent", () => {
  it("should match snapshot - base", () => {
    const component = renderer
      .create(
        <ErrorComponent  />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
