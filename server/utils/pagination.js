export const paginate = async (model, filter = {}, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const data = await model.find(filter).skip(skip).limit(limit);

  const totalCount = await model.countDocuments(filter);

  const totalPages = Math.ceil(totalCount / limit);

  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    currentPage: page,
    totalPages,
    totalCount,
    hasNextPage,
    hasPreviousPage,
    data,
  };
};
