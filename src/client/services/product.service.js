import axios from "axios";

const getService = async (uri, error) => {
  try {
    return await axios.get(`http://localhost:8080/api/${uri}`);
  } catch (e) {
    console.log(e);
    error.goError("/error", { retryPath: error.path });
    return null;
  }
};

class ProductService {
  async searchProduct(q, error) {
    return await getService(`items?q=${q}`, error);
  }

  async getProductDetails(id, error) {
    return await getService(`items/${id}`, error);
  }
}

export  const productService = new ProductService();
