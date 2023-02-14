// 焖面 板面 盖饭 炒饭

const itemNm = document.getElementById('ipuntItemNm');
const addBtn = document.getElementById('addBtn');
const turnBtn = document.getElementById('turnBtn');
const itemList = document.getElementById('itemList');
const pointer = document.getElementById('pointer');
const turntable = document.getElementById('turntable');

let random = 0;
let avgAngle = 0;
let itemInfoList = [];
const colorList = [
  '#F0EAE0',
  '#EAD4D4',
  '#F5C0BF',
  '#CEE0E6',
  '#953B5E',
  '#D74F55',
  '#FDAB73',
  '#1B99D3',
  '#43A591',
  '#F6CD4B'
];

function getColor (iList) {
  const tempList = colorList.filter((color) => !(iList.find((o) => o.color === color)));
  const random = Math.floor(Math.random() * tempList.length + 1);
  return tempList[random - 1];
}

function deleteItem (id, itemNmV) {
  const deleteObj = document.getElementById(id);
  itemList.removeChild(deleteObj);
  itemInfoList = itemInfoList.filter((o) => o.name !== itemNmV);
}

pointer.onclick = function () {
  random += Math.ceil(Math.random() * 3600);
  turntable.style.transform = `rotate(${random}deg)`;
}

addBtn.onclick = function () {
  if (itemNm.value && itemInfoList.length < 10) {
    const itemNmVal = itemNm.value;
    const isExist = itemInfoList.find((o) => o.name === itemNmVal);
    if (!isExist) {
      const colorVal = getColor(itemInfoList);
      itemInfoList.push({
        name: itemNmVal,
        color: colorVal
      });
      const itemHtml = document.createElement('div');
      itemHtml.setAttribute('class', 'item-info');
      itemHtml.setAttribute('style', `--iClr:${colorVal}`);
      itemHtml.setAttribute('id', colorVal);
      itemHtml.innerHTML = `<span class="item-nm">${itemNmVal}</span>
                            <button class="delete-item-btn" onclick="deleteItem('${colorVal}', '${itemNmVal}')">×</button>`;
      itemList.appendChild(itemHtml);
      itemNm.value = null;
    }
  }
}

function createTurnTable () {
  if (itemInfoList.length < 2) {
    return;
  }

  turntable.innerHTML = '';
  avgAngle = 360 / itemInfoList.length;

  for (let i = 0; i < itemInfoList.length; i++) {
    const itemDiv = document.createElement('div');
    itemDiv.setAttribute('class', 'item');
    itemDiv.style.transform = `rotate(calc(${avgAngle}deg * ${i}))`;
    itemDiv.style.background = itemInfoList[i].color;
    const itemSpan = document.createElement('span');
    itemSpan.innerText = itemInfoList[i].name;
    itemDiv.appendChild(itemSpan);

    if (itemInfoList.length > 2) {
      const halfAngle = avgAngle / 2;
      const oSide = Math.tan(halfAngle * Math.PI / 180) * 50; // 求对边
      const x = 50 - oSide;
      itemDiv.style.clipPath = `polygon(100% 50%, 0% ${x}%, 0% ${100 - x}%)`;
    }

    turntable.appendChild(itemDiv);
  }
}

turnBtn.onclick = function () {
  createTurnTable();
}