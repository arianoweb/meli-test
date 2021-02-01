import React from "react";
import renderer from "react-test-renderer";
import ResultListComponent from "../resultList.component";

describe("ResultListComponent", () => {
  it("should match snapshot - base", () => {
    const location = {
      search:"test"
    }
    const parentProps = {
      data:null
    }
    const component = renderer
      .create(
      <ResultListComponent parentProps={parentProps} location={location} />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
