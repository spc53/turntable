// 焖面 板面 盖饭 炒饭

const pointer = document.getElementById('pointer');
const turntable = document.getElementById('turntable');
let random = 0;

pointer.onclick = function () {
  random += Math.ceil(Math.random() * 3600);
  turntable.style.transform = `rotate(${random}deg)`;
}