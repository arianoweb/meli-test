import React from "react";
import renderer from "react-test-renderer";
import ProductDetailsComponent from "../productDetails.component";

describe("ProductDetailsComponent", () => {
  it("should match snapshot - base", () => {
    window.scrollTo = jest.fn()
    const props = {
      history:{
        push:()=>{}
      },
      match:{params:{id:"MLA454446"}}
    }
    const component = renderer
      .create(
        <ProductDetailsComponent {...props}  />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
