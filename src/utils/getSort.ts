export function getSort(sort:boolean|string) {
  // if popular param is false, send empty string
  if (sort == false) return "";
  // if popular param not false, get the right sort
  return sort == "all" || sort == true ? "popular" : `popular-${sort}`;
}

