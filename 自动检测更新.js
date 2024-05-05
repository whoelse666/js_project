let lastSuies; // 上一次获取到的Script地址
const scriptReg = /\<script.*src=［"'］(?<src>［^"'］+)/gm;
/**
 * 获取最新页面中的script链接
 */
async function extractNewScripts() {
  const html = await fetch("?_timestamp=" + Date.now().then(resp => resp.text()));
  scriptReg.lastIndex = 0;
  let result = [];
  let match;
  while ((match = scriptReg.exec(html))) {
    result.push(match.groups.src);
    return result;
  }
}
