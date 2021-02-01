const axios = require("axios").default;

const getService = async (uri) => {
  try {
    return await axios.get(`https://api.mercadolibre.com/${uri}`);
  } catch (error) {
    return error;
  }
};

class MeliService {
  async getSearchResult(q) {
    return await getService(`sites/MLA/search?q=${q}&limit=4`);
  }
  async getProduct(id) {
    return await getService(`items/${id}`);
  }
  async getProductDescription(id) {
    return await getService(`items/${id}/description`);
  }

  async getCategory(idCategory) {
    const response = await getService(`categories/${idCategory}`);
    const categories = response
      ? response.data.path_from_root.map((c) => c.name)
      : [];

    return categories;
  }
}

const meliService = new MeliService();
module.exports = meliService;
