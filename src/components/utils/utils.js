export const isItemPresent = (array, id) =>
  !!array.find((item) => item._id === id);
