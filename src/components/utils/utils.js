export const isItemPresent = (array, id) =>
  !!array.find(({ productId }) => productId._id === id);
