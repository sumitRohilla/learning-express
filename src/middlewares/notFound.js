const pageNotFound = (req, res, next) => {
  res.status(404).json({ message: "page not found" });
};

export default pageNotFound;
