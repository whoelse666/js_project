// 工具函数
//复制
async function copyToClipboard(text){
  if (!text) return;
  if (typeof text === "number") text = text.toString();
  if (navigator.clipboard) {
    // 现代浏览器支持的 Clipboard API
    await navigator.clipboard
      .writeText(text)
      .then(() => {
        message(`成功复制${text}`, { type: "success" });
      })
      .catch(err => {
        message("复制到剪贴板时出错", { type: "error" });
        console.error("复制到剪贴板时出错: ", err);
      });
  } else {
    // 针对不支持 Clipboard API 的旧版浏览器
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      const successful = document.execCommand("copy");
      if (successful) {
        console.log("内容已复制到剪贴板（旧版方法）");
        message(`成功复制${text}`, { type: "success" });
      } else {
        console.error("复制操作失败（旧版方法）");
        message(`成功复制${text}`, { type: "error" });
      }
    } catch (err) {
      console.error("复制到剪贴板时出错（旧版方法）: ", err);
    }
    document.body.removeChild(textarea);
  }
}

