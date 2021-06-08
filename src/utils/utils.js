const getFormattedDate = (dt) => {
  const d = new Date(dt);
  return d.toLocaleDateString();
};

export { getFormattedDate };
