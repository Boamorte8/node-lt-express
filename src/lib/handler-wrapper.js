const handlerWrapper = (handler) => {
  return async (req, res, next) => {
    try {
      // req.log.info('Test log');
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default handlerWrapper;
