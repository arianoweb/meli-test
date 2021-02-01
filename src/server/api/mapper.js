const meliService = require("../services/meli.service");

const formatItem = (item) => {
  return {
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: +item.price.toFixed(0),
      decimals: (item.price % 1).toString().split(".")[1] || null,
    },
    picture: item.thumbnail,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
  };
};

const getMaxOfResult = (categories) => {
  return [
    categories.sort((a, b) =>
      a.results > b.results ? 1 : a.results < b.results ? -1 : 0
    )[categories.length - 1].name,
  ];
};

const setCategories = (data) => {
  const filters = data.filters.find((f) => f.id === "category");
  const categories =
    filters || data.available_filters.find((f) => f.id === "category");
  return categories
    ? data.filters.length
      ? categories.values[0].path_from_root.map((c) => c.name)
      : getMaxOfResult(categories.values)
    : [];
};

class Mapper {
  itemsOutputMapping(res) {
    return {
      author: res.author,
      categories: setCategories(res.data),
      items: res.data.results.map((item) => ({
        ...formatItem(item),
        city: item.address.state_name,
      })),
    };
  }

  itemDescriptionOutputMapping(res) {
    return {
      author: res.author,
      item: {
        ...formatItem(res.data),
        sold_quantity: res.data.sold_quantity,
        description: res.data.description,
        picture: res.data.pictures[0].url,
        categories: res.data.categories,
      },
    };
  }
}
const mapper = new Mapper();
module.exports = mapper;
