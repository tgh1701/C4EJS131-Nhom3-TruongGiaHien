// 1. Cho mảng A = [5, 4, 7, 8, 10, 20, 1], output -> [1, 4, 5, 7, 8, 10, 20] (hint: sử dụng hàm Array.sort)
const arrA = [5, 4, 7, 8, 10, 20, 1];
function sortNumbers(){
    arrA.sort((a, b) => a - b );
}
sortNumbers();
console.log("arrA = ", arrA);

// 2. Cho mảng B = [1, 2, 'a', {}, 'b', 'c', 2 , 4, 5], output -> mảng C = [1,2,2,4,5] 
const arrB = [1, 2, 'a', {}, 'b', 'c', 2, 4, 5];
const arrC = [];
const display = (value) => { 
    if(Number.isInteger(value)){
        arrC.push(value);
    }
}
arrB.forEach(display);
console.log("arrC = ", arrC);

// 3. Cho mảng D = [1, 4, 10, 100, 50, 69, 96], output -> số lớn nhất trong mảng, số nhỏ nhất trong mảng
const arrD = [1, 4, 10, 100, 50, 69, 96];
console.log("max = ", Math.max(...arrD));
console.log("min = ", Math.min(...arrD));

// 4. Cho mảng E = [1, 2, 'a', 'b', 'c', 2, 4, 5], không sử dụng thêm mảng mới, đưa các số về đầu mảng và các chữ về cuối mảng, sử dụng các hàm pop, push, shift, unshift
const arrE = [1, 2, 'a', 'b', 'c', 2, 4, 5];
arrE.splice(2, 3); // at position 2, remove 3 items
arrE.push('a', 'b', 'c');
console.log("arrE = ", arrE)

// 5. Cho mảng F = [1, 23, 41, 5, 6, 1, 14, 66, 1124, 1, 1, 55, 15, 0], tìm ra vị trí thứ 4 của số 1 trong mảng (hint: dùng findIndex)
const arrF = [1, 23, 41, 5, 6, 1, 14, 66, 1124, 1, 1, 55, 15, 0];
let checkNumber1 = arrF.findIndex(
    (arrF, checkNumber1) => arrF === 1 && checkNumber1 > 9
    );
console.log("checkNumber1 = ", checkNumber1);