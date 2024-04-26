var isPerfectSquare = function (x) {
  let l = 0,
    r = x;
  while (l <= r) {
    let m = l + ((r - l) >> 1);
    if (m * m < x) {
      l = m + 1;
    } else if (m * m > x) {
      r = m - 1;
    } else {
      return true;
    }
  }
      return false;
};

isPerfectSquare(16);
