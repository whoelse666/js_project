// 假设你有一个图片的URL
const imageUrl = "https://cdsassets.apple.com/live/7WUAS350/images/macbook-air/2020-macbook-air-keyboard-diagram-smc.png";

// 用户触发的事件处理函数中
const copyImageToClipboard = async (target = imageUrl) => {
  try {
    const response = await fetch(target);
    const blob = await response.blob();
    console.log("blob", blob);
    await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
    console.log("图片已复制到剪贴板");
  } catch (err) {
    console.error("复制失败", err);
  }
  // try {
  //   await navigator.clipboard.write([new ClipboardItem({ "text/plain": new Blob([target], { type: "text/plain" }) })]);
  //   console.log("图片URL已复制到剪贴板");
  // } catch (err) {
  //   console.error("复制失败", err);
  // }
};

// // 比如绑定到一个按钮的点击事件
// document.getElementById("copyButton").addEventListener("click", () => {
//   copyImageToClipboard(imageUrl);
// });
