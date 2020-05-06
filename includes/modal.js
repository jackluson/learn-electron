// console.log(require)
// console.log(process);
const closeBtn = document.getElementById('close');
closeBtn.addEventListener('click', () => {
  window.close();
})
const updateReply = () => {
  console.log(window);
}

window.addEventListener('resize', updateReply);
window.addEventListener('move', updateReply)
