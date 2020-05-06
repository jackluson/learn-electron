const { clipboard } = require('electron');
const btnCopyEl = document.getElementById('btn-copy');
const inputEl = document.getElementById('input-copy');
btnCopyEl.addEventListener('click', () => {
  const inputVal = inputEl.value || "自定义";
  console.log(inputEl, inputVal);

  clipboard.writeText(inputVal)
  inputEl.value = `粘贴的内容: ${clipboard.readText()}`
})
