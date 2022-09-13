const btn = document.querySelector("#btn");
const a = document.querySelector(".a");
const b = document.querySelector(".b");
let array = [];
let array2 = [];
function TaoMang() {
  for (let i = a.value; i <= b.value; i++) {
    array.push(i);
  }
  for (let j = 0; j < array.length; j++) {
    if (SoNguyenTo(array[j]) == 1) {
      array2.push(array[j]);
      document.getElementById("SNT").innerHTML = array2;
    }
  }
}
function SoNguyenTo(n) {
  let flag = 1;
  if (n < 2) return (flag = 0);
  let i = 2;
  while (i < n) {
    if (n % i == 0) {
      flag = 0;
      break;
    }
    i++;
  }
  return flag;
}
