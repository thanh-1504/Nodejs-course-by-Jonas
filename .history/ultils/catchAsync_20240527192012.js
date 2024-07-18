module.exports = (fnc) => {
  fnc(req, res, next).catch((err) => next(err));
};
