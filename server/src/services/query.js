const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 5;

function getPagination(query) {
  const limit = Math.abs(query.limit) || DEFAULT_LIMIT;
  const page = Math.abs(query.page) || DEFAULT_PAGE;

  return {
    limit,
    skip: limit * (page - 1),
  };
}

module.exports = {
  getPagination,
};
