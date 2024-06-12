import colors from "colors";

const logger = (req, res, next) => {
  const methodColors = {
    GET: "green",
    POST: "yellow",
    PUT: "blue",
    DELETE: "red",
  };

  const color = methodColors[req.method];

  console.log(
    `${req.method} ${req.protocol}://${req.hostname}${req.originalUrl}`[color]
  );
  next();
};

export default logger;
