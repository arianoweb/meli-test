import React from "react";
import renderer from "react-test-renderer";
import SearchBoxComponent from "../searchBox.component";

describe("SearchBoxComponent", () => {
  it("should match snapshot - base", () => {
    const props = {
      location:{
        search:"test"
      }
    }
    const component = renderer
      .create(
        <SearchBoxComponent {...props}/>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
