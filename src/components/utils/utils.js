export const isItemPresent = (array, id) =>
  !!array.find((item) => item.id === id);
