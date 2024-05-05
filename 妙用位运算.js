/* 其他的数字都出现2次
 * 只有一个数字只出现了1次
 * 找出只出现了1次的数字
 */
function uniqueNumber(nums) {
  return nums.reduce((prev, curr) => prev ^ curr, 0);
}
