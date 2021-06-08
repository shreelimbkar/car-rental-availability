const getFormattedDate = (dt) => {
  const d = new Date(dt);
  console.log(d.toLocaleDateString());
  return d.toLocaleDateString();
};

export { getFormattedDate };
