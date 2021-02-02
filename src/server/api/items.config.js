const router = require("express").Router();
const meliService = require("../services/meli.service");
const author = require("../authorConfig");
const mapper = require("./mapper");
const groupBy = require("lodash/groupBy");

const getSearch = async (req) => {
  try {
    return await meliService.getSearchResult(req.query.q);
  } catch (e) {
    return e;
  }
};

const getCurrentProduct = async (req) => {
  const productPromise = meliService.getProduct(req.params.id);
  const productDescriptionPromise = meliService.getProductDescription(
    req.params.id
  );

  const [product, description] = await Promise.all([
    productPromise,
    productDescriptionPromise,
  ]);
  if (product && product.data && description) {
    const categories = await meliService.getCategory(product.data.category_id);
    const response = {
      ...product,
      data: {
        ...product.data,
        description: description.data.plain_text,
        categories,
      },
    };

    return response;
  } else {
    return { ...product, data: null, status: 500 };
  }
};

const api = async (req, res, next) => {
  const actionGet = req.params && req.params.id ? getCurrentProduct : getSearch;
  const result = await actionGet(req);

  if (result.data) {
    res.data = result.data;
    next();
  }
};

const responseMapper = async (req, res, next) => {
  const setMapper =
    req.params && req.params.id
      ? mapper.itemDescriptionOutputMapping
      : mapper.itemsOutputMapping;

  const mapping = res.data
    ? setMapper(res)
    : {
        status: 200,
        error: "not found item",
      };

  res.json(mapping);
};

router.get("/:id?", author, api, responseMapper);

module.exports = router;
