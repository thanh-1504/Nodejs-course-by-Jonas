module.exports = (fnc) => {
  return (req, res) => {
    fnc(req, res, next).catch((err) => next(err));
  };
};
