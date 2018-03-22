const multiFilter = (arr, filters) => {
  const filterKeys = Object.keys(filters);
  return arr.filter(eachObj => {
    return filterKeys.every(eachKey => {
      if (!filters[eachKey].length) {
        return true; // passing an empty filter means that filter is ignored.
      }
      var value = String(eachObj[eachKey]);
      return value.match(new RegExp(filters[eachKey], "gi"));
    });
  });
};
export default multiFilter;
