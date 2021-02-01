const authorMiddleware = (req, res, next) => {
  res.author = {
    name: 'Emelson',
    lastname: 'Márquez'
  };
  next();
};

module.exports = authorMiddleware;
