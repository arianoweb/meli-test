import React from "react";
import renderer from "react-test-renderer";
import LoadingComponent from "../loading.component";

describe("LoadingComponent", () => {
  it("should match snapshot - base", () => {
    const component = renderer
      .create(
        <LoadingComponent  />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
