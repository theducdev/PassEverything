export function validateQuery(schema) {
  return (req, res, next) => {
    const { value, error } = schema.validate(req.query, { convert: true, stripUnknown: true });
    if (error) {
      error.isJoi = true;
      return next(error);
    }
    req.validatedQuery = value;
    return next();
  };
}

export function validateParams(schema) {
  return (req, res, next) => {
    const { value, error } = schema.validate(req.params, { convert: true, stripUnknown: true });
    if (error) {
      error.isJoi = true;
      return next(error);
    }
    req.validatedParams = value;
    return next();
  };
}
